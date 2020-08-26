from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/',               admin.site.urls),
    path('api/v1/task_tracker/', include('task_tracker.urls')),
    path('api/v1/auth/',         include('rest_framework.urls')),
]
