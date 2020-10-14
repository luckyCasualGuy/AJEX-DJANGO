from django import forms
from django.db.models import fields
from django.forms import widgets
from .models import TaskModel


class TaskForm(forms.ModelForm):
    class Meta:
        model = TaskModel
        fields = [
            'title'
        ]

        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control'
            })
        }

