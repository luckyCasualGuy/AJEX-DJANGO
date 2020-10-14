from django.db import models

class TaskModel(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    isCompleted = models.BooleanField(default=False)

    def __str__(self) -> str: return self.title
