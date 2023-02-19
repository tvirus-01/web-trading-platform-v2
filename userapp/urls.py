from django import path
from userapp import views

urlpatterns = [
    path("", views.userDashboard)
]