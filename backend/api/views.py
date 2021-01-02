from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
import json

from .models import Item, Basket

def index(request):
    return HttpResponse('Hello, world!')

def getLikeLove(request, name = ''):
    if request.method == 'GET':
        for item in Item.objects.all():
            if item.name == name:
                return JsonResponse({'liked': item.liked, 'loved': item.loved}, status = 201)
        
        return JsonResponse(status=400)    #no such name
    else:
        return HttpResponseNotAllowed(['GET'])
    
#Add or Substract Like
def changeLike(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        name = body['name']
        for item in Item.objects.all():
            if item.name == name:
                if item.liked:
                    item.liked -= 1        #substract like if not liked
                else:    
                    item.liked += 1        #add like if liked
                item.save()
                return JsonResponse({'liked': item.liked},status = 201)
            
        return JsonResponse(status=400)    #no such name
    else:
        return HttpResponseNotAllowed(['POST'])
        
def changeBasket(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        name = body['name']
        for item in Item.objects.all():
            if item.name == name:
                if item.loved:
                    item.loved -= 1        #substract love if not loved
                    item_in_basket = Basket.objects.get(name = item.name)
                    item_in_basket.delete()
                else:    
                    item.loved += 1        #add love if loved
                    item_in_basket = Basket(name = item.name)
                    item_in_basket.save()
                item.save()
                return JsonResponse({'loved': item.loved},status = 201)
            
        return HttpResponse(status=400)    #no such name
    else:
        return HttpResponseNotAllowed(['POST'])
    
    
