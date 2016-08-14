from django.contrib import admin
from .models import Project
from .models import Tag
from .models import Image
from django.contrib.sites.models import Site

# Register your models here.
admin.site.register(Project)
admin.site.register(Tag)
admin.site.register(Image)
admin.site.unregister(Site)