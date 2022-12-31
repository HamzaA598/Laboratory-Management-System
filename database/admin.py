from django.contrib import admin
from .models import lab, User, PC, Issue
# Register your models here.

admin.site.register(lab)

admin.site.register(User)

admin.site.register(PC)

admin.site.register(Issue)