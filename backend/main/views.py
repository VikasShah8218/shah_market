from django.shortcuts import render
from django.http import Http404, JsonResponse ,HttpResponse,JsonResponse
import json
from urllib.request import urlopen
from email.message import EmailMessage
import ssl
import smtplib
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



def send_Email(request,to,msg):
    username, domain = to.split("@")

    if(to == "aashigoyal77@gmail.com"):
        subject = "Hi Mis Goyal"

    else:
        subject = f"Hi {username}"
    smtp_port = 587                
    smtp_server = "smtp.gmail.com" 
    email_from = "mister.brilliant.01@gmail.com "
    email_to = to
    pswd = "cclrmypyxzserlsp"
    message = msg
    simple_email_context = ssl.create_default_context()
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = email_from
    msg['To'] = email_to
    msg.set_content(message)
    try:
        print("Connecting to server...")
        TIE_server = smtplib.SMTP(smtp_server, smtp_port)
        TIE_server.starttls(context=simple_email_context)
        TIE_server.login(email_from, pswd)
        print("Connected to server :-)")
        
        # Send the actual email
        print()
        print(f"Sending email to - {email_to}")
        TIE_server.send_message(msg)
        print(f"Email successfully sent to - {email_to}")
    except Exception as e:
        print(e)
    finally:
        TIE_server.quit()
    return JsonResponse({"msg":"nothing"})