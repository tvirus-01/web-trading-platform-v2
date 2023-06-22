from django.urls import path
from adminapp import views

urlpatterns = [
    path("", views.adminDashboard),
]