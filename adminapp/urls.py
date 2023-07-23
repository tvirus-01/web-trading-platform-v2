from django.urls import path
from adminapp import views

urlpatterns = [
    path("", views.adminDashboard),
    path("users", views.adminUsers),
    path('accounts', views.usersTradingAccounts),
    path('live-orders', views.liveOrders),
    path('closed-orders', views.closedOrders),
    path('deposits', views.deposits),
    path('withdraw', views.withdraw),
]