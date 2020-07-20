from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from django.views import View
from organization.advisor import StudysAdvisor
import json

# Create your views here.

class OrganizationController(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return render(request, 'organizacao.html')
        else:
            raise Http404

    def post(self, request, *args, **kwargs):
        request_data = request.read().decode('utf-8')
        parsed_request_data = json.loads(request_data) 
        study_advisor = StudysAdvisor(parsed_request_data['availableHours'],
        parsed_request_data['difficultSubjects'], parsed_request_data['easySubjects'])
        if request.user.is_authenticated:
            raise Http404
        return HttpResponse(request_data)