from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet, OrderViewSet

# O DefaultRouter cria automaticamente as rotas para os ViewSets (GET, POST, PATCH, etc.)
router = DefaultRouter()
router.register(r'menu', MenuItemViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    # O prefixo 'api/' garante que os endpoints correspondem ao frontend
    path('api/', include(router.urls)),
]