const http = require('http');
const axios = require('axios').default;
const server = http.createServer();
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: '*'
});

// https://api.brick-hill.com/v1/user/profile?id=2

const sockets = []

setInterval(async () => {
    const res = await axios.get('https://api.brick-hill.com/v1/user/profile?id=2', {
        validateStatus: () => true
    })

    for (const socket of sockets) {
        if (socket && socket.connected) {
            socket.emit("status", res.status == 200 , res.status, res.statusText)
        }
    }
}, 5000);

io.on('connection', (socket) => {
    console.log('a user connected');
    sockets.push(socket)
});
  
server.listen(3000, () => {
    console.log('listening on *:3000');
});