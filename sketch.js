// Idea: I'm a fan of modern T****s, so I want to make a T****s clone that incorporates features of modern games. I've made something like this before, using Python and the Pygame library. However the code style was kind of crappy. I want to make a better version using JavaScript.
// Some work with this version of the project done at home.

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

const SRS = new RS([
  /*Z*/{
    color: "red",
    0: [{x:-2,y:-2},{x:-1,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    3: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:-2,y: 0}]
  },
  /*L*/{
    color: "#ff8000",
    0: [{x: 0,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x:-1,y:-2},{x:-1,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1},{x:-2,y: 0}],
    3: [{x:-2,y:-2},{x:-1,y:-2},{x:-1,y:-1},{x:-1,y: 0}]
  },
  /*O*/{
    color: "yellow",
    0: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    2: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    3: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    wallkickOverride: [
      // O tetromino has no wallkicks
      [
        [{x:0,y:0}], // 0>>0
        [{x:0,y:0}], // 1>>1
        [{x:0,y:0}], // 2>>2
        [{x:0,y:0}]  // 3>>3
      ],
      [
        [{x:0,y:0}], // 0>>1
        [{x:0,y:0}], // 1>>2
        [{x:0,y:0}], // 2>>3
        [{x:0,y:0}]  // 3>>0
      ],
        [
        [{x:0,y:0}], // 0>>2─┐
        [{x:0,y:0}], // 1>>3─┼┐
        [{x:0,y:0}], // 2>>0─┘│
        [{x:0,y:0}]  // 3>>1──┘
      ],
      [
        [{x:0,y:0}], // 0>>1
        [{x:0,y:0}], // 1>>2
        [{x:0,y:0}], // 2>>3
        [{x:0,y:0}]  // 3>>0
      ],
    ]
  },
  /*S*/{
    color: "lime",
    0: [{x:-1,y:-2},{x: 0,y:-2},{x:-2,y:-1},{x:-1,y:-1}],
    1: [{x:-1,y:-2},{x:-1,y:-1},{x: 0,y:-1},{x: 0,y: 0}],
    2: [{x:-1,y:-1},{x: 0,y:-1},{x:-2,y: 0},{x:-1,y: 0}],
    3: [{x:-2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:-1,y: 0}]
  },
  /*I*/{
    color: "cyan",
    0: [{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1},{x: 1,y:-1}],
    1: [{x: 0,y:-2},{x: 0,y:-1},{x: 0,y: 0},{x: 0,y: 1}],
    2: [{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0},{x: 1,y: 0}],
    3: [{x:-1,y:-2},{x:-1,y:-1},{x:-1,y: 0},{x:-1,y: 1}],
    wallkickOverride: [
      [
        [{x:0,y:0}], // 0>>0
        [{x:0,y:0}], // 1>>1
        [{x:0,y:0}], // 2>>2
        [{x:0,y:0}]  // 3>>3
      ],
      [
        [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x:-2,y:-1},{x: 1,y: 2}], // 0>>1
        [{x:0,y:0},{x:-1,y: 0},{x: 2,y: 0},{x:-1,y: 2},{x: 2,y:-1}], // 1>>2
        [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x: 2,y: 1},{x:-1,y:-2}], // 2>>3
        [{x:0,y:0},{x: 1,y: 0},{x:-2,y: 0},{x: 1,y:-2},{x:-2,y: 1}]  // 3>>0
      ],
      [
        // 180-degree kicks from the fangame NullpoMino. github.com/nullpomino/nullpomino
        [{x: 0,y: 0},{x:-1,y: 0},{x:-2,y: 0},{x: 1,y: 0},{x: 2,y: 0},{x: 0,y: 1}],  // 0>>2─┐
        [{x: 0,y: 0},{x: 0,y: 1},{x: 0,y: 2},{x: 0,y:-1},{x: 0,y:-2},{x:-1,y: 0}],  // 1>>3─┼┐
        [{x: 0,y: 0},{x: 1,y: 0},{x: 2,y: 0},{x:-1,y: 0},{x:-2,y: 0},{x: 0,y:-1}],  // 2>>0─┘│
        [{x: 0,y: 0},{x: 0,y: 1},{x: 0,y: 2},{x: 0,y:-1},{x: 0,y:-2},{x: 1,y: 0}]   // 3>>1──┘
      ],
      [
        [{x:0,y:0},{x:-1,y: 0},{x: 2,y: 0},{x:-1,y: 2},{x: 2,y:-1}], // 0>>3
        [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x: 2,y: 1},{x:-1,y:-2}], // 1>>0
        [{x:0,y:0},{x: 1,y: 0},{x:-2,y: 0},{x: 1,y:-2},{x:-2,y: 1}], // 2>>1
        [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x:-2,y:-1},{x: 1,y: 2}]  // 3>>2
      ]
    ]
    /*
I Tetromino Wall Kick Data (Arika)
In case you wanted to copy and paste these numbers in
for the kicks from TGM3 or TETR.IO
      Test 2  Test 3  Test 4  Test 5
      (-2, 0) ( 1, 0) ( 1, 2) (-2,-1)  //0>>1
      (-1, 0) ( 2, 0) (-1, 2) ( 2,-1)  //1>>2
      ( 2, 0) (-1, 0) ( 2, 1) (-1,-1)  //2>>3
      (-2, 0) ( 1, 0) (-2, 1) ( 1,-2)  //3>>0

      ( 2, 0) (-1, 0) (-1, 2) ( 2,-1)  //0>>3
      ( 2, 0) (-1, 0) ( 2, 1) (-1,-2)  //1>>0
      (-2, 0) ( 1, 0) (-2, 1) ( 1,-1)  //2>>1
      ( 1, 0) (-2, 0) ( 1, 2) (-2,-1)  //3>>2
    */
  },
  /*J*/{
    color: "blue",
    0: [{x:-2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x:-1,y: 0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1},{x: 0,y: 0}],
    3: [{x:-1,y:-2},{x:-1,y:-1},{x:-2,y: 0},{x:-1,y: 0}]
  },
  /*T*/{
    color: "magenta",
    0: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x:-1,y:-2},{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0}],
    3: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:-1,y: 0}]
  }
], function (d, minoAtRelPos) {
  
  // forEach function was causing scope to be reset to global object
  let tetromino = this;
  
  //Wallkick data was copied and pasted from various wikis
  const defaultWallkicks = [
    /*   0° rotations */ [
      [{x:0,y:0}], // 0>>0
      [{x:0,y:0}], // 1>>1
      [{x:0,y:0}], // 2>>2
      [{x:0,y:0}]  // 3>>3
    ],
    /* CW   rotations */ [
      [{x:0,y:0},{x:-1,y:0},{x:-1,y: 1},{x: 0,y:-2},{x:-1,y:-2}], // 0>>1
      [{x:0,y:0},{x: 1,y:0},{x: 1,y:-1},{x: 0,y: 2},{x: 1,y: 2}], // 1>>2
      [{x:0,y:0},{x: 1,y:0},{x: 1,y: 1},{x: 0,y:-2},{x: 1,y:-2}], // 2>>3
      [{x:0,y:0},{x:-1,y:0},{x:-1,y:-1},{x: 0,y: 2},{x:-1,y: 2}]  // 3>>0
    ],
    /* 180° rotations */ [
      // 180-degree kicks from the fangame NullpoMino. github.com/nullpomino/nullpomino
      [{x: 0,y: 0},{x: 1,y: 0},{x: 2,y: 0},{x: 1,y: 1},{x: 2,y: 1},{x:-1,y: 0},{x:-2,y: 0},{x:-1,y: 1},{x:-2,y: 1},{x: 0,y:-1},{x: 3,y: 0},{x:-3,y: 0}], // 0>>2─┐
      [{x: 0,y: 0},{x: 0,y: 1},{x: 0,y: 2},{x:-1,y: 1},{x:-1,y: 2},{x: 0,y:-1},{x: 0,y:-2},{x:-1,y:-1},{x:-1,y:-2},{x: 1,y: 0},{x: 0,y: 3},{x: 0,y:-3}], // 1>>3─┼┐
      [{x: 0,y: 0},{x:-1,y: 0},{x:-2,y: 0},{x:-1,y:-1},{x:-2,y:-1},{x: 1,y: 0},{x: 2,y: 0},{x: 1,y:-1},{x: 2,y:-1},{x: 0,y: 1},{x:-3,y: 0},{x: 3,y: 0}], // 2>>0─┘│
      [{x: 0,y: 0},{x: 0,y: 1},{x: 0,y: 2},{x: 1,y: 1},{x: 1,y: 2},{x: 0,y:-1},{x: 0,y:-2},{x: 1,y:-1},{x: 1,y:-2},{x:-1,y: 0},{x: 0,y: 3},{x: 0,y:-3}], // 3>>1──┘
    ],
    /* CCW  rotations */ [
      [{x:0,y:0},{x: 1,y:0},{x: 1,y: 1},{x: 0,y:-2},{x: 1,y:-2}], // 0>>3
      [{x:0,y:0},{x: 1,y:0},{x: 1,y:-1},{x: 0,y: 2},{x: 1,y: 2}], // 1>>0
      [{x:0,y:0},{x:-1,y:0},{x:-1,y: 1},{x: 0,y:-2},{x:-1,y:-2}], // 2>>1
      [{x:0,y:0},{x:-1,y:0},{x:-1,y:-1},{x: 0,y: 2},{x:-1,y: 2}]  // 3>>2
    ]
  ]
  
  let wallkicks = tetromino.wallkickOverride == undefined ? 
      defaultWallkicks :
      tetromino.wallkickOverride;
  let dir = posMod(d,4);
  let newDir = posMod((tetromino.facing + dir),4);

  let o = {success: false, x: 0, y: 0};
  wallkicks[dir][tetromino.facing].forEach(function (i, ind, arr) {
    if (!o.success) {
      let testSuccess = true;
      for (let j of tetromino[newDir]) {
        if (minoAtRelPos(i.x + j.x, i.y + j.y)) {
          testSuccess = false;
          break;
        }
      }
      if (testSuccess) {
        tetromino.facing = newDir;
        o = Object.assign({success: true}, i);
        return;
      }
    }
  });
  
  return Object.assign(o, {tetromino: this});
});

