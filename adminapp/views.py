import json
import random
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
from django.contrib.auth.hashers import make_password
import yfinance as yf
from datetime import datetime
import time
import string, random
import requests

from userapp.models import *
from userapp.sendEmails import *

@login_required(login_url='/login')
def adminDashboard(request):
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")

    all_users = User.objects.filter(is_staff=False)
    all_users_data = []

    for user in all_users:
        user_info = UserData.objects.get(user_id=user.id)

        all_users_data.append(
            {
                "phone": user_info.phone,
                "referral_code": user_info.referral_code,
                "country": user_info.country,
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "last_login": user.last_login,
                "date_joined": user.date_joined
            }
        )

    context = {
        'all_users_data': all_users_data,
        'active_nav': 'dashboard'
    }

    return render(request, "adminapp/dashboard.html", context=context)


@login_required(login_url='/login')
def adminUsers(request):
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")
    
    all_users = User.objects.filter(is_staff=True)

    context = {
        'all_users_data': all_users,
        'active_nav': 'users'
    }
    return render(request, "adminapp/users.html", context=context)

@login_required(login_url='/login')
def usersTradingAccounts(request):
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")
    
    all_trading_accounts = tradingAccounts.objects.all()

    context = {
        'all_trading_accounts': all_trading_accounts,
        'active_nav': 'trading_accounts',
        'title': 'Accounts'
    }
    return render(request, "adminapp/trading_accounts.html", context=context)

@login_required(login_url='/login')
def usersTradingAccountsEdit(request):  # sourcery skip: avoid-builtin-shadow
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")

    data_out = json.dumps({"message":"failed"}, indent=2, sort_keys=True, default=str)

    account_status = request.GET.get("account_status", False)
    account_state = request.GET.get("account_state", False)
    account_type = request.GET.get("account_type", False)
    id = request.GET.get("id", False)

    if account_status != False or account_state != False or account_type != False:
        if trading_account := tradingAccounts.objects.filter(id=id):
            trading_account = trading_account[0]
            trading_account.status = account_status
            trading_account.state = account_state
            trading_account.account_type = account_type
            trading_account.save()

            data_out = json.dumps({"message":"success"}, indent=2, sort_keys=True, default=str) 

    return HttpResponse(data_out, content_type='application/json')

@login_required(login_url='/login')
def deleteUserAccount(request):  # sourcery skip: avoid-builtin-shadow
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")

    data_out = json.dumps({"message":"failed"}, indent=2, sort_keys=True, default=str)

    id = request.GET.get("user_id", False)

    u = User.objects.get(id=id)
    u.delete()
    data_out = json.dumps({"message":"success"}, indent=2, sort_keys=True, default=str)

    return HttpResponse(data_out, content_type='application/json') 

@login_required(login_url='/login')
def liveOrders(request):
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")

    context = {
        'active_nav': 'live_order',
        'title': 'Live Orders'
    }
    return render(request, "adminapp/live_orders.html", context=context)

@login_required(login_url='/login')
def closedOrders(request):
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")

    context = {
        'active_nav': 'closed_order',
        'title': 'Closed Orders'
    }
    return render(request, "adminapp/closed_orders.html", context=context)

@login_required(login_url='/login')
def deposits(request):
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")

    context = {
        'active_nav': 'deposits',
        'title': 'Deposits'
    }
    return render(request, "adminapp/deposits.html", context=context)

@login_required(login_url='/login')
def withdraw(request):
    current_user = request.user
    if not current_user.is_staff:
        return redirect("/")

    context = {
        'active_nav': 'withdraw',
        'title': 'Withdraw'
    }
    return render(request, "adminapp/withdraw.html", context=context)
