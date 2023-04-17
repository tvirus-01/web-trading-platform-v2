from django.urls import path
from userapp import views

urlpatterns = [
    path("", views.userDashboard),
    path("dashboard", views.userDashboard),
    path("get/symbol-data", views.leftPanelData),
    path("get/history-data", views.getHistoryData),
    path("get/current-data", views.getCurrentData),
    path("get/currency-data", views.searchLeftPanel),
    path("get/order-data", views.getOrderData),
    path("save/new-order", views.saveNewOrder),
    path("login", views.Login),
    path("logout", views.LogoutView),
    path("register", views.Register),
    path("reset-password", views.resetUserPass),
    path("verify-account/<str:verification_code>", views.verifyUser),
]