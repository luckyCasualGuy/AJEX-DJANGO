from django.forms.models import model_to_dict
from django.http.response import JsonResponse

from django.shortcuts import redirect, render
from django.views.generic import View

from .models import TaskModel
from .forms import TaskForm

class TaskList(View):
    def get(self, request):
        form = TaskForm()
        tasks = TaskModel.objects.all()

        return render(request, 'Task/task_list.html', {
            'form': form,
            "tasks": tasks
        })

    def post(self, request):
        form = TaskForm(request.POST)

        if form.is_valid():
            newTask = form.save()
            return JsonResponse({
                "task": model_to_dict(newTask)
            }, status=200)

class TaskCompleted(View):
    def post(self, request, id):
        task = TaskModel.objects.get(id=id)
        task.completed = True
        task.save()
        return JsonResponse({
            'task': model_to_dict(task)
        }, status=200)

'''
    This class should extend View

    get method will run during GET request
'''
