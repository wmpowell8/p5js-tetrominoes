// Idea: I'm a fan of modern T****s, so I want to make a T****s clone that incorporates features of modern games. I've made something like this before, using Python and the Pygame library. However the code style was kind of crappy. I want to make a better version using JavaScript.

posMod = (divisor, dividend) => ((divisor % dividend) + dividend) % dividend // a trick for ensuring the result is always positive

const controls = {
  translateRight: [39/*right*/],
  translateLeft:  [37/*left*/],
  softDrop:       [40/*down*/],
  hardDrop:       [32/*space*/],
  rotateCW:       [88/*x*/, 38/*up*/],
  rotateCCW:      [90/*z*/],
  rotate180:      [65/*a*/],
  hold:           [16/*shift*/, 67/*c*/],
}

// Guideline gravity function: (levelM1) => (0.8-(levelM1*0.007))**levelM1 // levelM1 = level minus 1

function setup() {
  createCanvas(640, 480, WEBGL);
  
  g = new GameManager(function () {
    // Init
    
    
    this.m = new Matrix();
    this.bag = [];
    this.queue = [];
    this.queueLength = 5;
    this.heldTetromino = undefined;
    this.alreadyHeld = false;
    
    
    this.generate = function () {
      if (this.bag.length == 0) this.bag = SRS.bag();
      let n = floor(random(0,this.bag.length));
      let t = this.bag[n];
      this.bag.splice(n, 1);
      return t;
    }
    
    this.spawnNew = function () {
      let t;
      if (this.queue.length == 0) {
        t = this.generate();
      } else {
        t = this.queue.shift();
      }
      
      this.refillQueue();
      this.alreadyHeld = false;
      return t.spawn(ceil(this.m.getWidth()/2), -this.m.getHeight()+1);
    }
    
    this.refillQueue = function () {
      while (this.queue.length < this.queueLength) {
        this.queue.push(this.generate());
      }
    };
    
    this.hold = function () {
      if (this.alreadyHeld) return false;
      else {
        let intermediate = this.heldTetromino;
        this.heldTetromino = this.t.tetromino;
        this.heldTetromino.facing = 0;
        if (intermediate == undefined) this.t = this.spawnNew(); else {
          intermediate.facing = 0;
          this.t = intermediate.spawn();
        }
        this.alreadyHeld = true;
      }
      return true;
    }
    
    this.t = this.spawnNew();
  }, function () {
    // Update
    
  }, function () {
    // Show
    
    let md = this.m.getDimensions(); // matrix dimensions
    
    const minoSize = 400 / max(md.width, md.height)
    const gridToScreenX = (x) => (x - md.width/2) * minoSize
    const gridToScreenY = (y) => (y + md.height/2) * minoSize
    
    
    // Grid and matrix
  
    push();
    for (let i=0; i<md.width; i++) {
      for (let j=0; j<md.height; j++) {
        noFill();
        stroke("#ffffff80");
        square(gridToScreenX(i)-minoSize/2, gridToScreenY(-j)-minoSize/2, minoSize);
        if (this.m.minoAtPos(i, -j)) {
          push();
          fill(this.m.colorAtPos(i, -j));
          stroke("white");
          translate(gridToScreenX(i), gridToScreenY(-j), -minoSize/2);
          box(minoSize);
          pop();
        }
      }
    }
    pop();

    
    // Ghost piece
    
    let ghost = this.t.tetromino.spawn(this.t.x, this.t.y);
    while (ghost.translate(0, 1, (x,y)=>this.m.minoAtPos(x,y)) == true) {}
    
    push();
    let c = color(ghost.tetromino.color)
    c.setAlpha(128);
    fill(c);
    stroke("#ffffff80");
    for (let i of ghost.getCurrentShape()) {
      push();
      translate(gridToScreenX(i.x), gridToScreenY(i.y), -minoSize/2);
      box(minoSize); 
      pop();
    }
    pop();
    
    
    // Active tetromino
    
    push();
    fill(this.t.tetromino.color);
    stroke("white");
    for (let i of this.t.getCurrentShape()) {
      push();
      translate(gridToScreenX(i.x), gridToScreenY(i.y), -minoSize/2);
      box(minoSize); 
      pop();
    }
    pop();
    
    // Next piece queue
    
    this.queue.forEach(function (i, ind, arr) {
      push();
      fill(i.color);
      stroke("white");
      for (let j of i.getCurrentShape()) {
        push();
        translate(gridToScreenX(j.x + md.width + 3), gridToScreenY(j.y - md.height + 3 + ind*3), -minoSize/2);
        box(minoSize); 
        pop();
      }
      pop();
    });
    
    
    // Hold piece
    
    if (this.heldTetromino != undefined) {
      push();
      fill(this.alreadyHeld ? "darkgray" : this.heldTetromino.color);
      stroke("white");
      for (let j of this.heldTetromino.getCurrentShape()) {
        push();
        translate(gridToScreenX(j.x - 3), gridToScreenY(j.y - md.height + 3), -minoSize/2);
        box(minoSize); 
        pop();
      }
      pop();
    }
  });
  
  g.init();
}

function draw() {
  background(56);
  
  pointLight(color("white"), 0, 0, sqrt(120000));
  
  g.show();
}

function keyPressed() {
  if (controls.rotateCW.includes(keyCode)) {
    g.t.rotate(1, (x,y)=>g.m.minoAtPos(x,y));
  }
  if (controls.rotateCCW.includes(keyCode)) {
    g.t.rotate(-1, (x,y)=>g.m.minoAtPos(x,y));
  }
  if (controls.rotate180.includes(keyCode)) {
    g.t.rotate(2, (x,y)=>g.m.minoAtPos(x,y));
  }
  if (controls.translateRight.includes(keyCode)) {
    g.t.translate(1, 0, (x,y)=>g.m.minoAtPos(x,y));
  }
  if (controls.translateLeft.includes(keyCode)) {
    g.t.translate(-1, 0, (x,y)=>g.m.minoAtPos(x,y));
  }
  if (controls.softDrop.includes(keyCode)) {
    g.t.translate(0, 1, (x,y)=>g.m.minoAtPos(x,y));
  }
  if (controls.hardDrop.includes(keyCode)) {
    while (g.t.translate(0, 1, (x,y)=>g.m.minoAtPos(x,y)) == true) {}
    g.m.lock(g.t);
    g.m.clearLines();
    g.t = g.spawnNew();
  }
  if (controls.hold.includes(keyCode)) {
    g.hold();
  }
}