INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # As tuas adições:
    'rest_framework',
    'corsheaders',
    'backend',  # Substitui pelo nome da app onde criaste o models.py e views.py
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Adiciona no topo
    'django.middleware.security.SecurityMiddleware',
    # ... (restantes middlewares default)
]

# Para desenvolvimento local, podes permitir todas as origens:
CORS_ALLOW_ALL_ORIGINS = True