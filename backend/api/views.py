from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
import json
from .models import Item, Love, Like, OrderList, Customer

def index(request):
    return HttpResponse('Hello, world!')

def getAllLikeLove(request, id = ''):
    if request.method == 'GET':
        likelist = []
        lovelist = []
        for item in Like.objects.all():
            if item.customer_id == id:
                likelist.append(item.category + str(item.number))
        for item in Love.objects.all():
            if item.customer_id == id:
                lovelist.append(item.category + str(item.number))
        return JsonResponse({ 'liked': likelist, 'loved': lovelist }, status = 201)
    else:
        return HttpResponseNotAllowed(['GET'])

def getLikeLove(request, id = '', category = '', number = 0):
    if request.method == 'GET':
        like = False
        love = False
        for item in Like.objects.all():
            if item.customer_id == id & item.category == category & item.number == number:
                like = True
        for item in Love.objects.all():
            if item.customer_id == id & item.category == category & item.number == number:
                love = True
        return JsonResponse({'liked': like, 'loved': love }, status = 201)
    else:
        return HttpResponseNotAllowed(['GET'])

#Add or Substract Like
def changeLike(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        id = body['id']
        category = body['category']
        number = body['number']
        for item in Like.objects.all():
            if ((item.customer_id == id) & (item.category == category) & (item.number == number)):
                item.delete()
                return JsonResponse({'liked': False}, status = 201)
        item = Like(customer_id = id, category = category, number= number)
        item.save()
        return JsonResponse({'liked': True}, status = 201)
    else:
        return HttpResponseNotAllowed(['POST'])

def changeLove(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        id = body['id']
        category = body['category']
        number = body['number']
        for item in Love.objects.all():
            if ((item.customer_id == id) & (item.category == category) & (item.number == number)):
                item.delete()
                return JsonResponse({'loved': False}, status = 201)
        item = Love(customer_id = id, category = category, number= number)
        item.save()
        return JsonResponse({'loved': True}, status = 201)
    else:
        return HttpResponseNotAllowed(['POST'])
    
def getBasket(request, id = ''):
    if request.method == 'GET':
        basket_list = []
        for item in Love.objects.all():
            if item.customer_id == id:
                basket_list.append({ 'category': item.category, 'number': item.number })
        return JsonResponse({'basket_list': basket_list}, status = 201)
    else:
        return HttpResponseNotAllowed(['GET'])
    
def addOrder(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        id = body['id']
        category = body['category']
        number = body['number']
        size = body['size']
        color = body['color']
        address = body['address']
        
        new_order = OrderList( customer_id = id, category = category, number = number, size = size, color = color, address = address )
        new_order.save()
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(['POST'])
    
def getOrder(request, id = ''):
    if request.method == 'GET':
        order_list = []
        for order in OrderList.objects.all():
            if order.customer_id == id:
                order_list.append({'category': order.category, 'number': order.number, 'size': order.size, 'color': order.color, 'address': order.address })
        return JsonResponse({'order_list': order_list}, status = 201)
    else:
        return HttpResponseNotAllowed(['GET'])
        
#login system
def signIn(request, id = '', pw = ''):
    if request.method == 'GET':
        try:
            if pw == Customer.objects.get(customer_id = id).customer_pw:
                return JsonResponse({'certification': True}, status = 201)
            else:
                return JsonResponse({'certification': False}, status = 201)
        except:
            return JsonResponse({'certification': False}, status = 201)
    else:
        return HttpResponseNotAllowed(['GET'])
       
def signUp(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        id = body['id']
        pw = body['pw']
        email = body['email']
        address = body['address']
        try:
            Customer.objects.get(customer_id = id)
            return JsonResponse({'no_duplicate': False}, status = 201)
        except:
            new_customer = Customer(customer_id = id, customer_pw = pw, customer_email = email, customer_address = address)
            new_customer.save()
            return  JsonResponse({'no_duplicate': True}, status = 201)
    else:
        return HttpResponseNotAllowed(['POST'])
        
        
        
    
    
    
    
    
