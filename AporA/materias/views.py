from django.shortcuts import render
from .models import resumo

# Create your views here.

def rendermaterias(request):
    return render(request, 'materias.html')

def render_materia(request, materia):
    return render(request, 'materia.html', {
		"resumos": resumo.objects.all(), # Filtrar por materia
		"nome": materia
	})
