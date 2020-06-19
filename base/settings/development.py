#  Cada desenvolvedor pode fazer uma copia de este arquivo para configurar seu proprio entorno

from django.urls import path, include

from .base import *

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', '*']

INSTALLED_APPS += [
    # 'debug_toolbar',
]


# MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', ]

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEBUG_TOOLBAR_CONFIG = {
    'JQUERY_URL': '',
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

API_URLS = {
    'procfit': {
        'prevenda': "https://webhook.drogariasnissei.com.br:5052/callback/prevenda/enviar",
    },
    'magento': {
        'pedido': "https://devdh.farmaciasnissei.com.br/",
    }
}

ENVIAR_NOTIFICACAO = False