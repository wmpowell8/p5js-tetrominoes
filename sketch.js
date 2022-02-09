// Idea: I'm a fan of modern T****s, so I want to make a T****s clone that incorporates features of modern games. I've made something like this before, using Python and the Pygame library. However the code style was kind of crappy. I want to make a better version using JavaScript.


// Presenting Questions:

// I'm a fan of T****s, so it's natural for me to choose to make a T****s clone for my final project. But more specifically I'm a fan of modern T****s, so not only did I make a T****s clone, but the intracacies of modern titles are baked into this project. If you've ever played a modern T****s game the mechanics of this project should feel the same. Heck, even games from as early as 2001 have most of the modern mechanics, with a few exceptions.
// The framework for this project definitely took me a long time to code, but it made coding the rest of the project so much easier. But what gave me a lot of trouble was improper recognition of T-spins, one of the features of modern T****s. I spent so much time creating debug tools and putting print statements in but in reality I just had to do the recognition before line clear detection and not after.
// If I was given the chance to redo this project, I would definitely make the code less messy. The last time I made a T****s clone, where I used the Python programming language and the Pygame library, it was a big mess of code that was hard to navigate, develop, and maintain. Some parts of this project ended up turning out like the other one, and if I were given a chance to redo this project, I would definitely try to prevent that from happening again. I would also incorporate a feature that I did not have time to implement: delays such as line clear delay and "ARE" ("ah-ray" / あれ).


// It's worth noting that game overs are handled by throwing exceptions. For example if you clear 150 lines the game will throw the "You win" error.


// Some questions you may have:
// How do I control the game? See "const controls" below.
// Why is clearing 4 lines at once using the I-tetromino called a "Quad" and not a "T****s" like it's supposed to? A lot of fangames/clones don't call it a T****s; I can only assume it's because of copyright infringement.
// How are you able to obtain the information on how modern T****s works? This info is freely avalible on various wikis and I know a lot of it by heart. It is avalible partially because of reverse-engineering and partially because of... dare I say it... leaked documents from the T****s Company.

// A function like modulus, but that always returns a positive result.
posMod = (divisor, dividend) => ((divisor % dividend) + dividend) % dividend; // a trick for ensuring the result is always positive

// An Object with the game's controls.
const controls = {
  translateRight: [39/*right*/],
  translateLeft:  [37/*left*/],
  softDrop:       [40/*down*/],
  hardDrop:       [32/*space*/],
  rotateCW:       [88/*x*/, 38/*up*/],
  rotateCCW:      [90/*z*/],
  rotate180:      [65/*a*/],
  hold:           [16/*shift*/, 67/*c*/],
};

var regularFont;
var g;

function preload() {
  // Loads the font used in the project. May take a while, so be patient.
  regularFont = loadFont("Roboto-Regular.ttf");
}  

