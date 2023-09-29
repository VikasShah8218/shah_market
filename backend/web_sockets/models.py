from django.db import models
from acc.models import User
# Create your models here.
class ConnectionReq(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    one_time_key = models.CharField(max_length=255)
