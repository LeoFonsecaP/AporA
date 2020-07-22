from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from django.views import View
from organization.advisor import StudentAdvisor
import json

# Create your views here.

class OrganizationController(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return render(request, 'organizacao.html')
        else:
            raise Http404

    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.read().decode('utf-8'))
        weaknesses = request_data['difficultSubjects']
        strengths = request_data['easySubjects'] 
        time_blocks = request_data['availableHours']

        user = None
        if request.user.is_authenticated:
            user = request.user

        student_advisor = StudentAdvisor(user, weaknesses, strengths)
        routine = student_advisor.generate_routine(time_blocks)

        if user is not None:
            for time_block in routine:
                time_block.save()
        json_routine = '['
        for time_block in routine:
            json_routine += json.dumps(time_block.to_dictionary()) + ','
        json_routine = json_routine[0:len(json_routine) - 1] + ']'
        return HttpResponse(json_routine)