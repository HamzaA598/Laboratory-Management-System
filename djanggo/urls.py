from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.project_homepage),
    path('database/', include('database.urls')),
    path('homepage/', views.homepage, name= 'homepage'),
    path('login/', views.login, name= 'login'),
    path('login/homepage.html', views.homepage, name= 'redirecthome'),
    path('labInfo/', views.labInfo, name= 'labInfo'),
    path('addNewLab/', views.addNewLab, name= 'addNewLab'),
    path('report/', views.report, name= 'report'),
    path('AddNewPCs/', views.AddNewPCs, name= 'AddNewPCs'),
    path('list of pc/', views.list_of_pc, name= 'list of pc'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)