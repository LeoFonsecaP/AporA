from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

alternativas = [
	("a", "a"),
	("b", "b"),
	("c", "c"),
	("d", "d"),
	("e", "e"),
]

# Create your models here.
class Vestibulares(models.Model):
	nome = models.CharField(max_length = 50)
	ano = models.IntegerField()
	def __str__(self):
		return "%s %s" % (self.nome, self.ano)
	
	def to_dictionary(self):
		return{
			'nome': self.nome,
			'ano': self.ano
		}
		
	

class Questoes(models.Model):
	enunciado = models.CharField(max_length = 5000)
	numero =  models.IntegerField(default=1, validators = 
	[MaxValueValidator(180), MinValueValidator(1)], blank=False)
	imagem =  models.ImageField(blank = True, null = True)
	a = models.CharField(max_length=500, blank=False)
	b = models.CharField(max_length=500, blank=False)
	c = models.CharField(max_length=500, blank=False)
	d = models.CharField(max_length=500, blank=False)
	e = models.CharField(max_length=500, blank=True)
	correta = models.CharField(max_length = 1, choices = alternativas)
	vestibular = models.ForeignKey(Vestibulares, on_delete=models.CASCADE)

	def __str__(self):
		return 'Questao %s %s' % (self.numero, self.vestibular)

	def to_dictionary(self):
		return{
			'correta': self.correta,
		}