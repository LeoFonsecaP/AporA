from django.db import models
from django.views import View
# Create your models here.

class OrganizationController(View):
    def __init__(self):

    def get(self, request):
        return render(request, '')