from django.urls import path,re_path
from .views import *


urlpatterns = [
    path('overall_ranking/', overall_ranking, name='overall_ranking'),
    re_path(r'^institute/IR-E-(U|C|I)-\d{4}/UG/placement/',get_placement_ug,name='get_placement_ug'),
    re_path(r'^institute/IR-E-(U|C|I)-\d{4}/PG/placement/',get_placement_pg, name='get_placement_pg'),
    re_path(r'^institute/IR-E-(U|C|I)-\d{4}/UG/students/',UGData,name='get_student_ug'),
    re_path(r'^institute/IR-E-(U|C|I)-\d{4}/PG/students/',PGData,name='get_student_pg'),
    re_path(r'^institute/IR-E-(U|C|I)-\d{4}/PHD/students/',PHDData,name='get_student_phd'),
]
