# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-08-01 06:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.ImageField(upload_to=b''),
        ),
    ]
