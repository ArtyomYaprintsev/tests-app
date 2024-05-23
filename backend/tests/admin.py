from django.contrib import admin

from . import models


@admin.register(models.Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'name')


@admin.register(models.Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('test', 'text', 'sequence')
    ordering = ('test', 'sequence')


@admin.register(models.TestResult)
class TestResultAdmin(admin.ModelAdmin):
    list_display = ('test', 'points', 'summary')
    ordering = ('test', 'points')


@admin.register(models.UserResult)
class UserResultAdmin(admin.ModelAdmin):
    pass
