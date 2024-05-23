from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models


class AuthUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=128)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = '__all__'


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Test
        fields = '__all__'


class TestWithQuestionsSerializer(TestSerializer):
    question_set = QuestionSerializer(many=True)


class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestResult
        fields = '__all__'


class UserResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserResult
        fields = '__all__'


class UserResultWithTestResultSerializer(serializers.ModelSerializer):
    result = TestResultSerializer(
        many=False,
        source='get_result',
        read_only=True,
    )

    class Meta:
        model = models.UserResult
        fields = ('id', 'user', 'test', 'user_points', 'created', 'result')
