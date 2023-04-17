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

from userapp.models import *
from userapp.sendEmails import *

@login_required(login_url='/login')
def userDashboard(request):
    current_user = request.user
    if current_user.is_staff:
        return redirect("/admin")

    context = {
        'title': f"Dashboard - {current_user.username}",
        'user_name': current_user.username,
    }
    return render(request, "user/index.html")

def Register(request):
    # sourcery skip: move-assign, reintroduce-else, remove-unnecessary-else
    context = {'title': "Sign up"}
    if request.user.is_authenticated:
        return redirect("/dashboard")

    if request.method == 'POST':
        _process_user_signup(request, context)
    return render(request, "register.html", context)


def _process_user_signup(request, context):
    first_name = request.POST['first_name']
    last_name = request.POST['last_name']
    user_email = request.POST['user_email']
    phone = request.POST['phone_number']
    country = request.POST['country']
    referral_code = request.POST.get('referral_code', False)

    user_name = ''.join(random.choices(string.digits, k=10))
    password = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase + '@$^%&()|-+', k=16))
    verification_code = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=35))

    if User.objects.filter(username=user_name).exists():
        context['reg_err'] = "User with this username already exists"
    elif User.objects.filter(email=user_email).exists():
        context['reg_err'] = "User with this email already exists"
    else:
        print(first_name, last_name, phone)
        user = User.objects.create_user(
            username = user_name,
            first_name = first_name,
            last_name = last_name,
            email = user_email,
            password = password,
            is_active = False,
        )

        user_info = UserData.objects.create(
            user = user,
            phone = phone,
            country = country,
            referral_code = referral_code,
            verification_code = verification_code,
        )

        admin_emails = [
            admin.email for admin in User.objects.filter(is_superuser=True)
        ]
        sendNewUserEmail(
            first_name,
            user_email,
            user_name,
            password,
            verification_code
        )
        sendAdminEmailNewUser(
            user_email,
            user_name,
            admin_emails,
            first_name,
            last_name,
            phone,
            country,
            referral_code
        )
        saveNewAdminNotification(
            user_email,
            user_name
        )
        user.save()
        user_info.save()

        # new_user = authenticate(username=user_name, password=password)
        # auth_login(request, new_user)

        context['email_verification_sent'] = True

def resetUserPass(request):  # sourcery skip: merge-dict-assign, move-assign
    context = {'title': "Reset Password"}

    if request.method == 'POST':
        user_email = request.POST['user_email']
        context['user_email'] = user_email

        if chk_user := User.objects.filter(email=user_email):
            userPassword = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase + '@$^%&()|-+', k=16))
            chk_user[0].password = make_password(userPassword)

            sendPasswordResetEmail(
                chk_user[0].first_name,
                user_email,
                chk_user[0].username,
                userPassword
            )
            chk_user[0].save()
            context['reset_success'] = True

        else:
            context['user_not_found'] = True
    return render(request, "reset-password.html", context)

def Login(request):
    context = {'title': "Sign in", 'password_error': False}
    if request.user.is_authenticated:
        return redirect("/dashboard")

    if request.method == 'POST':
        userName = request.POST['user_name']
        userPassword = request.POST['password']
        next_page = request.GET.get("next", False)

        user = authenticate(username=userName, password=userPassword)

        if user is not None:
            auth_login(request, user)

            if next_page != False:
                return redirect(next_page)

            return redirect("/admin") if user.is_staff else redirect("/dashboard")
        else:
            context['password_error'] = True

    context['unv'] = request.GET.get("unv", False)
    context['vns'] = request.GET.get("vns", False)

    return render(request, "login.html", context)

@login_required(login_url='/login')
def leftPanelData(request):
    current_user = request.user
    if current_user.is_staff:
        return redirect("/admin")

    all_lists = CurrencyLists.objects.all()
    forex_list = []
    crypto_list = []

    for currency in all_lists:
        currency_data = {
            "id":currency.id,
            "time":currency.time,
            "symbol":currency.symbol,
            "ask":currency.ask,
            "bid":currency.bid
        }

        if currency.symbol_type == "forex":
            forex_list.append(currency_data)
        else:
            crypto_list.append(currency_data)

    data_out = json.dumps({"forex_data":forex_list, "crypto_data":crypto_list}, indent=2, sort_keys=True, default=str)

    return HttpResponse(data_out, content_type='application/json')

