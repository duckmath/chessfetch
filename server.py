import websockets
import asyncio


async def echo(websocket):
    while True:
        try:

            data = await websocket.recv()

            data = data.split(",")
            data.pop()
            print("Received: ", data)
            # update_board(data) do whatever u want with the data
            await websocket.send("received")
        except Exception as e:
            print("Connection close or error")
            print(e)
            break


async def main(host, port):

    await websockets.serve(echo, host, port)
    await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main("localhost", 6969))
