
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class WorkflowConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.workflow_id = self.scope['url_route']['kwargs']['workflow_id']
        self.room_group_name = f'workflow_{self.workflow_id}'
        self.user = self.scope["user"]

        if self.user.is_anonymous:
            await self.close()
            return

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket (optional, for commands)
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # message = text_data_json['message']
        pass

    # Receive message from room group
    async def workflow_update(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'workflow_update',
            'data': message
        }))
