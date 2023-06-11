from rest_framework import generics
from .models import Institutes
from .serializer import InstituteSerializer

class InstituteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Institutes.objects.all()
    serializer_class=InstituteSerializer
    lookup_field='id'

class InstituteUpdateAPIView(generics.UpdateAPIView):
    queryset = Institutes.objects.all()
    serializer_class=InstituteSerializer
    lookup_field='id'
    def perform_update(self, serializer):
        return super().perform_update(serializer)