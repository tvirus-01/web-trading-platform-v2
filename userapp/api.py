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
def getCurrencyLists(request):

    curr_lists = CurrencyLists.objects.all()
    currency_lists = [
        {
            "name": curr.name,
            "symbol": curr.symbol,
            "symbol_short": curr.symbolShort,
            "symbol_type": curr.symbol_type,
            "decimal": curr.decimal,
            "ask": curr.ask,
            "bid": curr.bid,
            "open": curr.open,
            "high": curr.high,
            "low": curr.low,
            "close": curr.close,
            "spread": curr.spread,
            "change": curr.change,
            "change_per": curr.change_per,
            "time": curr.time,
            "volume": curr.volume,
        }
        for curr in curr_lists
    ]

    data_out = json.dumps({"currency_data":currency_lists}, indent=2, sort_keys=True, default=str)
    return HttpResponse(data_out, content_type='application/json')

# @login_required(login_url='/login')
def getHistoryData(request):
    current_user = request.user
    if current_user.is_staff:
        return redirect("/admin")

    if userSymbolData := UserActiveSymbol.objects.filter(user_id=current_user.id):
        symbol = userSymbolData[0].symbol
        interval = userSymbolData[0].chart_interval
        symbol_type = userSymbolData[0].symbol_type
    else:
        symbol = "BTC/USD"
        interval = "1d"
        symbol_type = "crypto"

        # data = UserActiveSymbol.objects.create(
        #     user = current_user,
        #     symbol = symbol,
        #     symbol_type = symbol_type,
        #     chart_interval = interval
        # )

    if data := CurrencyLists.objects.filter(symbolShort=symbol):
        if symbol_type and interval:
            data = data[0]
            symbol_id = data.id

            url = f"https://fcsapi.com/api-v3/{symbol_type}/history?id={symbol_id}&period={interval}&access_key={config.API_KEY}&level=3"
            print(url)

            chart_data = requests.get(url)
            chart_data_json = chart_data.json()['response']

            processed_data = []
            for index in chart_data_json:
                candle_data = {
                    "time": int(index),
                    "open": float(chart_data_json[index]["o"]),
                    "high": float(chart_data_json[index]["h"]),
                    "low": float(chart_data_json[index]["l"]),
                    "close": float(chart_data_json[index]["c"])
                }
                processed_data.append(candle_data)

            data_out = json.dumps({"Response":"Success", "Data":processed_data}, indent=2, sort_keys=True, default=str)

    return HttpResponse(data_out, content_type='application/json')
