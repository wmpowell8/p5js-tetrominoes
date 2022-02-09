// Idea: I'm a fan of modern T****s, so I want to make a T****s clone that incorporates features of modern games. I've made something like this before, using Python and the Pygame library. However the code style was kind of crappy. I want to make a better version using JavaScript.

const SRS = new RS([
  { // Z
    color: "red",
    0: [{x:-2,y:-2},{x:-1,y:-2},{x:-1,y:-1},{x:0,y:-1}],
    1: [{x:0,y:-2},{x:-1,y:-1},{x:0,y:-1},{x:-1,y:0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x:-1,y:0},{x:0,y:0}],
    3: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:-2,y:0}],
  },
  { // L
    color: "#ff8000",
    0: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    1: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    2: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    3: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
  },
  { // O
    color: "yellow",
    0: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    1: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    2: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    3: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
  },
  { // S
    color: "lime",
    0: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    1: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    2: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    3: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
  },
  { // I
    color: "cyan",
    0: [{x:-2,y:-2},{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2}],
    1: [{x:0,y:-3},{x:0,y:-2},{x:0,y:-1},{x:0,y:0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1}],
    3: [{x:-1,y:-3},{x:-1,y:-2},{x:-1,y:-1},{x:-1,y:0}],
  },
  { // J
    color: "blue",
    0: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    1: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    2: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    3: [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
  },
  { // T
    color: "magenta",
    0: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1}],
    1: [{x:-1,y:-2},{x:-1,y:-1},{x:0,y:-1},{x:-1,y:0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:-1,y:0}],
    3: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:-1,y:0}],
  }
], function () {/* Rotate function quirks still need to be ironed out */});




function setup() {
  createCanvas(640, 480, WEBGL);
}

function draw() {
  background(56);
  
  
  // Still working on implementing the Super Rotation System (SRS). My progress on the first part of the implementation is visualized using this rotating block.
  
  pointLight(color("white"), 0, 0, sqrt(120000));
  for (let i of SRS.tetrominoes[int(millis()/4000)%SRS.tetrominoes.length][int(millis()/1000)%4]){
    push();
    rotateX(millis()/1000);
    rotateY(millis()/1000);
    translate((i.x + 1) * 50,(i.y + 1) * 50,0);
    fill(SRS.tetrominoes[int(millis()/4000)%SRS.tetrominoes.length].color);
    stroke("white");
    box();
    pop();
  }
}