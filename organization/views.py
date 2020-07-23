from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from django.views import View
from organization.student_advisor import StudentAdvisor
from organization.student_advisor import SUBJECTS
import json

# Create your views here.

class OrganizationController(View):
    def get(self, request, *args, **kwargs):
        context = {'subjects': SUBJECTS}
        if not request.user.is_authenticated:
            return render(request, 'organizacao.html', context)

    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.read().decode('utf-8'))
        weaknesses = request_data['difficultSubjects']
        strengths = request_data['easySubjects'] 
        time_blocks = request_data['availableHours']
        
        student_advisor = StudentAdvisor(weaknesses, strengths)

        error = '';
        routine = [];
        try:
            routine = student_advisor.generate_routine(time_blocks)
        except Exception as exception:
            error = str(exception)

        json_routine = '[ '
        for time_block in routine:
            json_routine += time_block.to_json() + ','
        json_routine = json_routine[0:len(json_routine) - 1] + ']'

        return HttpResponse('{"routine":%s,"error":"%s"}' %(json_routine, error))