// Guideline gravity function: (levelM1) => (0.8-(levelM1*0.007))**levelM1 // levelM1 = level minus 1

function setup() {
  createCanvas(640, 480, WEBGL);
  m = new Matrix();
  spawnNew = () => SRS.bag()[floor(random(0,7))].spawn(ceil(m.getWidth()/2), -m.getHeight()+1);
  t = spawnNew();
}

function draw() {
  background(56);
  
  // TODO: make it so you can see matrix stuff
  const gridToScreenX = (x) => (x - 5) * 20
  const gridToScreenY = (y) => (y + 10) * 20
  
  pointLight(color("white"), 0, 0, sqrt(120000));
  
  // Grid and matrix
  
  push();
  let md = m.getDimensions(); // matrix dimensions
  for (let i=0; i<md.width; i++) {
    for (let j=0; j<md.height; j++) {
      noFill();
      stroke("#ffffff80");
      square(gridToScreenX(i)-10, gridToScreenY(-j)-10, 20);
      if (m.minoAtPos(i, -j)) {
        push();
        fill(t.tetromino.color);
        stroke("white");
        translate(gridToScreenX(i), gridToScreenY(-j), -10);
        box(20);
        pop();
      }
    }
  }
  pop();
  
  // Active tetromino
  
  for (let i of t.getCurrentShape()){
    push();
    translate(gridToScreenX(i.x), gridToScreenY(i.y), -10);
    fill(t.tetromino.color);
    stroke("white");
    box(20);
    pop();
  }
}

function keyPressed() {
  if (controls.rotateCW.includes(keyCode)) {
    t.rotate(1, (x,y)=>m.minoAtPos(x,y));
  }
  if (controls.rotateCCW.includes(keyCode)) {
    t.rotate(-1, (x,y)=>m.minoAtPos(x,y));
  }
  if (controls.rotate180.includes(keyCode)) {
    t.rotate(2, (x,y)=>m.minoAtPos(x,y));
  }
  if (controls.translateRight.includes(keyCode)) {
    t.translate(1, 0, (x,y)=>m.minoAtPos(x,y));
  }
  if (controls.translateLeft.includes(keyCode)) {
    t.translate(-1, 0, (x,y)=>m.minoAtPos(x,y));
  }
  if (controls.softDrop.includes(keyCode)) {
    t.translate(0, 1, (x,y)=>m.minoAtPos(x,y));
  }
  if (controls.hardDrop.includes(keyCode)) {
    m.lock(t);
    t = spawnNew();
  }
}