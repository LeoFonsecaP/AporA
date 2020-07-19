from django.urls import path
from . import views

urlpatterns = [
    path("", views.rendermaterias, name = "materias"),
	path("fisica", views.render_fisica, name = "fisica"),
	path("quimica", views.render_quimica, name = "quimica"),
	path("matematica", views.render_matematica, name = "matematica"),
	path("biologia", views.render_biologia, name = "biologia"),
	path("historia", views.render_historia, name = "historia"),
	path("geografia", views.render_geografia, name = "geografia"),
	path("literatura", views.render_literatura, name = "literatura"),
	path("gramatica", views.render_gramatica, name = "gramatica"),
	path("redacao", views.render_redacao, name = "redacao"),
	path("sociologia", views.render_sociologia, name = "sociologia"),
	path("filosofia", views.render_filosofia, name = "filosofia"),
]