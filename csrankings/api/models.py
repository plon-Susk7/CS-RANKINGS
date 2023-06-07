from django.db import models

# Create your models here.


class Rankings(models.Model):
    name = models.CharField(max_length=100)
    rank = models.IntegerField()
    