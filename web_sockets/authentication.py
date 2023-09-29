from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from acc.models import User
from urllib.parse import parse_qs
from .models import ConnectionReq

class TokenAuthMiddleware:
    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        try:
            params = parse_qs(scope["query_string"].decode())
            req = await database_sync_to_async(ConnectionReq.objects.get)(id=int(params['req_id'][0]), one_time_key=params['key'][0])
            scope['user'] = await database_sync_to_async(User.objects.get)(id=req.user_id)
            await database_sync_to_async(req.delete)()
        except KeyError:
            scope['user'] = AnonymousUser()
        except ConnectionReq.DoesNotExist:
            scope['user'] = AnonymousUser()
        except User.DoesNotExist:
            scope['user'] = AnonymousUser()

        return await self.app(scope, receive, send)