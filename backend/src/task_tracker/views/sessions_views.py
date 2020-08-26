from rest_framework.permissions import IsAuthenticated

from task_tracker.views.base_views import list_view, create_view, detail_view
from task_tracker.models import Session
from task_tracker.permissions import foreign_key_owner


def session_list_view():
    def get_queryset(self):
        return Session.objects.all().filter(task__user=self.request.user)

    view = list_view(Session)
    view.get_queryset = get_queryset
    return view


def session_create_view():
    return create_view(Session)


def session_detail_view():
    return detail_view(Session, permissions=(IsAuthenticated, foreign_key_owner('task')))
