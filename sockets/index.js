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
  socket.on('clientJoined', clientJoined);
  socket.on('player', playerMsg);  

  function clientJoined(data){
    socket.broadcast.emit('clientJoined', {id:socket.id, x:data.x, y:data.y})
  }

  
  function playerMsg(data){
    socket.broadcast.emit('player', {x:data.x, y:data.y, id:socket.id}); 
  }

  function mouseMsg(data) {
    console.log(data);
    socket.broadcast.emit('mouse', data);
    // io.sockets.emit('mouse', data); // emits back to self
  }
  
  // client disconencted
  socket.on('disconnect', function() {
      socket.broadcast.emit('playerGone', {id:socket.id});
      console.log("player disconnected");
    }
  )
}

