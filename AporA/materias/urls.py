from django.urls import path
from . import views

urlpatterns = [
    path("", views.rendermaterias, name = "materias"),
	path("<str:materia>/", views.render_materia, name = "materia"),
]