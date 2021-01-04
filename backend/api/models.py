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
    
class Basket(models.Model):
    category = models.TextField(default = '')
    number = models.IntegerField(default = 0)