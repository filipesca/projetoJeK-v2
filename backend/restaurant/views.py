from rest_framework import viewsets
from ..models import MenuItem, Order
from ..serializers import MenuItemSerializer, OrderSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    # Removido o filterset_fields para não exigir o django-filter extra, mantendo a simplicidade requerida 

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-timestamp')
    serializer_class = OrderSerializer