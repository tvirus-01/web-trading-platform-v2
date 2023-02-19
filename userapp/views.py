import json
import random
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required

# @login_required(login_url='/login')
def userDashboard(request):
    # current_user = request.user
    # if current_user.is_staff:
    #     return redirect("/admin")

    # context = {
    #     'title': f"Dashboard - {current_user.username}",
    #     'user_name': current_user.username,
    # }
    return render(request, "user/index.html")