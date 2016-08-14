from __future__ import unicode_literals
import json
from django.db import models

# Create your models here.
class Project ( models.Model ):
    project_name = models.CharField(max_length = 255)
    project_description = models.TextField()
    thumbnail = models.ImageField()
    
    def __str__(self):
        return self.project_name
        
    def as_json(self):
        image_urls =[]
        tags = []
    
        for image in self.image_set.all():
            image_urls.append(image.image.url)
        
        for tag in self.tag_set.all():
            tags.append(tag.name)
            
        project_info = dict(name = self.project_name,
            description = self.project_description, 
            tags = tags,
            images = image_urls)
        
        
        return json.dumps(project_info)
        
class Tag ( models.Model ):
    name = models.CharField(max_length = 255)
    slug = models.CharField(max_length = 255, default='slug')
    projects = models.ManyToManyField(Project)
    
    def __str__(self):
        return self.slug
    
class Image ( models.Model ):
    image = models.ImageField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.image.name