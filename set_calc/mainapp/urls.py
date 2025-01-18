from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('calculations/', views.index),
    path('coefficients/', views.index),
    path('handbooks/', views.index),
    path('auth/', views.index),
]