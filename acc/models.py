from django.db import models
from django.contrib.auth.models import AbstractUser


# constants

# Create your models here.


class User(AbstractUser):
    profile_pic = models.ImageField(upload_to='uploads/profiles/', null=True)
    phone_no = models.CharField(max_length=10, unique=True)


# aadhaar = models.CharField(max_length=12, unique=True)
