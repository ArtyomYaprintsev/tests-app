from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()

router.register('tests', views.TestViewSet, basename='tests')
router.register('results', views.UserResultViewSet, basename='results')

urlpatterns = [
    path('signup/', views.SignupUserView.as_view()),
    path('login/', views.LoginUserView.as_view()),
    path('logout/', views.LogoutUserView.as_view()),
    path('me/', views.UserMeView.as_view()),
    path('', include(router.urls)),
]
