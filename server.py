import asyncio
import websockets


async def json_handler(websocket):
    async for message in websocket:
        await websocket.send(message)


class WebSocket:
    host = "localhost"
    port = 1

    def __init__(self, host, port):
        self.host = host
        self.port = port

    async def run(self):
        websockets.serve(json_handler, self.host, self.port)
        await asyncio.Future()


if __name__ == "__main__":
    socket = WebSocket("localhost", 20)

    asyncio.run(socket.run())
