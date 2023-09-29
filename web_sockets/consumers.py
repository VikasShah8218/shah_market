from channels.consumer import AsyncConsumer
from channels.exceptions import StopConsumer
import json
# from channels.db import database_sync_to_async

# global veriables
ws_users = {}

# Assumptions:
# ** 'chat'=> 'Chatting'
# ** 'noti'=> 'Notification')

class MyAsyncConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print('Websocket connected...', event)
        if self.scope["user"].is_authenticated:
            try:
                ws_users[self.scope["user"].id].append(self)
            except KeyError:
                ws_users[self.scope["user"].id] = [self]
            await self.send({"type": "websocket.accept"})

            # resData = json.dumps({"event_type": "user_connected", "user_id": self.scope["user"].id})
            # live_users = []
            # for ws_user_id in ws_users:
            #     live_users.append(ws_user_id)
            #     for ws_obj in ws_users[ws_user_id]:
            #         await ws_obj.send({"type": "websocket.send", "text": resData})

            await self.send({"type": "websocket.send", "text": json.dumps({"msg":"connected Successfuly"})})

        else:
            await self.send({"type": "websocket.reject"})

    async def websocket_receive(self, event):
        print('Websocket received...', event)
        data = json.loads(event["text"])
        user_id = self.scope["user"].id

        
    async def websocket_disconnect(self, event):
        print('Websocket disconnected...', event)

        ws_users[self.scope["user"].id].remove(self)
        if len(ws_users[self.scope["user"].id]) == 0:
            del ws_users[self.scope["user"].id]

        raise StopConsumer()


async def live_data_to_all(data):
    for user_id in ws_users:
        for ws_obj in  ws_users[user_id]:
            await ws_obj.send({"type": "websocket.send", "text": json.dumps(data)})

    # print(ws_users)
