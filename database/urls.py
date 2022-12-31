from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('getLabs', views.getLabs),
    path('createLab', views.createLab),
    path('createPC', views.createPC),
    path('searchLab', views.searchLab),
    path('updateLab', views.updateLab),
    path('deleteLab', views.deleteLab),
    path('reportLab', views.reportLab),
    path('getDamagedPC', views.getDamagedPC),
    path('repairPC', views.repairPC),
    path('login', views.login),
    path('register', views.register),
]