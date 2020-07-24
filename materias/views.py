from django.shortcuts import render
from .models import resumo

# Create your views here.

def rendermaterias(request):
    return render(request, 'materias.html')

def render_materia(request, materia):
	r = Resumo.objects.filter(materia = materia)
	r = Resumo.objects.order_by('titulo')
	return render(request, 'materia.html', {
		"resumos": r,
		"nome": materia
	})