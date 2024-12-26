from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('ru/calculations/', views.index),
    path('uz/calculations/', views.index),
    path('ru/coefficients/', views.index),
    path('uz/coefficients/', views.index),
    path('ru/handbooks/', views.index),
    path('uz/handbooks/', views.index),
    path('auth/', views.index),
]