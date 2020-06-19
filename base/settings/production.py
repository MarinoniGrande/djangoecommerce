#  from decouple import config

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'pin_vendamais',
        'USER': 'pin_vendamais',
        'PASSWORD': 'pin_vendamais',
        'HOST': '10.161.96.3',  # IP interno do servidor do BD
        'PORT': '5432',
    },
    'pin_cliente': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'pin_cliente',
        'USER': 'pin_cliente',
        'PASSWORD': 'Au!knGmpA4nA',
        'HOST': '10.161.96.3',
        'PORT': '5432',  # 8000 is default
    },
    'pin_api': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'pin_api',
        'USER': 'pin_api',
        'PASSWORD': 'TU9lK^bkf&Uf7%UgWzC0tb',
        'HOST': '10.161.96.3',
        'PORT': '5432',  # 8000 is default
    }
}


# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
#         'LOCATION': '127.0.0.1:11211',
#     }
# }

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.mailgun.org'
EMAIL_PORT = 587
# EMAIL_HOST_USER = config('EMAIL_HOST_USER')
# EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True

# import sentry_sdk
# from sentry_sdk.integrations.django import DjangoIntegration
#
# sentry_sdk.init(
#    dsn="https://f29576010ab14cf2962191d57a3ac0b6@sentry.io/5182233",
#    integrations=[DjangoIntegration()],
#
# # If you wish to associate users to errors (assuming you are using
# # django.contrib.auth) you may enable sending PII data.
#    send_default_pii=True
# )


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'propagate': True,
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': False,
        },
    }
}
#
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
# SECURE_SSL_REDIRECT = True

API_URLS = {
    'procfit': {
        'prevenda': "https://webhook.drogariasnissei.com.br:5052/callback/prevenda/enviar",
    },
    'magento': {
        'pedido': 'https://admloja.farmaciasnissei.com.br',
    }
}

ENVIAR_NOTIFICACAO = True