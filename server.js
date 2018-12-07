var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
//app.use(express.static(path.join(__dirname, "")));
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server running...");
app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s sockets connected", connections.length);
    });

    socket.on('send message', function(data){
        console.log(data);
        io.sockets.emit('new message', {msg: data});
    });

});