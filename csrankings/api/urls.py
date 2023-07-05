from django.urls import path
from .views import *


urlpatterns = [
    path('overall_ranking/', overall_ranking, name='overall_ranking'),
    path('placement/ug/<str:id>', get_placement_ug, name='get_placement_ug'),
    path('placement/pg/<str:id>', get_placement_pg, name='get_placement_ug')
]
