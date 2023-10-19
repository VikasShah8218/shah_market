
from django.core.management.base import BaseCommand 
from django.db.models import Count 


from django.shortcuts import render
from django.http import Http404, JsonResponse ,HttpResponse,JsonResponse

import json
import requests

from urllib.request import urlopen
from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import register_events

from apscheduler.triggers.cron import CronTrigger
from web_sockets.consumers import live_data_to_all
from asgiref.sync import async_to_sync

def hit_link():
    print(requests.get("http://www.thevillagegroupe.ca/"))
    print("---------------------test1-------------------------------")
    stock_url  = 'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050'
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding':'gzip, deflate, br',
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Cache-Control':'max-age=0',
        'Sec-Ch-Ua-Platform':'Windows',
        'Sec-Ch-Ua':'Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116',
        'Sec-Ch-Ua-Mobile':'?0',
        'Sec-Fetch-Dest':'document',
        'Sec-Fetch-Mode':'navigate',
        'Sec-Fetch-User':'?1',
        'Upgrade-Insecure-Requests':"1",
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
        }
    print("---------------------test2-------------------------------")
    
    try:
        print("---------------------test3-------------------------------")

        response = requests.get(stock_url, headers=headers)
        print("---------------------test3-------------------------------")

        nse_data = response.json()
        print("---------------------test4-------------------------------")

        # async_to_sync(live_data_to_all)(nse_data)
        print("OK----------------")
        print(f"==> Live Data : - {datetime.now()}")
    except requests.exceptions.ConnectTimeout:
        print("Something Went Wrong: Connection Time OUT ") 
    except requests.exceptions.JSONDecodeError:
        print("Enable to Convert Data to JSON")


class Command(BaseCommand): 
    help = '** This will update theaters data from theaters.json to database **'
  
    def handle(self, *args, **kwargs): 
        print("---------------------test0-------------------------------")

        hit_link()