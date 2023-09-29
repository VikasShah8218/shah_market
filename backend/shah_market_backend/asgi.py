import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shah_market_backend.settings')


from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from web_sockets.routing import websocket_urlpatterns
from channels.security.websocket import AllowedHostsOriginValidator

from web_sockets.authentication import TokenAuthMiddleware
from django.apps import apps
from django.conf import settings

apps.populate(settings.INSTALLED_APPS)

# application = get_asgi_application()
application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AllowedHostsOriginValidator(
        TokenAuthMiddleware(URLRouter(websocket_urlpatterns))
    ),
})