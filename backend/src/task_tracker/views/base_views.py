from django.utils import timezone

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from task_tracker.serializers import common_serializer, default_user_serializer
from task_tracker.permissions import ReadOnly, Owner

from task_tracker.models import Settings


DEFAULT_PERMISSIONS = (Owner, ReadOnly, IsAuthenticated)


def create_view(model_class, serializer=common_serializer):
    return _base_view(
        model_class,
        base_view=generics.CreateAPIView,
        query=None,
        serializer=serializer,
        permissions=())


def list_view(model_class, query=None, serializer=common_serializer, permissions=DEFAULT_PERMISSIONS):
    return _base_view(
        model_class,
        base_view=generics.ListAPIView,
        query=query,
        serializer=serializer,
        permissions=permissions)


def detail_view(model_class, query=None, serializer=common_serializer, permissions=(Owner, IsAuthenticated)):
    return _base_view(
        model_class,
        base_view=generics.RetrieveUpdateDestroyAPIView,
        query=query,
        serializer=serializer,
        permissions=permissions)


def retrieve_update_view(model_class, query=None, serializer=common_serializer, permissions=DEFAULT_PERMISSIONS):
    return _base_view(
        model_class,
        base_view=generics.RetrieveUpdateAPIView,
        query=query,
        serializer=serializer,
        permissions=permissions)


def _base_view(model_class, base_view, query, serializer, permissions):
    class View(base_view):
        serializer_class = serializer(model_class)
        queryset = query or model_class.objects.all()
        permission_classes = permissions

    return View


@api_view(['GET'])
def current_time(request):
    if request.method == 'GET':
        time_now = timezone.now().replace(microsecond=0)
        return Response(data={'date': time_now.date(), 'time': time_now.time()})


def settings_view(request):
    def retrieve(self, request, *args, **kwargs):
        settings = Settings.objects.get(pk=request.user.id)
        return Response(default_user_serializer(Settings)(settings).data)

    view = retrieve_update_view(Settings)
    view.retrieve = retrieve

    return view.as_view()(request)
