from django.urls import path
from . import views

urlpatterns =[
    path('', views.index, name = 'index'),
    path('changeLike/', views.changeLike, name = 'changeLike'),
    path('changeBasket/', views.changeBasket, name = 'changeBasket'),
    path('getLikeLove/<str:name>', views.getLikeLove, name = 'getLikeLove')
]