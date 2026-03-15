# Sistema de Gestão de Pedidos para Restaurante

Aplicação web full-stack desenvolvida para um ambiente de restaurante, contemplando uma interface de cliente para realização de pedidos e um dashboard Kanban para gestão na cozinha.

## Como correr o projeto localmente

### Backend (Django)
1. Navegar para a pasta `backend`: `cd backend`
2. Criar ambiente virtual (opcional mas recomendado): `python -m venv venv` e ativar.
3. Instalar dependências: `pip install django djangorestframework django-cors-headers`
4. Aplicar migrações: `python manage.py makemigrations` e `python manage.py migrate`
5. Criar super utilizador para adicionar itens ao menu: `python manage.py createsuperuser`
6. Iniciar o servidor: `python manage.py runserver`

### Frontend (React/Vite)
1. Navegar para a pasta `frontend`: `cd frontend`
2. Instalar dependências: `npm install` (certifica-te que tens o axios e o react-router-dom instalados: `npm install axios react-router-dom`)
3. Iniciar a aplicação: `npm run dev`

## Decisões Arquiteturais e Justificação
* **Stack Escolhido:** Optei por Django REST Framework no backend devido à sua robustez e facilidade em montar endpoints REST rapidamente. No frontend, React permite uma componentização limpa e reativa, ideal para a gestão de estado do carrinho de compras e do Kanban.
* **Modelo de Dados:** Separei `Order` e `OrderItem` para manter as regras de normalização, permitindo que cada pedido tenha múltiplos pratos com quantidades independentes.
* **Atualizações de Dados:** Para manter a simplicidade dentro do prazo, optei por *polling* no `useEffect` (com botão de refresh manual) em vez de WebSockets. 

## Melhorias Futuras
* Implementar *WebSockets* (ex: Django Channels) para atualizações do quadro em tempo real puras.
* Adicionar funcionalidade nativa de *drag-and-drop* no quadro Kanban.