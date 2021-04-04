var socket;
let w = h = 800
let posX = getRandInt(w);
let posY = getRandInt(h);
let player=false;
let playerDictionary = {};

function getRandInt(max){
  return Math.floor(Math.random()*max);
}

function setup() {
  let cnv = createCanvas(w, h);
  cnv.setPosition
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  background(0);
  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
  socket.on('player', drawPlayer);
  socket.on('playerGone', playerDisconnected);
  socket.on('clientJoined', createPlayer);
  socket.emit('clientJoined', {x:posX, y:posY});

  playerDictionary["0"] = new Player(posX, posY);

}

function createPlayer(data){
  playerDictionary[data.id] = Player(data.x, data.y);
}

function playerDisconnected(data){
  background(0); 
}

function drawPlayer(data){
  player=true;
}

function newDrawing(data){
  fill(255, 0, 100);
  noStroke();
  ellipse(data.x, data.y, 10, 10);
}

function update(){
}

function draw() {
  background(0);
  if (keyIsDown(LEFT_ARROW)) {
    posX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    posX += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    posY -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    posY += 5;
  }
  
  noStroke();
  fill(0, 0, 200);  
  //ellipse(data.x, data.y, 30, 30);

  noStroke();
  socket.emit('player', {x:posX, y:posY});
  fill(0, 200, 0);
  ellipse(posX, posY, 30, 30);
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

class Player {
  constructor(x, y){
  this.x = x;
  this.y = y;
  }
  draw(){
    ellipse(this.x, this.y,30,30);
  }
}
