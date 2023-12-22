/*
simple webclient class that connects to a websocket server

params:


    host: the host of the websocket server
    port: the port of the websocket server
 */
class WebClient {
    constructor(host, port) {
        console.log("WebClient created")
        this.host = host;
        this.port = port;
        this.socket = null;
        this.message = "";
    }
    connect(){
        this.socket = new WebSocket(`ws://${this.host}:${this.port}`);

        this.socket.onerror = (error) => {
            console.log("Connection Failed");
            console.error(error);
        };

        this.socket.onopen = (event) => {
            console.log("Connected");
            this.socket.send("Hey server");
        };

        this.socket.onmessage = (event) => {
            console.log(`Received message from server: ${event.data}`);
            this.socket.send(this.message) // msg server back to retain loop
        };

        this.socket.onclose = (event) => {
            console.log("Disconnected");
        };

    }
    setMessage(newMessage){
        this.message = newMessage;
    }

}

/*
checks for new host and port every 5 seconds

instead of using storage send a message retard
void function
 */
function event_loop() {
    chrome.storage.local.get(['ChessFetchHost', 'ChessFetchPort', "ChessFetchCurrentBoardData"], function(result) {
        console.log('Value of ChessFetchHost is ' + result.ChessFetchHost);
        console.log('Value of ChessFetchPort is ' + result.ChessFetchPort);
        console.log('Value of BoardData is ' + result.ChessFetchCurrentBoardData);


        if(result.ChessFetchHost !== undefined && result.ChessFetchPort !== undefined){
            if(result.ChessFetchHost !== "old" && result.ChessFetchPort !== 0){
                const socket = new WebClient(result.ChessFetchHost,result.ChessFetchPort);
                socket.connect();
                chrome.storage.local.set({ ChessFetchHost: "old" });
                chrome.storage.local.set({ ChessFetchPort: 0 });
                socket.setMessage(result.ChessFetchCurrentBoardData)

            }
            else{
                setTimeout(event_loop, 5000);
            }
        }
        else {
            setTimeout(event_loop, 5000);

        }
    });
}
chrome.storage.local.set({ ChessFetchHost: "old" });
chrome.storage.local.set({ ChessFetchPort: 0 });
chrome.storage.local.set({ ChessFetchCurrentBoardData: "" });

console.log("ChessFetch Launched");
event_loop();

