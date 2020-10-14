from .views import TaskCompleted, TaskList
from django.urls import path

urlpatterns = [
    path('', TaskList.as_view(), name='task_list_url'),
    path('<str:id>/completed/', TaskCompleted.as_view(), name='task_completed_url')
]


'''
Working with this for first time:
here we calling class that has an as_view method
'''
