from rest_framework import serializers
from .models import Institutes

class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institutes
        fields = ['id', 
                  'name', 
                  'TLR', 
                  'RPC',
                  'GO',
                  'OI',
                  'PERCEPTION',
                  'city',
                  'state',
                  'score',
                  'rank' 
                ]