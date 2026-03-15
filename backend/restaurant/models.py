from django.db import models

class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('Entradas', 'Entradas'),
        ('Sopas', 'Sopas'),
        ('Carne', 'Carne'),
        ('Peixe', 'Peixe'),
        ('Sobremesa', 'Sobremesa')
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    ingredients = models.TextField()

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [
        ('Order Preview', 'Order Preview'),
        ('Preparing', 'Preparing'),
        ('Cooling Down', 'Cooling Down'),
        ('Ready to Serve', 'Ready to Serve'),
        ('Concluded', 'Concluded')
    ]
    table_number = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Order Preview')

class OrderLine(models.Model):
    order = models.ForeignKey(Order, related_name='lines', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField()