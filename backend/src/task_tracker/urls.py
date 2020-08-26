from django.urls import path
from task_tracker.models import Task, Settings, Session
from task_tracker.views import sessions_views, base_views, tasks_views
from task_tracker.serializers import default_user_serializer
from task_tracker.requests import stop_active_session_request, current_week_info_request, settings_request


urlpatterns = [
    path('tasks/create/',      base_views.create_view(Task, serializer=default_user_serializer).as_view()),
    path('tasks/all/',         tasks_views.task_list_view),
    path('tasks/<int:pk>/',    base_views.detail_view(Task, serializer=default_user_serializer).as_view()),

    path('time/', base_views.current_time),

    path('sessions/create/',      sessions_views.session_create_view().as_view()),
    path('sessions/all/',         sessions_views.session_list_view().as_view()),
    path('sessions/<int:pk>/',    sessions_views.session_detail_view().as_view()),
    path('sessions/stop_active/', stop_active_session_request),

    path('week/current/', current_week_info_request),

    path('settings/view/', settings_request),
]
