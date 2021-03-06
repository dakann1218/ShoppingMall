from django.db import models

class Item(models.Model):
    name = models.TextField()
    category = models.TextField(default = '')
    number = models.IntegerField(default = 0)
    
    title = models.TextField()
    description = models.TextField()
    price = models.TextField()
    
    liked = models.IntegerField(default = 0)
    loved = models.IntegerField(default = 0)
    like = models.IntegerField(default = 0)
    love = models.IntegerField(default = 0)

class Like(models.Model):
    customer_id = models.TextField(default = '')
    category = models.TextField(default = '')
    number = models.IntegerField(default = 0)
    
class Love(models.Model):
    customer_id = models.TextField(default = '')
    category = models.TextField(default = '')
    number = models.IntegerField(default = 0)
    
class OrderList(models.Model):
    customer_id = models.TextField(default = '')
    category = models.TextField(default = '')
    number = models.IntegerField(default = 0)
    size = models.TextField(default = '')
    color = models.TextField(default = '')
    address = models.TextField(default = '')
    
class Customer(models.Model):
    customer_id = models.TextField()
    customer_pw = models.TextField()
    customer_email = models.TextField()
    customer_address = models.TextField()
    
class QnA(models.Model):
    customer_id = models.TextField()
    title = models.TextField()
    content = models.TextField()