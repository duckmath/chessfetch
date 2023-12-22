class WebClient {
    constructor(host, port) {
        console.log("WebClient created")
        this.host = host;
        this.port = port;
        this.socket = null;
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
        };

        this.socket.onclose = (event) => {
            console.log("Disconnected");
        };

    }

}

function start_websocket(host,port) {
    const socket = new WebClient(host,port);
    socket.connect();
}
/*
checks for new host and port every 5 seconds

void function
 */
function event_loop() {
    chrome.storage.local.get(['ChessFetchHost', 'ChessFetchPort'], function(result) {
        console.log('Value of ChessFetchHost is ' + result.ChessFetchHost);
        console.log('Value of ChessFetchPort is ' + result.ChessFetchPort);

        if(result.ChessFetchHost !== undefined && result.ChessFetchPort !== undefined){
            if(result.ChessFetchHost !== "old" && result.ChessFetchPort !== 0){
                start_websocket(result.ChessFetchHost,result.ChessFetchPort);
                chrome.storage.local.set({ ChessFetchHost: "old" });
                chrome.storage.local.set({ ChessFetchPort: 0 });
                setTimeout(event_loop, 5000);
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
console.log("ChessFetch Launched");
event_loop();

