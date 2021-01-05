from django.urls import path
from . import views

urlpatterns =[
    path('', views.index, name = 'index'),
    path('changeLike/', views.changeLike, name = 'changeLike'),
    path('changeLove/', views.changeLove, name = 'changeLove'),
    path('getLikeLove/<str:category>/<int:number>', views.getLikeLove, name = 'getLikeLove'),
    path('getBasket', views.getBasket, name = 'getBasket'),
    path('addOrder', views.addOrder, name = 'addOrder'),
    path('getOrder', views.getOrder, name = 'getOrder'),
]