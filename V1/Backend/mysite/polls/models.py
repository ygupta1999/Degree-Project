import datetime

from django.db import models
from django.utils import timezone

#For polling application

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    
    #to help with string generation
    def __str__(self):
        return self.question_text
    
    #method to see if the post is recent
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=  1)

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text