@login_required(login_url='/login')
def getHistoryData(request):
    current_user = request.user
    if current_user.is_staff:
        return redirect("/admin")

    symbol = request.GET.get("symbol", False)
    symbol_type = request.GET.get("symbol_type", False)
    interval = request.GET.get("interval", False)

    if symbol_type == "forex":
        symbol = f"{symbol}=X"
    else:
        symbol = f"{symbol[:3]}-{symbol[3:6]}"
            

    if interval in ["1m"]:
        period = "1w"
    elif interval in ["5m", "15m", "30m"]:
        period = "1mo"
    elif interval in ["1h"]:
        period = "6mo"
    else:
        period = "max"

    pd_data = yf.download(tickers = symbol, period = period, interval = interval)

    processed_data = []
    for index, row in pd_data.iterrows():
        candle_data = {
            "time": datetime.timestamp(index),
            "open": round(row["Open"], 4),
            "high": round(row["High"], 4),
            "low": round(row["Low"], 4),
            "close": round(row["Close"], 4)
        }
        processed_data.append(candle_data)

    data_out = json.dumps(processed_data, indent=2, sort_keys=True, default=str)

    return HttpResponse(data_out, content_type='application/json')

@login_required(login_url='/login')
def getCurrentData(request):
    symbol = request.GET.get("symbol", False)

    if data := CurrencyLists.objects.filter(symbol=symbol):
        data = data[0]
        candle_data = {
            "time": data.time,
            "open": round(float(data.open), 4),
            "high": round(float(data.high), 4),
            "low": round(float(data.low), 4),
            "close": round(float(data.close), 4)
        }
        data_out = json.dumps([candle_data], indent=2, sort_keys=True, default=str)

    else:
        data_out = json.dumps([], indent=2, sort_keys=True, default=str)
    return HttpResponse(data_out, content_type='application/json')

@login_required(login_url='/login')
def searchLeftPanel(request):
    if search_query := request.GET.get("q", False):
        if currencies := CurrencyLists.objects.filter(symbol__icontains=search_query):
            currency_lists = []
            for currency in currencies:
                currency_data = {
                    "id":currency.id,
                    "symbol":currency.symbol,
                    "ask":currency.ask,
                    "bid":currency.bid,
                    "symbol_type":currency.symbol_type
                }
                currency_lists.append(currency_data)

            data_out = json.dumps(currency_lists, indent=2, sort_keys=True, default=str)
        else:
            data_out = json.dumps([], indent=2, sort_keys=True, default=str)
    
    return HttpResponse(data_out, content_type='application/json')

@login_required(login_url='/login')
def getOrderData(request):
    data_out = json.dumps([], indent=2, sort_keys=True, default=str)

    if order_type := request.GET.get("order_type", False):
        user_orders = userTrades.objects.filter(user_id=request.user.id).filter(order_status='active')

        processed_orders = []
        for order in user_orders:
            symbol_price = CurrencyLists.objects.get(symbol=order.symbol)
            
            close_price = float(symbol_price.close)
            order_size = order.order_size * 100000
            profit = (close_price - order.open_price) * order_size
            profit = round(profit, 4)

            order_dict = {
                'id': order.order_number,
                'symbol': order.symbol,
                'type': order.order_type,
                'amount': order.order_size,
                'tradeVolume': order.id,
                'openRate': order.open_price,
                'SL': order.stop_loss,
                'TP': order.take_profit,
                'swap': order.swap,
                'commission': order.commission,
                'profitLoses': profit,
                'close': close_price,
                'time': datetime.timestamp(order.open_time)
            }
            processed_orders.append(order_dict)

        data_out = json.dumps(processed_orders, indent=2, sort_keys=True, default=str)

    return HttpResponse(data_out, content_type='application/json')

def saveNewOrder(request):
    symbol = request.GET.get("symbol", False)
    open_price = request.GET.get("open_price", False)
    order_type = request.GET.get("order_type", False)
    trade_amount = request.GET.get("trade_amount", False)
    order_status = request.GET.get("order_status", 'active')
    stop_loss = request.GET.get("stop_loss", 0)
    take_profit = request.GET.get("take_profit", 0)

    if symbol and open_price and order_type and trade_amount:
        open_price = float(open_price)
        trade_amount = float(trade_amount)
        symbol_data = CurrencyLists.objects.get(symbol=symbol)
        order_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))

        new_order = userTrades.objects.create(
            user = request.user,
            order_number = order_number,
            symbol = symbol,
            symbol_type = symbol_data.symbol_type,
            order_type = order_type,
            order_status = order_status,
            order_size = trade_amount,
            open_price = open_price,
            close_price = symbol_data.close,
            stop_loss = stop_loss,
            take_profit = take_profit,
            profit = 0,
            swap  = 0,
            commission = 0,
            required_margin = 0,
            pip_value = 0,
        )
        new_order.save()

        return HttpResponse([{"msg":"success"}], content_type='application/json')
    else:
        return HttpResponse([{"msg":"No Data Provided"}], content_type='application/json')
    
def LogoutView(request):
    logout(request)

    return redirect('/login')

def verifyUser(request, verification_code):
    
    if chk_vf := UserData.objects.filter(verification_code=verification_code):
        cur_vf = UserData.objects.get(verification_code=verification_code)

        cur_vf.user.is_active = True
        cur_vf.user.save()

        return redirect("/login?vns")
    else:
        return redirect("/login")