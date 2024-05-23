from django.contrib.auth import get_user_model, authenticate

from django.http import QueryDict
from rest_framework import mixins, status
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from rest_framework.authtoken.models import Token

from django.utils.translation import gettext_lazy as _

from . import serializers
from . import models


class SignupUserView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.AuthUserSerializer
    user_model = get_user_model()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        if self.user_model.objects.filter(
            username=serializer.data.get('username'),
        ).exists():
            return Response({
                'detail': _(
                    'User with the following username already exists.',
                ),
            }, status=status.HTTP_400_BAD_REQUEST)

        self.user_model.objects.create_user(**serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginUserView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.AuthUserSerializer
    user_model = get_user_model()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            username=serializer.data.get('username'),
            password=serializer.data.get('password'),
        )

        if not user:
            return Response({
                'detail': _('Unable to login with provided credentials.'),
            }, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({
                'detail': _('User account not active.'),
            }, status=status.HTTP_401_UNAUTHORIZED)

        token, is_created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)


class LogoutUserView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        tokens = Token.objects.filter(user=request.user)
        for token in tokens:
            token.delete()
        return Response({
            'success': _('User logged out.'),
        }, status=status.HTTP_200_OK)


class UserMeView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TestViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet,
):
    permission_classes = (AllowAny,)
    queryset = models.Test.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'list':
            return serializers.TestSerializer

        if self.action == 'retrieve':
            return serializers.TestWithQuestionsSerializer

        return super().get_serializer_class(*args, **kwargs)


class UserResultViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet
):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserResultSerializer
    queryset = models.UserResult.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'retrieve':
            return serializers.UserResultWithTestResultSerializer

        return super().get_serializer_class(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict):
            request.data._mutable = True

        request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)
