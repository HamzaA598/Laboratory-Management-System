from ast import Pass
from enum import unique
from urllib import request
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import *
from django.core import serializers


def getLabs(request):
    ls = serializers.serialize("json", lab.objects.all())
    return JsonResponse(ls, safe=False)


def createLab(request):

    id = request.POST['labID']
    name = request.POST['labName']
    pcN = request.POST['pcNum']
    building = request.POST['bNum']
    floor = request.POST['fNum']
    chair = request.POST['chairNum']
    capacity = request.POST['cap']
    status = request.POST['labStatus']

    exist = lab.objects.filter(labID = id).exists()
    data = {"exist": exist}
    
    if exist == False:
        newLab = lab(labID = id, labName = name,
                        bNum = building, fNum = floor,
                        chairNum = chair, cap = capacity,
                        pcNum = pcN, labStatus = status)
        newLab.save()
        return JsonResponse(data)  
    else:
        return JsonResponse(data)


def createPC(request):

    labid = request.POST['labID']
    pcid = request.POST['pcID']
    status = request.POST['pcStatus']

    labExist = lab.objects.filter(labID = labid).exists()
    pcExist = PC.objects.filter(labID = labid, pcID = pcid).exists()
    
    if labExist == True:

        if pcExist == False:
            newPC = PC(labID = labid, pcID = pcid,
                        pcStatus = status)
            newPC.save()

            Lab = lab.objects.get(labID = labid)
            Lab.pcNum = Lab.pcNum + 1
            Lab.save()

    data = {"pcExist": pcExist, "labExist": labExist}
    return JsonResponse(data)


def searchLab(request):

    searchInput = request.POST['labName']
    searchResults = lab.objects.filter(labName = searchInput)

    searchResults = serializers.serialize("json", searchResults)

    return JsonResponse(searchResults, safe=False)


def updateLab(request):

    PK = request.POST['pk']
    id = request.POST['labID']
    oldID = request.POST['oldID']
    name = request.POST['labName']
    pcN = request.POST['pcNum']
    building = request.POST['bNum']
    floor = request.POST['fNum']
    chair = request.POST['chairNum']
    capacity = request.POST['cap']
    status = request.POST['labStatus']

    exist = False
    if(id != oldID):
        exist = lab.objects.filter(labID = id).exists()

    data = {"exist": exist}
    
    if exist == False:
        oldLab = lab.objects.get(pk = PK)

        oldLab.labID = id
        oldLab.labName = name
        oldLab.bNum = building
        oldLab.fNum = floor
        oldLab.chairNum = chair
        oldLab.cap = capacity
        oldLab.pcNum = pcN
        oldLab.labStatus = status

        oldLab.save()

        return JsonResponse(data)
    else:
        return JsonResponse(data)


def deleteLab(request):

    PK = request.POST['pk']

    deletedLab = lab.objects.get(pk = PK)

    deletedLab.delete()

    return HttpResponse()


def reportLab(request):
    Labid = request.POST['labID']
    PcNum = request.POST['pcNum']
    Type = request.POST['type']
    Date = request.POST['date']
    Description = request.POST['description']

    exist = lab.objects.filter(labID = Labid).exists()

    if exist:
        newProblem = Issue(labID =  Labid, pcNum = PcNum, 
                            type =  Type, date =  Date, 
                            description =  Description)
        newProblem.save()
 
    data = {"labExists" : exist}
    return JsonResponse(data)
    

def getDamagedPC(request):
    ls = serializers.serialize("json", PC.objects.filter(pcStatus = "Under maintenance"))
    return JsonResponse(ls, safe=False)


def repairPC(request):
    pkey = request.POST['pk']
    pcid = request.POST['pcID']
    labid = request.POST['labID']
    
    pc = PC.objects.get(pk = pkey, labID = labid, pcID = pcid)

    pc.pcStatus = "Active"
    pc.save()

    return HttpResponse(status = 200)
    

def register(request):
    Username = request.POST['username']
    Password = request.POST['password']


    exist = User.objects.filter(username = Username).exists()

    data = {'exist': exist}

    if exist == False:
        newUser = User(username = Username, password = Password)
        newUser.save()

    return JsonResponse(data)


def login(request):
    Username = request.POST['username']
    Password = request.POST['password']

    exist = User.objects.filter(username = Username, password = Password).exists()
    data = {'exist': exist}

    return JsonResponse(data)


