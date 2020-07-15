from django.db import models

# Create your models here.

class Notes(models.Model):
    author = models.TextField()
    thumbnail = models.ImageField()
    pdf = models.FileField()

     