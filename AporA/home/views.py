from django.shortcuts import render

# Create your views here.

def renderHomePage(request):
    return render(request, 'home.html')