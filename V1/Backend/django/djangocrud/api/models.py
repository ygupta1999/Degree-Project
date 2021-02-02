from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=32, default='Title')
    desc = models.CharField(max_length=256, default= 'desc')
    year = models.IntegerField()
