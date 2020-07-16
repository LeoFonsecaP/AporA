from django.shortcuts import render

# Create your views here.

def renderPDP(request):
    return render(request, 'politica_de_privacidade.html')