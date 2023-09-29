from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import User
import json
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

def testing(request):
    pass



@csrf_exempt
def user_login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user:
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user=user).key
            try :
                imgurl = user.image.url
            except:
                imgurl = None
            return JsonResponse({
                 "msg": "Login Successful",
                 "data":{
                    "token": token,
                    "user_data": {
                        "profile_pic": imgurl, 
                        "first_name": user.first_name, 
                        "last_name": user.last_name,
                        "user_id": user.id
                    }
                }
                
            })
        else:
            return JsonResponse({"token": None, "msg": "username or password not matched.",}, status = 401)

@csrf_exempt
def user_signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        email = data['email']
        phone = data['phone']
        # user = authenticate(username=username, password=password)
        try:
            user = User.objects.create_user(
                username= username,
                password=password,
                email=email,
                phone_no=phone,
                )
            return JsonResponse({"token": None, "msg": "User Registerd successfuly",}, status = 200)
        except:
            return JsonResponse({"token": None, "msg": "something Went Wrong",}, status = 401)



