from django.shortcuts import render
from materias.models import Resumo


# Create your views here.

def renderHomePage(request):
    r = Resumo.objects.all()
    r = Resumo.objects.order_by('data').reverse()
    r = r[0:6]
    print(r)
    return render(request, 'home.html',{
        "resumos": r,
    })

def renderPrivacyPolicy(request):
    return render(request, 'politica_de_privacidade.html')