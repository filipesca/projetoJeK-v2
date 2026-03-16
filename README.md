1. Backend
Navegar para a pasta do backend: cd backend
Instalar as dependências necessárias: pip install django djangorestframework django-cors-headers
Preparar e aplica as migrações da base de dados: python manage.py makemigrations restaurant + python manage.py migrate
Adicionar ao menu os pratos iniciais: python menu.py
Iniciar o servidor: python manage.py runserver
(O servidor ficará a correr em http://localhost:8000/)

2. Frontend
Abrir um novo terminal e navegar para a pasta do frontend: cd frontend
Instalar as dependências necessárias: npm install
Iniciar o servidor de desenvolvimento: npm run dev
(O site ficará disponível em http://localhost:5173/)