from rest_framework import serializers

from api.models import Rankings


#createb serializers here
class RankSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model =  Rankings
        fields = "__all__"