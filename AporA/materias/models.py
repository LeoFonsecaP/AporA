from django.db import models

# Create your models here.
class materia(models.Model):
	titulo = models.CharField(max_lenght = 100)
	data = models.DateField(auto_now = false, auto_now_add = true)
	materia = models.CharField(max_lenght = 15)