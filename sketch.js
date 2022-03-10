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

  menuSelect: [13/*enter*/],
  menuDown:   [40/*down*/, 83/*s*/],
  menuUp:     [38/*up*/, 87/*w*/],
  menuLeft:   [37/*left*/, 65/*a*/],
  menuRight:  [39/*right*/, 68/*d*/],
  menuBack:   [27/*esc*/, 8/*backspace*/, 46/*delete*/]
};

// A function like modulus, but that always returns a positive result.
posMod = (divisor, dividend) => ((divisor % dividend) + dividend) % dividend; // a trick for ensuring the result is always positive

// Helper function for formatting times
formatTime = (time) => str(int(time/600000)) + int(time/60000 % 10) + ":" + int(time/10000 % 6) + int(time/1000 % 10) + "." + int(time/100 % 10) + int(time/10 % 10) + int(time % 10);

var regularFont;
var g;

function preload() {
  regularFont = loadFont("Roboto-Regular.ttf");
}


// Boilerplate code for setting up p5.js SceneManager

function setup() {
  mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(ModeSelectionMenu);
}
function draw() {
  mgr.draw();
}

// Helper function for creating scenes that display menus

function MenuScene(menu) {
  return class {
    setup() {
      createCanvas(640, 480);  
      this.menu = menu;
    }
  
    draw() {
      background(0);
  
      push();
  
      this.menu.show();
  
      pop();
    }
  
    keyPressed() {
      if (controls.menuUp.includes(keyCode)) {
        this.menu.up();
      }
      if (controls.menuDown.includes(keyCode)) {
        this.menu.down();
      }
      if (controls.menuSelect.includes(keyCode)) {
        this.menu.select();
      }
      if (controls.menuRight.includes(keyCode)) {
        this.menu.right();
      }
      if (controls.menuLeft.includes(keyCode)) {
        this.menu.left();
      }
    }
  };
}

ModeSelectionMenu = MenuScene(new Menu(
  new Action("Classic", function () {mgr.showScene(ClassicMenu)}),
  new Action("Line Race", function () {mgr.showScene(LineRaceMenu)})
));

ClassicMenu = MenuScene(new Menu(
  new MenuRange("Starting level", 1, 20),
  new Choice("Goal", [150, 200, Infinity], ["150 Lines", "200 Lines", "Endless"], 0),
  new MenuRange("DAS", 10, 350, 10, "", "ms", 170),
  new MenuRange("ARR",  0, 100, 10, "", "ms",  50),
  new Choice("180° Spins", [
    SRS.settings.one80SpinsEnum.DISABLED,
    SRS.settings.one80SpinsEnum.NO_KICKS,
    SRS.settings.one80SpinsEnum.TETRIO,
    SRS.settings.one80SpinsEnum.NULLPOMINO
  ], ["Disabled", "No Kicks", "TETR.IO", "Nullpomino"], SRS.settings.one80Spins),
  new Choice("I Kicks", [SRS.settings.iKicksEnum.STANDARD, SRS.settings.iKicksEnum.ARIKA], ["Standard", "Arika"]),
  new Action("Start Game", function () {
    let settings = {
      startingLevelM1: this.items[0].value - 1,
      lineGoal: this.items[1].value,
      das: this.items[2].value,
      arr: this.items[3].value,
      updateLevel: true,
      generateHUDText: (game) => `Lines: ${game.lineCount}\nLevel: ${game.levelM1+1}\nScore: ${game.score}`
    };
    if (settings.startingLevelM1 >= settings.lineGoal / 10) {
      alert(`Error: Invalid Starting Level\nA starting level up to ${settings.lineGoal / 10} may be chosen for a goal of ${settings.lineGoal} lines. You chose a starting level of ${settings.startingLevelM1 + 1}. Choose a starting level up to ${settings.lineGoal / 10}.`);
      return;
    }
    SRS.settings.one80Spins = this.items[4].value;
    SRS.settings.iKicks = this.items[5].value;
    mgr.showScene(GameStateGame, settings);
  }, 1)
));
  
let goalOptions = [10, 20, 40, 100, 200, 400, 1000];
LineRaceMenu = MenuScene(new Menu(
  new Choice("Goal", goalOptions, goalOptions.map((i) => i + " Lines"), 2),
  new MenuRange("DAS", 10, 350, 10, "", "ms", 170),
  new MenuRange("ARR",  0, 100, 10, "", "ms",  50),
  new MenuRange("Line clear delay", 0, 500, 10, "", "ms", 500),
  new Choice("180° Spins", [
    SRS.settings.one80SpinsEnum.DISABLED,
    SRS.settings.one80SpinsEnum.NO_KICKS,
    SRS.settings.one80SpinsEnum.TETRIO,
    SRS.settings.one80SpinsEnum.NULLPOMINO
  ], ["Disabled", "No Kicks", "TETR.IO", "Nullpomino"], SRS.settings.one80Spins),
  new Choice("I Kicks", [SRS.settings.iKicksEnum.STANDARD, SRS.settings.iKicksEnum.ARIKA], ["Standard", "Arika"]),
  new Action("Start Game", function () {
    let settings = {
      startingLevelM1: 0,
      lineGoal: this.items[0].value,
      das: this.items[1].value,
      arr: this.items[2].value,
      lineClearDelay: (l) => this.items[3].value,
      generateHUDText: (game) => `Time: ${formatTime(game.time)}\nExcl. Delays: ${formatTime(game.timeExclDelays)}\nLines: ${game.lineCount}`
    };
    if (settings.startingLevelM1 >= settings.lineGoal / 10) {
      alert(`
        Error: Invalid Starting Level\n
        A starting level up to ${settings.lineGoal / 10} may be chosen for a goal of ${settings.lineGoal} lines.
        You chose a starting level of ${settings.startingLevelM1 + 1}. Choose a starting level up to ${settings.lineGoal / 10}.
      `);
      return;
    }
    SRS.settings.one80Spins = this.items[4].value;
    SRS.settings.iKicks = this.items[5].value;
    mgr.showScene(GameStateGame, settings);
  }, 1)
));

class GameStateGame {
  millisSinceInit() {
    return millis() - this.initMillis;
  }

  setup() {
    createCanvas(640, 480, WEBGL);
    
    this.initMillis = millis();
    
    // Some variables related to inputs
    
    this.hardDropThisFrame = false;
    this.translationDirection=0;


    this.gameOver = undefined;
    
    
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
      this.linesToClear = [];
      this.lineCount = 0;
      this.levelM1 = 0;
      this.gravityTimer = 0;
      this.lockTimer = this.lockDelay;
      this.lineClearTimer = 0;
      this.areTimer = 0;
      this.score = 0;
      this.movementTimer = -240;
      this.movementsUntilLock = this.movementsPerTetromino;
      this.lastMovementWasRotation = 0;
      this.backToBack = 0;
      this.time = 0;
      this.timeExclDelays = 0;
      
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
        this.lowestY = this.t.y;
        
        return true;
      }
    
