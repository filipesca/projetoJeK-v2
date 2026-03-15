from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MenuItem, Order
from .serializers import MenuItemSerializer, OrderSerializer

class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint para obter o menu (na totalidade ou por categoria).
    Usamos ReadOnly porque o cliente não deve poder alterar o menu.
    """
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        # Permite filtrar usando: /api/menu/?category=Entradas
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    """
    Endpoints para obter os pedidos existentes e submeter um novo pedido[cite: 59, 60].
    """
    # Ordenamos pelos mais recentes primeiro
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer

    @action(detail=True, methods=['patch'])
    def status(self, request, pk=None):
        """
        Endpoint específico para atualizar o estado do pedido (mover pedidos entre colunas).
        Exemplo de uso: PATCH /api/orders/1/status/ com body {"status": "Preparing"}
        """
        order = self.get_object()
        new_status = request.data.get('status')
        
        # Validação simples do estado
        valid_statuses = [choice[0] for choice in Order.STATUS_CHOICES]
        if new_status not in valid_statuses:
            return Response(
                {"error": "Estado inválido. Usa um dos estados permitidos."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = new_status
        order.save()
        return Response({'status': 'Estado atualizado com sucesso', 'new_status': order.status})