function setup() {
  createCanvas(640, 480, WEBGL);
  
  // Some variables related to inputs
  
  hardDropThisFrame = false;
  translationDirection=0;
  
  
  // Most of the code related to how the game behaves is embedded in this assignment.
  
  g = new GameManager(
    function (lockDelay=500, movementsPerTetromino=15) {
    // Init
    
    
    // Variables related to the game
      
    this.lockDelay = lockDelay;
    this.movementsPerTetromino = movementsPerTetromino;
    
    this.m = new Matrix();
    this.bag = [];
    this.queue = [];
    this.queueLength = 5;
    this.heldTetromino = undefined;
    this.alreadyHeld = false;
    this.lineCount = 0;
    this.levelM1 = 0;
    this.gravityTimer = 0;
    this.lockTimer = this.lockDelay;
    this.score = 0;
    this.movementTimer = -240;
    this.movementsUntilLock = this.movementsPerTetromino;
    this.lastMovementWasRotation = 0;
    this.backToBack = 0;
    
    this.scoringMessageQueue = [];
    
      
    // Function for generating tetrominoes using the 7-Bag Random Generator
    
    this.generate = function () {
      if (this.bag.length == 0) this.bag = SRS.bag();
      let n = floor(random(0,this.bag.length));
      let t = this.bag[n];
      this.bag.splice(n, 1);
      return t;
    }
    
    // Spawns a new tetromino
      
    this.spawnNew = function () {
      let t;
      if (this.queue.length == 0) {
        t = this.generate();
      } else {
        t = this.queue.shift();
      }
      
      this.refillQueue();
      this.alreadyHeld = false;
      return t.spawn(ceil(this.m.getWidth()/2), -this.m.skyline);
    }
    
    // Refills the tetromino queue
      
    this.refillQueue = function () {
      while (this.queue.length < this.queueLength) {
        this.queue.push(this.generate());
      }
    };
    
    // Holds a tetromino in the hold queue
      
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
      this.gravityTimer = 0;
      this.lockTimer = this.lockDelay;
      this.movementsUntilLock = movementsPerTetromino;
      
      return true;
    }
      
    // Spawns initial tetromino
    
    this.t = this.spawnNew();
  },
    function (time, gravity=50/3, lockDelay = 500, softDrop = false, hardDrop = false, das=300, arr=60, translationDir=0, movementsPerTetromino = 15) {
    
    // Update
      
    this.lockDelay = lockDelay;
    this.movementsPerTetromino = movementsPerTetromino;
    
    
    // Code that executes if the tetromino is hard-dropped  
    if (hardDrop) {
      this.gravityTimer = -Infinity;
      this.lockTimer = -Infinity;
    } else this.gravityTimer -= time * (softDrop ? 20 : 1);
    
    // Code that executes when the tetromino is supposed to go down, whether that be by gravity, soft-drop or hard-drop
    while (this.gravityTimer <= 0) {
      if (this.t.translate(0, 1, (x,y)=>this.m.minoAtPos(x,y))) {
        // Tetromino Successfully Lowered
        
        this.gravityTimer += gravity;
        this.lockTimer = hardDrop ? -Infinity : this.lockDelay;
        this.score += hardDrop ? 2 : (softDrop ? 1 : 0);
        this.lastMovementWasRotation = 0;
        this.movementsUntilLock = this.movementsPerTetromino;
      } else {
        // Something is in the way...
        
        this.gravityTimer = 0;
        this.lockTimer -= time;
        
        if (this.movementsUntilLock <= 0) this.lockTimer = 0;  
        
        if (this.lockTimer <= 0) {
          // Lock Delay Expired or Tetromino Hard Dropped!
          
          // Locks tetromino to the Matrix
          this.m.lock(this.t);
 
          
          
          // Recognize T-Spins using the 3-corner method
          
          let tSpin = 0;
          if (this.t.tetromino.isT && this.lastMovementWasRotation > 0){
            // Initial qualifications met: Tetromino was a T-piece and the last movement was a rotation.
            
            let tetrominoCorners = 0;
            for (let i of [{x:0,y:-1},{x:-2,y:-1},{x:-2,y:1},{x:0,y:1}]) {
              if (this.m.minoAtPos(this.t.x+i.x, this.t.y+i.y)) tetrominoCorners++;
            }
            if (tetrominoCorners >= 3) {
              // Mino is in 3/4 corners. Qualified for Mini T-Spin!
              
              tSpin = 1;
              
              // If the condition is true, on its last rotation the T-tetromino was wall-kicked far enough away from its initial position that it is automatically qualified for a full T-Spin!
              if (this.lastMovementWasRotation >= 2) tSpin = 2;
              else {
                // Tetromino not yet qualified for full T-Spin but it will be if there is a mino in both of its front-facing corners.
                
                tetrominoCorners = 0;
                let game = this;
                [{x:0,y:-1},{x:-2,y:-1},{x:-2,y:1},{x:0,y:1}].forEach(function (i, ind, arr) {
                  if (posMod(ind+game.t.tetromino.facing,4) < 2 && game.m.minoAtPos(game.t.x+i.x, game.t.y+i.y)) tetrominoCorners++;
                });
                
                // If the condition is true both front-facing corners are filled so the tetromino is qualified for a full T-Spin!
                if (tetrominoCorners >= 2) tSpin = 2;
              }
            }
          }          
          
          // Clear lines and record number of lines cleared
          let numLines = this.m.clearLines().length;
          
          
          // Detect all clears (a.k.a. perfect clears)
          
          let allClear = true;
          for (let i of this.m.data) {
            for (let j of i) if (j != "") {
              allClear = false;
              break;
            }
            if (!allClear) break;
          }


          // Code for scoring. Ported from my earlier T****s clone written in Python using the Pygame library. It's messy but I like how it extends.

          // Manage part of back-to-back and combo

          if ((0 < numLines&&numLines < 4) && tSpin < 1) this.backToBack = 0;
          let b2bMultiplier = (this.backToBack > 0 && numLines > 0) ? 1.5 : 1;
          if (numLines > 0) this.combo ++; else this.combo = -1;

          // Increase the score by the necessary amount

          let pointsScoredByLineClear = 0;
          for (let i=0; i<(numLines + (tSpin == 2 ? 1 : 0)); i++){
            if (allClear) {
              pointsScoredByLineClear += i * 2 - 4;
              if (i < 1) pointsScoredByLineClear += 16;
              else if (i < 3) pointsScoredByLineClear += 6;
            }

            else pointsScoredByLineClear += (i < 10) ? min(floor((i+1) / 2), 4) + 1 : 6;
          }
          if (tSpin >= 2) pointsScoredByLineClear += min(2 * numLines + 3, 8);
          else if (tSpin >= 1) pointsScoredByLineClear += 1;
          pointsScoredByLineClear = (pointsScoredByLineClear * b2bMultiplier + max(this.combo, 0) - int(allClear) * 4) * 100 * (this.levelM1 + 1);
          this.score += pointsScoredByLineClear;
          
          // End of the ported scoring code. (almost)
          
          // Adds scoring messages to the queue to be displayed.
          
          // Line clear message
          if (numLines > 0) {
            this.scoringMessageQueue.push(new ScoringMessage(numLines>4?numLines+"ln":["","Single","Double","Triple","Quad"][numLines], numLines>4?"blue":["maroon","red","yellow","lime","cyan"][numLines], 18));
          // Back-to-Back message
          if (this.backToBack > 0) this.scoringMessageQueue.push(new ScoringMessage("BACK-TO-BACK", "yellow", 54, 18));}
          // T-Spin message
          if (tSpin) this.scoringMessageQueue.push(new ScoringMessage(["","MINI T-SPIN", "T-SPIN"][tSpin], "magenta", 0, 18));

          // All Clear message
          if (allClear) this.scoringMessageQueue.push(new ScoringMessage("ALL CLEAR", "yellow", 90, 18));
          // Combo message
          if (this.combo > 0) this.scoringMessageQueue.push(new ScoringMessage(this.combo+" Combo", "white", 72, 18));
          
          if (numLines >= 4 || tSpin >= 1) this.backToBack ++; // Last line of the ported scoring code. Manages the rest of Back-to-Back.
          
          
          // Update the information and spawn the next tetromino
          
          this.lineCount += numLines;
          this.t = this.spawnNew();
          this.gravityTimer = 0;
          this.lockTimer = this.lockDelay;
          this.movementsUntilLock = this.movementsPerTetromino;
        }
        
        break;
      }

    }
    
      
    // Manage auto-shift
      
    if (translationDir==0) {
      this.movementTimer = -das+arr;
    }else{
      this.movementTimer += time;
      while (this.movementTimer >= arr) {
          
        if (this.t.translate(translationDir, 0, (x,y)=>this.m.minoAtPos(x,y))) {
          this.lockTimer = this.lockDelay;
          this.movementsUntilLock--;
          this.lastMovementWasRotation = 0;
        } else break;
        this.movementTimer = 0;
      }
    }
    
    
    },
    function () {
    // Show
    
    let md = this.m.getDimensions(); // matrix dimensions
    let skyline = this.m.skyline; // height of the Skyline (top of the board that you can place tetrominoes partially over)
    
    const minoSize = 400 / max(md.width, skyline); // Size of each mino
    
    // Functions that take a position on the Matrix and turns it to a position on the screen
      
    const gridToScreenX = (x) => (x - (md.width-1)/2) * minoSize;
    const gridToScreenY = (y) => (y + (skyline-1)/2) * minoSize;
    
    
    // Grid and matrix
  
    push();
    for (let i=0; i<md.width; i++) {
      for (let j=0; j<md.height; j++) {
        noFill();
        stroke(j<skyline?"#ffffff80":"#ffffff10");
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
    c = lerpColor(color("gray"), color(this.t.tetromino.color), this.movementsUntilLock/this.movementsPerTetromino);
    c.setAlpha(sqrt(this.lockTimer / this.lockDelay) * 256);
    fill(c);
    stroke("white");
    for (let i of this.t.getCurrentShape()) {
      push();
      translate(gridToScreenX(i.x), gridToScreenY(i.y), -minoSize/2);
      box(minoSize); 
      pop();
    }
    pop();
    
    // "NEXT" / "HOLD" text

    push();
    
    textFont(regularFont);
    noStroke();
    textSize(30);
    fill("white");
    textAlign(LEFT, TOP);
    text("NEXT", gridToScreenX(md.width), gridToScreenY(-skyline));
    textAlign(RIGHT, TOP);
    text("HOLD", gridToScreenX(-1), gridToScreenY(-skyline));

    pop();
    
    // Next piece queue
    
    this.queue.forEach(function (i, ind, arr) {
      push();
      fill(i.color);
      stroke("white");
      for (let j of i.getCurrentShape()) {
        push();
        translate(gridToScreenX(j.x + md.width + 3), gridToScreenY(j.y - skyline + 2 + ind*3) + 30, -minoSize/2);
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
        translate(gridToScreenX(j.x - 3), gridToScreenY(j.y - skyline + 2) + 30, -minoSize/2);
        box(minoSize); 
        pop();
      }
      pop();
    }
    
    
    // HUD text (Score/Lines/Level)
    
    push();
    
    textFont(regularFont);
    noStroke();
    textSize(15);
    fill("white");
    textAlign(LEFT, BOTTOM);
    text("Lines: "+this.lineCount+"\nLevel: "+(this.levelM1+1)+"\nScore: "+this.score, gridToScreenX(md.width), gridToScreenY(0));
    
    pop();
      
    // scoring messages
    
    let newScoringMessageQueue = [];
    for (let i of this.scoringMessageQueue) if (i.show(gridToScreenX(-1), gridToScreenY(3 - skyline) + 30)) newScoringMessageQueue.push(i);
    this.scoringMessageQueue = newScoringMessageQueue;
      
  });
  
  // Initializes the game
  g.init();
}

function draw() {
  
  if (g.lineCount >= 150) throw {name:"You win",message:"Line count has exceeded the length of a standard Marathon mode"};
  
  // Manages soft drop
  
  let softDrop = false;
  
  for (let i of controls.softDrop) {
    if (keyIsDown(i)) {
      softDrop = true;
      break;
    }
  }
  
  // Manages whether tetromino is being translated
  
  let translating = false;
  for (let i of controls.translateRight) {
    if (keyIsDown(i)) {
      translating = true;
      break;
    }
  }
  if (!translating) for (let i of controls.translateLeft) {
    if (keyIsDown(i)) {
      translating = true;
      break;
    }
  }
  if (!translating) translationDirection = 0;
  
  
  // Updates the game state. May throw an error in case of a game over.
  g.update(deltaTime, gravity=1000 * (0.8-(g.levelM1*0.007))**g.levelM1, lockDelay=500, softDrop=softDrop, hardDrop=hardDropThisFrame, das=300, arr=60, translationDir=translationDirection);
  // Updates level
  g.levelM1 = max(g.levelM1, floor(g.lineCount / 10));
  
  
  
  background(56);
  
  // Opening animation
  if (millis()<1000) {
    translate(-(millis()-1000)/2,(millis()-1000)/2,(millis()-1000));
    rotateY(-(millis()-1000)/500);
    pointLight(color("white"), 0, -(millis()-1000), sqrt(120000));
  }
  
  // Shows the board
  g.show();
  
  
  
  hardDropThisFrame = false;
}

function keyPressed() {
  // Manages other inputs
  
  if (controls.rotateCW.includes(keyCode)) { // Clockwise rotation
    let result = g.t.rotate(1, (x,y)=>g.m.minoAtPos(x,y));
    if (result.success) {
      g.lockTimer = g.lockDelay;
      g.movementsUntilLock--;
      g.lastMovementWasRotation = abs(result.x)+abs(result.y) >= 3 ? 2 : 1;
    }
  }
  if (controls.rotateCCW.includes(keyCode)) { // Counter-clockwise rotation
    let result = g.t.rotate(-1, (x,y)=>g.m.minoAtPos(x,y));
    if (result.success) {
      g.lockTimer = g.lockDelay;
      g.movementsUntilLock--;
      g.lastMovementWasRotation = abs(result.x)+abs(result.y) >= 3 ? 2 : 1;
    }
  }
  if (controls.rotate180.includes(keyCode)) { // 180-degree rotation
    let result = g.t.rotate(2, (x,y)=>g.m.minoAtPos(x,y));
    if (result.success) {
      g.lockTimer = g.lockDelay;
      g.movementsUntilLock--;
      g.lastMovementWasRotation = abs(result.x)+abs(result.y) >= 3 ? 2 : 1;
    }
  }
  
  // Initial translation and enabling of auto-shift
  
  if (controls.translateRight.includes(keyCode)) {
    if (g.t.translate(1, 0, (x,y)=>g.m.minoAtPos(x,y))) {
      g.lockTimer = g.lockDelay;
      g.movementsUntilLock--;
      g.lastMovementWasRotation = 0;
    }
    translationDirection=1;
  }
  if (controls.translateLeft.includes(keyCode)) {
    if (g.t.translate(-1, 0, (x,y)=>g.m.minoAtPos(x,y))) {
      g.lockTimer = g.lockDelay;
      g.movementsUntilLock--;
      g.lastMovementWasRotation = 0;
    }
    translationDirection=-1;
  }
  
  if (controls.hardDrop.includes(keyCode)) { // Sets a flag that hard-drops the tetromino
    hardDropThisFrame = true;
  }
  if (controls.hold.includes(keyCode)) { // Hold
    g.hold();
    g.lastMovementWasRotation = 0;
  }
}