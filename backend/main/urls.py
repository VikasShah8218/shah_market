from django.urls import path
from . import views

urlpatterns = [
    path("",views.testing ),
    path("heat-map",views.heat_map ),    
    path("data",views.update_data ),    
    path("send-email/<str:to>/<str:msg>",views.send_Email ),    
    ]