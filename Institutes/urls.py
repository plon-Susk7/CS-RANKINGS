from django.urls import path
from .import views
urlpatterns=[
    path('',views.InstituteListCreateAPIView.as_view(),name='Institute-List')
]