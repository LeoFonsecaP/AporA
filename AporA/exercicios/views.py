from django.shortcuts import render
from .models import vestibulares, questoes

# Create your views here.

def renderexercicios(request):
    return render(request, 'vestibulares.html', {
		"vestibulares": vestibulares.objects.all()
	})

def render_vestibular(request, vest_id):
	vest = vestibulares.objects.get(pk = vest_id)
	return render(request, "prova.html", {
		"questoes": questoes.objects.all(),
		"nome": vest
	})
