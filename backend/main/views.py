from django.shortcuts import render
from django.http import Http404, JsonResponse ,HttpResponse,JsonResponse
import json
from urllib.request import urlopen

def testing(request):
    return HttpResponse("Tested Ok")


def heat_map(request):
    url =  "https://json.bselivefeeds.indiatimes.com/ET_Community/liveindices?outputtype=json&indexid=2369&exchange=50&company=true&pagesize=100&sortby=percentchange&sortorder=desc&callback=objIndices.getDataCB&language="
    a = urlopen(url)
    b = a.read().decode()[21 : -2]
    d = json.loads(b)
    return JsonResponse(d)

def update_data(request):
    pass