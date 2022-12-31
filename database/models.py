from tkinter import CASCADE
from django.db import models

class lab(models.Model):
    labID = models.IntegerField(unique = True, default= 0)
    labName = models.CharField(max_length=16)
    fNum = models.IntegerField(default = 0)
    bNum = models.IntegerField(default = 0)
    pcNum = models.IntegerField(default = 0)
    cap = models.IntegerField(default = 0)
    chairNum = models.IntegerField(default = 0)
    labStatus = models.CharField(max_length=24)
        
    def __str__(self):
        return self.labName


class PC(models.Model):
    pcID = models.IntegerField(default = 0)
    labID = models.IntegerField(default = 0)
    pcStatus = models.CharField(max_length=24)

class User(models.Model):
    username = models.CharField(max_length= 16)
    password = models.CharField(max_length=16)

    def __str__(self):
        return self.username

class Issue(models.Model):
    labID = models.IntegerField(default = 0)
    pcNum = models.IntegerField(default = 0)
    type = models.CharField(max_length=10)
    date = models.DateField(null = True)
    description  = models.CharField(max_length=200)