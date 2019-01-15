from django.db import models
# Create your models here.
import datetime
from django.utils import timezone

# Create your models here.
class Question (models.Model):#Question model
    def __str__(self):
        return self.question_text

    question_key = models.CharField(max_length=10, blank=True, default='')
    question_text = models.CharField(max_length=200)
    

class Choice (models.Model):#Question model
    def __str__(self):
        return self.choice_text
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    q_key = models.CharField(max_length=10, blank=True)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)