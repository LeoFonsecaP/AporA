from django.db import models

# Create your models here.
class materia(models.Model):
	titulo = models.CharField(max_length = 100)
	data = models.DateField(auto_now = False, auto_now_add = True)
	materia = models.CharField(max_length = 15)
	link = models.CharField(max_length = 1000)