    this.refillQueue();
    },
      function (time, softDrop = false, hardDrop = false, translationDir=0, gravity=50/3, lockDelay = 500, lineClearDelay = 500, das=170, arr=50, are=0, lineAre=0, movementsPerTetromino = 15) {

      // Update

      this.gamePaused = false;
      this.time += time;
        
      this.lockDelay = lockDelay;
      this.movementsPerTetromino = movementsPerTetromino;
      
      if (this.lineClearTimer > 0) this.lineClearTimer -= time; else {

        if (this.linesToClear.length > 0) this.m.clearLines(this.linesToClear);
        this.linesToClear = [];

        if (this.areTimer > 0) this.areTimer -= time; else {
          this.timeExclDelays += time;

          if (this.t == undefined) {
            this.t = this.spawnNew();
            this.lowestY = this.t.y;
            return;
          }

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
              if (this.t.y > this.lowestY){
                this.lowestY = this.t.y;
                this.movementsUntilLock = this.movementsPerTetromino;
              }
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
                      [{x:0,y:-1},{x:-2,y:-1},{x:-2,y:1},{x:0,y:1}].forEach((i, ind, arr) => {
                        if (posMod(ind+this.t.tetromino.facing,4) < 2 && this.m.minoAtPos(this.t.x+i.x, this.t.y+i.y)) tetrominoCorners++;
                      });
                      
                      // If the condition is true both front-facing corners are filled so the tetromino is qualified for a full T-Spin!
                      if (tetrominoCorners >= 2) tSpin = 2;
                    }
                  }
                }          
                
                // Copy matrix to do line clear calculations

                let clearedM = new Matrix(0, this.m.width, 0);
                clearedM.emptyRow = JSON.parse(JSON.stringify(this.m.emptyRow));
                clearedM.data = JSON.parse(JSON.stringify(this.m.data));

                // Clear lines and record number of lines cleared
                
                this.linesToClear = clearedM.clearLines();
                let numLines = this.linesToClear.length;
                
                // Detect all clears (a.k.a. perfect clears)
                
                let allClear = true;
                for (let i of clearedM.data) {
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
                  this.scoringMessageQueue.push(new ScoringMessage(numLines>4?`${numLines}ln`:["","Single","Double","Triple","Quad"][numLines], numLines>4?"blue":["maroon","red","yellow","lime","cyan"][numLines], 18));
                // Back-to-Back message
                if (this.backToBack > 0) this.scoringMessageQueue.push(new ScoringMessage("BACK-TO-BACK", "yellow", 54, 18));}
                // T-Spin message
                if (tSpin) this.scoringMessageQueue.push(new ScoringMessage(["","MINI T-SPIN", "T-SPIN"][tSpin], "magenta", 0, 18));

                // All Clear message
                if (allClear) this.scoringMessageQueue.push(new ScoringMessage("ALL CLEAR", "yellow", 90, 18));
                // Combo message
                if (this.combo > 0) {
                  this.scoringMessageQueue.forEach((iVal, i, iArr) => {
                    // Used iArr[i] instead of iVal because iVal doesn't update when I splice the array
                    while (iArr[i].text.includes("Combo") && i < iArr.length) {
                      iArr.splice(i, 1);
                    }
                  });
                  this.scoringMessageQueue.push(new ScoringMessage(`${this.combo} Combo`, "white", 72, 18));
                }
                
                if (numLines >= 4 || tSpin >= 1) this.backToBack ++; // Last line of the ported scoring code. Manages the rest of Back-to-Back.
                
                
                // Update the information and spawn the next tetromino
                
                this.lineCount += numLines;
                if (numLines > 0) {
                  this.m.eraseLinesToClear(this.linesToClear);
                  this.lineClearTimer = lineClearDelay;
                  this.areTimer = lineAre;
                } else {
                  this.areTimer = are;
                }
                this.t = undefined;
                this.gravityTimer = 0;
                this.lockTimer = this.lockDelay;
                this.movementsUntilLock = this.movementsPerTetromino;
                //this.lowestY = undefined;
              }
              
              break;
            }

          }
        }
      }
      
        
      // Manage auto-shift
        
      if (translationDir==0) {
        this.movementTimer = -das+arr;
      }else{
        this.movementTimer += time;
        while (this.movementTimer >= arr) {
          if (this.t == undefined) {
            this.movementTimer = arr;
            break;
          }

          if (this.t.translate(translationDir, 0, (x,y)=>this.m.minoAtPos(x,y))) {
            this.lockTimer = this.lockDelay;
            this.movementsUntilLock--;
            this.lastMovementWasRotation = 0;
          } else {this.movementTimer = arr; break;}
          this.movementTimer -= arr;
        }
      }
      
      
    },
    function (generateHUDTextCallback) {
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

      if (this.t != undefined) {
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
      }

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
      
      this.queue.forEach((i, ind, arr) => {
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
      text(generateHUDTextCallback(this), gridToScreenX(md.width), gridToScreenY(0));
      
      pop();
        
      // scoring messages
      
      let newScoringMessageQueue = [];
      for (let i of this.scoringMessageQueue) if (i.show(gridToScreenX(-1), gridToScreenY(3 - skyline) + 30)) newScoringMessageQueue.push(i);
      this.scoringMessageQueue = newScoringMessageQueue;
        
    });

    // Initializes the game
    g.init();
    g.levelM1 = this.sceneArgs.startingLevelM1;
    this.sceneArgs.gravity ??= (l) => 1000 * (0.8-(l*0.007))**l;
    this.sceneArgs.lockDelay ??= (l) => 500;
    this.sceneArgs.lineClearDelay ??= (l) => 500;
  }

  draw() {
    g.gamePaused = true;

    if (this.gameOver == undefined) {
      try {
        if (this.millisSinceInit()<1000) {
          // Opening animation

          translate(-(this.millisSinceInit()-1000)/2,(this.millisSinceInit()-1000)/2,(this.millisSinceInit()-1000));
          rotateY(-(this.millisSinceInit()-1000)/500);
          pointLight(color("white"), 0, -(this.millisSinceInit()-1000), sqrt(120000));
        } else {
          if (g.lineCount >= this.sceneArgs.lineGoal && g.linesToClear.length <= 0) throw new GameOverCondition("You win", `Line count has reached its goal (${this.sceneArgs.lineGoal} lines)`);
        
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
          if (!translating) this.translationDirection = 0;
          
          
          // Updates the game state. May throw an error in case of a game over.
          // In order, the arguments are time, softDrop, hardDrop, translationDir, gravity, lockDelay, lineClearDelay, das, arr, are, lineAre, movementsPerTetromino (dont ask me why the removed the names)
          g.update(deltaTime, softDrop, this.hardDropThisFrame, this.translationDirection, this.sceneArgs.gravity(g.levelM1), this.sceneArgs.lockDelay(g.levelM1), this.sceneArgs.lineClearDelay(g.levelM1), this.sceneArgs.das, this.sceneArgs.arr);
          // Updates level
          if (this.sceneArgs.showLevel) g.levelM1 = min(max(g.levelM1, floor(g.lineCount / 10)), 19);
          
        }
      } catch (error) {
        if (error instanceof GameOverCondition) {
          this.gameOver = Object.assign(error, {millis: millis()});
        } else {
          setTimeout(function(){alert(`A(n) "${error.name}" exception occurred while updating the game state. Check the debug console for details.`)},0);
          throw error;
        }
      }
    }
    
    // Shows the board  
    background(56);

    push();
    
    if (this.gameOver != undefined) {translate(0, 0, -300 * (1 - Math.exp(-(millis() - this.gameOver.millis)/1000))); rotateY((millis() - this.gameOver.millis)/1000);}

    g.show(this.sceneArgs.generateHUDText);

    pop();
    
    this.hardDropThisFrame = false;

    if (this.gameOver != undefined) {
      push();

      textFont(regularFont);
      textAlign(CENTER, CENTER);
      textSize(50);
      text(this.gameOver.name, 0, -100);
      textSize(20);
      text(this.gameOver.message, 0, -50);

      text(`Time: ${formatTime(g.time)} (${formatTime(g.timeExclDelays)} excl. delays)\nScore: ${g.score}\nLines: ${g.lineCount} (Level ${g.levelM1 + 1})`, 0, 25);

      pop();
    }
  }

  keyPressed() {
    if (this.gameOver == undefined && g.t != undefined && !g.gamePaused) {  // Manages other inputs
      
      if (controls.rotateCW.includes(keyCode)) { // Clockwise rotation
        let result = g.t.rotate(1, (x,y)=>g.m.minoAtPos(x,y));
        if (result.success) {
          g.lockTimer = g.lockDelay;
          if (g.t.y > g.lowestY){
            g.lowestY = g.t.y;
            g.movementsUntilLock = g.movementsPerTetromino;
          } else g.movementsUntilLock--;
          g.lastMovementWasRotation = abs(result.x)+abs(result.y) >= 3 ? 2 : 1;
        }
      }
      if (controls.rotateCCW.includes(keyCode)) { // Counter-clockwise rotation
        let result = g.t.rotate(-1, (x,y)=>g.m.minoAtPos(x,y));
        if (result.success) {
          g.lockTimer = g.lockDelay;
          if (g.t.y > g.lowestY){
            g.lowestY = g.t.y;
            g.movementsUntilLock = g.movementsPerTetromino;
          } else g.movementsUntilLock--;
          g.lastMovementWasRotation = abs(result.x)+abs(result.y) >= 3 ? 2 : 1;
        }
      }
      if (controls.rotate180.includes(keyCode)) { // 180-degree rotation
        let result = g.t.rotate(2, (x,y)=>g.m.minoAtPos(x,y));
        if (result.success) {
          g.lockTimer = g.lockDelay;
          if (g.t.y > g.lowestY){
            g.lowestY = g.t.y;
            g.movementsUntilLock = g.movementsPerTetromino;
          } else g.movementsUntilLock--;
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
        this.translationDirection=1;
      }
      if (controls.translateLeft.includes(keyCode)) {
        if (g.t.translate(-1, 0, (x,y)=>g.m.minoAtPos(x,y))) {
          g.lockTimer = g.lockDelay;
          g.movementsUntilLock--;
          g.lastMovementWasRotation = 0;
        }
        this.translationDirection=-1;
      }
      
      if (controls.hardDrop.includes(keyCode)) { // Sets a flag that hard-drops the tetromino
        this.hardDropThisFrame = true;
      }
      if (controls.hold.includes(keyCode)) { // Hold
        g.hold();
        g.lastMovementWasRotation = 0;
      }
    }
  }
}