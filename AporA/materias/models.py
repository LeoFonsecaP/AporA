from django.db import models

MATERIAS = [
	("matematica", 'Matemática'),
	("quimica", 'Química'),
	("fisica", 'Física'),
	("biologia", 'Biologia'),
	("historia", 'História'),
	("geografia", 'Geografia'),
	("gramatica", 'Gramática'),
	("literatura", 'Literatura'),
	("redacao", 'Redação'),
	("filosofia", 'Filosofia'),
	("sociologia", 'Sociologia'),
]

# Create your models here.
class resumo(models.Model):
	titulo = models.CharField(max_length = 100)
	data = models.DateField(auto_now = False, auto_now_add = True)
	materia = models.CharField(max_length = 15, choices = MATERIAS)
	link = models.URLField()
	thumb = models.ImageField(blank = False, null = False)

	def __str__(self):
		return 'Resumo de %s, %s' % (self.titulo, self.materia)
