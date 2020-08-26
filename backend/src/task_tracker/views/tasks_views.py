from task_tracker.views.base_views import list_view
from task_tracker.models import Task
from task_tracker.serializers import default_user_serializer


def task_list_view(request):
    def get_queryset(self):
        return Task.objects.all().filter(user=self.request.user)

    view = list_view(Task, serializer=default_user_serializer)
    view.get_queryset = get_queryset
    return view.as_view()(request)
