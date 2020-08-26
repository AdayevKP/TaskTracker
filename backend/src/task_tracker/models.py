import enum
import datetime

from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver


def stop_active_sessions(user):
    active_sessions_qs = Session.objects.filter(active=True, task__user=user)
    for s in active_sessions_qs:
        s.active = False
        s.end_time = datetime.datetime.now().time()
        s.save()

    return len(active_sessions_qs)


class Week(enum.Enum):
    MON = 0
    TUE = 1
    WED = 2
    THU = 3
    FRI = 4
    SAT = 5
    SUN = 6


class Task(models.Model):
    name = models.CharField(max_length=256, unique=True)
    color = models.IntegerField()
    active = models.BooleanField(default=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Session(models.Model):
    day = models.DateField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    active = models.BooleanField(default=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.id:
            self.start_time = datetime.datetime.now().time()
            self.day = datetime.datetime.now().date()

        if self.active:
            # turn of all active
            stop_active_sessions(self.task.user)

        return super(Session, self).save()

    def update(self, *args, **kwargs):
        pass


class Settings(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, primary_key=True)
    week_start = models.IntegerField(default=Week.SUN.value)
    day_start = models.TimeField(default=datetime.time(3, 00))


@receiver(post_save, sender=get_user_model())
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Settings.objects.create(user=instance)
