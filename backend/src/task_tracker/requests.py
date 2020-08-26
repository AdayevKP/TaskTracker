import datetime

from rest_framework.response import Response
from rest_framework.decorators import api_view

from task_tracker.models import stop_active_sessions, Session, Settings, Week
from task_tracker.serializers import default_user_serializer


@api_view(['GET', 'PATCH', 'PUT'])
def settings_request(request):
    settings = Settings.objects.get(pk=request.user.id)
    if request.method == "GET":
        return Response(default_user_serializer(Settings)(settings).data)

    if request.method == "PATCH" or request.method == "PUT":
        for key, val in request.data.items():
            setattr(settings, key, val)
        settings.save()
        return Response(data={'updated field': ', '.join(request.data.keys())})


@api_view(['GET'])
def stop_active_session_request(request):
    return Response(data={'sessions stopped': stop_active_sessions(request.user)})


@api_view(['GET'])
def current_week_info_request(request):
    def get_week_bounds():
        date = datetime.date.today()

        start_week_day = Settings.objects.get(pk=request.user.id).week_start
        wd = date.weekday()
        start_week = date - datetime.timedelta((wd - start_week_day) % 7)
        end_week = start_week + datetime.timedelta(7)
        return start_week, end_week

    def time_diff(time1, time2, day):
        return datetime.datetime.combine(day, time1) - datetime.datetime.combine(day, time2)

    def get_tasks_time(day_sessions):
        tasks = {}
        for day_session in day_sessions:
            task_desc = tasks.setdefault(day_session.task.name, {'duration': datetime.timedelta(0)})
            task_desc['duration'] += time_diff(day_session.end_time, day_session.start_time, day_session.day)

        for task in tasks.values():
            task['duration'] = str(task['duration'])
        return tasks

    week_start, week_end = get_week_bounds()

    sessions = Session.objects.filter(day__range=[week_start, week_end], task__user=request.user)

    # work in progress
    sessions_by_day = {}
    for session in sessions:
        sessions_by_day.setdefault(Week(session.day.weekday()).name, []).append(session)

    data = {}
    for day in Week:
        data[day.name] = get_tasks_time(sessions_by_day.get(day.name, {}))

    return Response(data=data)
