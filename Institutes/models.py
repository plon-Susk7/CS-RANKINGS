from django.db import models

# Create your models here.
class Institutes(models.Model):
    id = models.CharField(max_length=120,primary_key=True,null=False,blank=False)
    name = models.TextField(null=False,blank=False)
    TLR = models.DecimalField(max_digits=5,decimal_places=2,null=False,blank=False)
    RPC = models.DecimalField(max_digits=5,decimal_places=2,null=False,blank=False)
    GO=models.DecimalField(max_digits=5,decimal_places=2,default=0.00,null=False,blank=False)
    OI=models.DecimalField(max_digits=5,decimal_places=2,default=0.00,null=False,blank=False)
    PERCEPTION=models.DecimalField(max_digits=5,decimal_places=2,default=0.00,null=False,blank=False)
    city=models.CharField(max_length=1000,null=False,blank=False)
    state=models.CharField(max_length=1000,null=False,blank=False)
    score=models.DecimalField(max_digits=5,decimal_places=2,default=0.00,null=False,blank=False)
    rank=models.IntegerField(null=False,blank=False,default=1)