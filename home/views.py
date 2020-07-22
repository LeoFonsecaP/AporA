from django.shortcuts import render

# Create your views here.

def renderHomePage(request):
    return render(request, 'home.html')

def renderPrivacyPolicy(request):
    return render(request, 'politica_de_privacidade.html')