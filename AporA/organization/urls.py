from django.urls import path
from . import views
from organization.views import OrganizationController


urlpatterns = [
    path("", OrganizationController.as_view(), name = "organizacao"),
]