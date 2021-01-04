from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
import json
from .models import Item, Basket

def index(request):
    return HttpResponse('Hello, world!')

def getLikeLove(request, category = '', number = 0):
    if request.method == 'GET':
        for item in Item.objects.all():
            if item.category == category:
                if  item.number == number:
                    return JsonResponse({'liked': item.liked, 'loved': item.loved}, status = 201)
        
        return JsonResponse(status=400)    #no such name
    else:
        return HttpResponseNotAllowed(['GET'])
    
#Add or Substract Like
def changeLike(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        category = body['category']
        number = body['number']
        for item in Item.objects.all():
            if item.category == category:
                if  item.number == number:
                    if item.liked:
                        item.liked -= 1        #substract like if not liked
                    else:    
                        item.liked += 1        #add like if liked
                    item.save()
                    return JsonResponse({'liked': item.liked}, status = 201)
            
        return JsonResponse(status=400)    #no such name
    else:
        return HttpResponseNotAllowed(['POST'])
        
def changeLove(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        category = body['category']
        number = body['number']
        for item in Item.objects.all():
            if item.category == category:
                if  item.number == number:
                    if item.loved:
                        item.loved -= 1        #substract love if not loved
                        try:
                            item_in_basket = Basket.objects.get(category = item.category, number = item.number)
                            item_in_basket.delete()
                        except:
                            None
                    else:    
                        item.loved += 1        #add love if loved
                        item_in_basket = Basket(category = item.category, number = item.number)
                        item_in_basket.save()
                    item.save()
                    return JsonResponse({'loved': item.loved}, status = 201)
            
        return HttpResponse(status=400)    #no such name
    else:
        return HttpResponseNotAllowed(['POST'])
    
def getBasket(request):
    if request.method == 'GET':
        basket_list = []
        for item in Basket.objects.all():
            basket_list.append({ 'category': item.category, 'number': item.number })
        return JsonResponse({'basket_list': basket_list}, status = 201)
    else:
        return HttpResponseNotAllowed(['GET'])
