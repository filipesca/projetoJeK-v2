from pathlib import Path

# Constrói caminhos dentro do projeto assim: BASE_DIR / 'subdir'.
# (Se já tiveres esta linha no topo do ficheiro, não precisas de duplicar)
BASE_DIR = Path(__file__).resolve().parent.parent

# Configuração da Base de Dados
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

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
    'restaurant',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*'] # O asterisco permite acederes através de localhost, 127.0.0.1, etc.

# Para desenvolvimento local, podes permitir todas as origens:
CORS_ALLOW_ALL_ORIGINS = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'