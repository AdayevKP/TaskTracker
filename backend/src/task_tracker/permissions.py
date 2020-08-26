from rest_framework import permissions


class ReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.method in permissions.SAFE_METHODS


class Owner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


def foreign_key_owner(foreign_key):
    class ForeignKeyOwner(permissions.BasePermission):
        def has_object_permission(self, request, view, obj):
            return getattr(obj, foreign_key).user == request.user

    return ForeignKeyOwner
