from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('ru/', views.index),
    path('uz/', views.index),
    path('auth/', views.index),
]