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

    context = {}
    return render(request, "adminapp/dashboard.html", context=context)