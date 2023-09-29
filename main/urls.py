from django.urls import path
from . import views

urlpatterns = [
    path("",views.testing ),
    path("heat-map",views.heat_map ),    
    ]