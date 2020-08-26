from rest_framework import serializers


def common_serializer(model_class, fields_desc='__all__'):
    class Serializer(serializers.ModelSerializer):
        class Meta:
            model = model_class
            fields = fields_desc

    return Serializer


def default_user_serializer(model_class, fields_desc='__all__'):
    class Serializer(serializers.ModelSerializer):
        user = serializers.HiddenField(default=serializers.CurrentUserDefault())

        class Meta:
            model = model_class
            fields = fields_desc

    return Serializer

