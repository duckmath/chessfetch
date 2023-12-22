import websockets
import asyncio


async def echo(websocket):
    while True:
        try:

            data = await websocket.recv()
            print("Received: " + data)
            # update_board(data) do whatever u want with the data
            await websocket.send("received")
        except:
            print("Connection close or error")
            break


async def main(host, port):

    await websockets.serve(echo, host, port)
    await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main("localhost", 6969))
