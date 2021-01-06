from django.urls import path
from . import views

urlpatterns =[
    path('', views.index, name = 'index'),
    path('changeLike/', views.changeLike, name = 'changeLike'),
    path('changeLove/', views.changeLove, name = 'changeLove'),
    path('getLikeLove/<str:category>/<int:number>', views.getLikeLove, name = 'getLikeLove'),
    path('getBasket/<str:id>', views.getBasket, name = 'getBasket'),
    path('addOrder', views.addOrder, name = 'addOrder'),
    path('getOrder/<str:id>', views.getOrder, name = 'getOrder'),
    path('signIn/<str:id>/<str:pw>', views.signIn, name = 'signIn'),
    path('signUp', views.signUp, name = 'signUp'),
    path('getAllLikeLove/<str:id>', views.getAllLikeLove, name = 'getAllLikeLove'),
]