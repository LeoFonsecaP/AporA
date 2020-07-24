from django.shortcuts import render
from materias.models import resumo


# Create your views here.

def renderHomePage(request):
    r = resumo.objects.order_by('data').reverse()
    r = r[0:6]
    print(r)
    return render(request, 'home.html',{
        "resumos": r,
    })

def renderPrivacyPolicy(request):
    return render(request, 'politica_de_privacidade.html')