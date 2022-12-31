from pickle import FALSE
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import login, authenticate 

def project_homepage(request):
    return render(request, 'project_homepage.html')

def homepage(request):
    return render(request, 'homepage.html')

def login(request):
    return render(request, 'login.html')

def labInfo(request):
    return render(request, 'labInfo.html')

def addNewLab(request):
    return render(request, 'addNewLab.html')

def report(request):
    return render(request, 'report.html')

def AddNewPCs(request):
    return render(request, 'addNewPCs.html')

def list_of_pc(request):
    return render(request, 'list of pc.html')

