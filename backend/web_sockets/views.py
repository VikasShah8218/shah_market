from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import ConnectionReq
import string
import random
from django.http import JsonResponse


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_connection_req(request):
    req = ConnectionReq.objects.create(
        user_id=request.user.id,
        one_time_key = ''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase + string.digits, k = 80))
    )
    return JsonResponse({"msg": "success", "data": {"req_id": req.id, "one_time_key": req.one_time_key}})