#  Cada desenvolvedor pode fazer uma copia de este arquivo para configurar seu proprio entorno

from django.urls import path, include

from .base import *

DEBUG = True

INSTALLED_APPS += [
    'debug_toolbar',
]
ALLOWED_HOSTS = ['*']

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', ]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEBUG_TOOLBAR_CONFIG = {
    'JQUERY_URL': '',
}


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'pin_vendamais',
        'USER': 'pin_vendamais',
        'PASSWORD': 'Inteliger@2020',
        'HOST': '34.66.145.134',
        'PORT': '5432',
    },
    'pin_cliente': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'pin_cliente',
        'USER': 'pin_cliente',
        'PASSWORD': 'Inteliger@2020',
        'HOST': '34.66.145.134',
        'PORT': '5432',  # 8000 is default
    },
    'pin_api': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'pin_api',
        'USER': 'pin_api',
        'PASSWORD': 'desenvolvimento',
        'HOST': '34.66.145.134',
        'PORT': '5432',
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