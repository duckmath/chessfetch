import websockets
if __name__ == "__main__":
    server = websockets.WebSocketServer(host="localhost", port=8765)
    server.server_forever()
    #broken
