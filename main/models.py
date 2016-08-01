from __future__ import unicode_literals
from django.db import models

# Create your models here.
class Project ( models.Model ):
    project_name = models.CharField(max_length = 255)
    project_description = models.TextField()
    image_urls = ListField()
    
    def __str__(self):
        return self.project_name
        
class Tag ( models.Model ):
    tags = models.CharField(max_length = 255)
    projects = models.ManyToManyField(Project)