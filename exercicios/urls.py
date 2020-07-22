from django.urls import path
from . import views

urlpatterns = [
    path("", views.renderexercicios, name = "exercicios"),
	path("<int:vest_id>/", views.render_vestibular, name = "vestibular"),
]