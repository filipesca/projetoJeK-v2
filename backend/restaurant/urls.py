from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet, OrderViewSet

# O DefaultRouter gera as rotas padrão automaticamente (GET, POST, PUT, PATCH, DELETE)
router = DefaultRouter()
router.register(r'menu', MenuItemViewSet, basename='menu')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    # Todos os nossos endpoints ficarão debaixo do prefixo /api/ 
    path('api/', include(router.urls)),
]