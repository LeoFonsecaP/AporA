from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from django.views import View

# Create your views here.

class OrganizationController(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'organizacao.html')
    def post(self, request, *args, **kwargs):
        return HttpResponse(request.body)