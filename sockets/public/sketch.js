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
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  background(0);
  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
  socket.on('player', updatePlayer);
  socket.on('playerGone', playerDisconnected);
  socket.on('clientJoined', createPlayer);
  socket.emit('clientJoined', {x:posX, y:posY});

  playerDictionary["0"] = new Player(posX, posY);

}
function updatePlayer(data){
  //console.log(data.id);
  playerDictionary[data.id].x = data.x;
  playerDictionary[data.id].y = data.y;
}

function createPlayer(data){
  playerDictionary[data.id] = new Player(data.x, data.y);
  socket.emit('clientJoined', {x:posX, y:posY});
}

function playerDisconnected(data){
  console.log("deleting player");
  delete playerDictionary[data.id];
  console.log(playerDictionary);
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
    playerDictionary["0"].x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerDictionary["0"].x += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    playerDictionary["0"].y  -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerDictionary["0"].y  += 5;
  }
  
  noStroke();
  fill(0, 0, 200);  
  //ellipse(data.x, data.y, 30, 30);
  fill(0, 200, 0);

  // loop over players and call draw function
  for(let [key, player] of Object.entries(playerDictionary)){
    player.draw();
  }

  noStroke();
  socket.emit('player', {
      x:playerDictionary["0"].x ,
      y:playerDictionary["0"].y 
    }
  );
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
