"""
WSGI config for base project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""
import os, sys

from django.core.wsgi import get_wsgi_application

sys.path.append('/home/shaki/web-trading-platform-v2/base')
sys.path.append('/home/shaki/web-trading-platform-v2/env/lib/python3.8/site-packages')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "base.settings")

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'base.settings')
application = get_wsgi_application()
