var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("server running on port blah blah");

var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
  //console.log(socket);
  console.log(socket.id);
  socket.on('mouse', mouseMsg);
  function mouseMsg(data) {
    console.log(data);
    socket.broadcast.emit('mouse', data);
    // io.sockets.emit('mouse', data); // emits back to self
  }
}

