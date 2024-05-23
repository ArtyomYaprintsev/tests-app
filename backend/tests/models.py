from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from .utils import generate_str_code


class Test(models.Model):
    id = models.CharField(
        max_length=40,
        default=generate_str_code,
        primary_key=True,
        editable=False,
    )
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(max_length=500, default='', blank=True)

    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('tests')
        verbose_name_plural = _('tests')


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    text = models.TextField(max_length=200)
    description = models.TextField(max_length=500, default='', blank=True)
    sequence = models.PositiveIntegerField(
        default=0,
        help_text=_(
            'The higher the number, the earlier the question in the test',
        ),
    )

    class Meta:
        verbose_name = _('question')
        verbose_name_plural = _('questions')
        ordering = ['-sequence', 'id']


class TestResult(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(
        default=0,
        help_text=_(
            'Represents the number of points that the user needs to gain to '
            'get this result',
        ),
    )
    summary = models.CharField(max_length=200)
    description = models.TextField(max_length=500, default='', blank=True)

    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('test result')
        verbose_name_plural = _('test results')


class UserResult(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    user_points = models.PositiveIntegerField()
    created = models.DateTimeField(auto_now_add=True)

    def get_result(self):
        return TestResult.objects.filter(
            test=self.test,
            points__lte=self.user_points,
        ).order_by('-points').first()

    class Meta:
        verbose_name = _('user result')
        verbose_name_plural = _('user results')
