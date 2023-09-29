from django.urls import path
from . import views

urlpatterns = [
    path('new-connection-req', views.new_connection_req),
]
