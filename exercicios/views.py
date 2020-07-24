from django.shortcuts import render
from .models import Vestibulares, Questoes
import json

# Create your views here.

def renderexercicios(request):
    return render(request, 'vestibulares.html', {
		"vestibulares": Vestibulares.objects.all()
	})

def render_vestibular(request, vest_id):
	vest = Vestibulares.objects.get(pk = vest_id)
	q = Questoes.objects.filter(vestibular__id = vest_id)
	corretas = map(lambda questao:str(questao.correta), q)
	json_corretas = '['
	for correta in corretas:
		json_corretas += '"%s",' %(correta)
	json_corretas = json_corretas[0:len(json_corretas) - 1] + ']'
	return render(request, "prova.html", {
		"questoes": q,
		"nome": vest,
		"certas": json_corretas,
	})
