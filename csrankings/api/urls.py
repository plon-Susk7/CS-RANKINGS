from django.urls import path
from .views import overall_ranking

urlpatterns = [
    path('overall_ranking/', overall_ranking, name='overall_ranking'),
]
