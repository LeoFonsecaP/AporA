from django.shortcuts import render

# Create your views here.

def rendermaterias(request):
    return render(request, 'materias.html')

def render_fisica(request):
	return render(request, 'fisica.html')

def render_quimica(request):
	return render(request, 'quimica.html')

def render_matematica(request):
	return render(request, 'matematica.html')
	
def render_biologia(request):
	return render(request, 'biologia.html')
	
def render_historia(request):
	return render(request, 'historia.html')
	
def render_geografia(request):
	return render(request, 'geografia.html')
	
def render_literatura(request):
	return render(request, 'literatura.html')
	
def render_gramatica(request):
	return render(request, 'gramatica.html')
	
def render_redacao(request):
	return render(request, 'redacao.html')
	
def render_sociologia(request):
	return render(request, 'sociologia.html')
	
def render_filosofia(request):
	return render(request, 'filosofia.html')