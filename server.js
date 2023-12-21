WebSocket = require("ws")


const socket = new WebSocket('ws://localhost:6969');

socket.onerror = (error) => {
    console.log("Connection Failed");
    console.error(error);
};

socket.onopen = (event) => {
    console.log("Connected");
    socket.send("Hey server");
}
socket.onclose = (event) => {
    console.log("Disconnected");
}