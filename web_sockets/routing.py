from django.urls import path
from .consumers import MyAsyncConsumer


websocket_urlpatterns = [
    path('ws/data', MyAsyncConsumer.as_asgi()),
]
