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
    # url =  "https://json.bselivefeeds.indiatimes.com/ET_Community/liveindices?outputtype=json&indexid=2369&exchange=50&company=true&pagesize=100&sortby=percentchange&sortorder=desc&callback=objIndices.getDataCB&language="
    # try:
    #     a = urlopen(url)
    #     b = a.read().decode()[21 : -2]
    #     # d = json.loads(b)
        
    #     async_to_sync(live_data_to_all)(b)


    #     print(f"==> Live Data : - {datetime.now()}")
    #     # print(b)
    # except Exception as e:
    #     print("something went wrong: ")
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

    
    # with open("test.json" ,"r") as file:
    #     nse_data = file.read()
        # print(nse_data)
    try:
        response = requests.get(stock_url, headers=headers)
        # nse_data = response.text
        nse_data = response.json()
        
        # nse_data = json.loads(response.text)
        # nse_data = json.loads(nse_data)
        
        async_to_sync(live_data_to_all)(nse_data)
        print("OK----------------")
        print(f"==> Live Data : - {datetime.now()}")
    except requests.exceptions.ConnectTimeout:
        print("Something Went Wrong: Connection Time OUT ") 
    except requests.exceptions.JSONDecodeError:
        print("Enable to Convert Data to JSON")


def start():
    scheduler = BackgroundScheduler()
    # run this job every 1 hour
    scheduler.add_job(
        hit_link, trigger=CronTrigger(second="*/10"),
        name='Live_Data', max_instances=1
    )
    register_events(scheduler)
    scheduler.start()
    # print("Scheduler started...", file=sys.stdout)

