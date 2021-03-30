var socket;

function setup() {
  createCanvas(400, 400);
  background(0);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data){
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 10, 10);
}

function draw() {
}

function mouseDragged(){
  fill(100,100,100);
  stroke(100,100,100);
  ellipse(mouseX, mouseY, 10, 10);
  var data = {
    x : mouseX,
    y : mouseY
  }
  socket.emit('mouse', data);
}
