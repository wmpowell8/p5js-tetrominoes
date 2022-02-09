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
        [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x:-2,y: 1},{x: 1,y:-2}], // 0>>1
        [{x:0,y:0},{x:-1,y: 0},{x: 2,y: 0},{x:-1,y:-2},{x: 2,y: 1}], // 1>>2
        [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x: 2,y:-1},{x:-1,y: 2}], // 2>>3
        [{x:0,y:0},{x: 1,y: 0},{x:-2,y: 0},{x: 1,y: 2},{x:-2,y:-1}]  // 3>>0
      ],
      [
        // 180-degree kicks from the fangame NullpoMino. github.com/nullpomino/nullpomino
        [{x: 0,y: 0},{x:-1,y: 0},{x:-2,y: 0},{x: 1,y: 0},{x: 2,y: 0},{x: 0,y:-1}],  // 0>>2─┐
        [{x: 0,y: 0},{x: 0,y:-1},{x: 0,y:-2},{x: 0,y: 1},{x: 0,y: 2},{x:-1,y: 0}],  // 1>>3─┼┐
        [{x: 0,y: 0},{x: 1,y: 0},{x: 2,y: 0},{x:-1,y: 0},{x:-2,y: 0},{x: 0,y: 1}],  // 2>>0─┘│
        [{x: 0,y: 0},{x: 0,y:-1},{x: 0,y:-2},{x: 0,y: 1},{x: 0,y: 2},{x: 1,y: 0}]   // 3>>1──┘
      ],
      [
        [{x:0,y:0},{x:-1,y: 0},{x: 2,y: 0},{x:-1,y:-2},{x: 2,y: 1}], // 0>>3
        [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x: 2,y:-1},{x:-1,y: 2}], // 1>>0
        [{x:0,y:0},{x: 1,y: 0},{x:-2,y: 0},{x: 1,y: 2},{x:-2,y:-1}], // 2>>1
        [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x:-2,y: 1},{x: 1,y:-2}]  // 3>>2
      ]
    ]
    /*
I Tetromino Wall Kick Data (Arika)
In case you wanted to copy and paste these numbers in
for the kicks from TGM3 or TETR.IO

CW rotations (2nd list item, above)

    [ // Arika SRS
      [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x: 1,y: 2},{x:-2,y:-1}]  //0>>1
      [{x:0,y:0},{x:-1,y: 0},{x: 2,y: 0},{x:-1,y: 2},{x: 2,y:-1}]  //1>>2
      [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x: 2,y: 1},{x:-1,y:-1}]  //2>>3
      [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x:-2,y: 1},{x: 1,y:-2}]  //3>>0
    ],

CCW rotations (Last list item, above)

    [ // Arika SRS
      [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x:-1,y: 2},{x: 2,y:-1}]  //0>>3
      [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x: 2,y: 1},{x:-1,y:-2}]  //1>>0
      [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x:-2,y: 1},{x: 1,y:-1}]  //2>>1
      [{x:0,y:0},{x: 1,y: 0},{x:-2,y: 0},{x: 1,y: 2},{x:-2,y:-1}]  //3>>2
    ]
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
      [{x:0,y:0},{x:-1,y:0},{x:-1,y:-1},{x: 0,y: 2},{x:-1,y: 2}], // 0>>1
      [{x:0,y:0},{x: 1,y:0},{x: 1,y: 1},{x: 0,y:-2},{x: 1,y:-2}], // 1>>2
      [{x:0,y:0},{x: 1,y:0},{x: 1,y:-1},{x: 0,y: 2},{x: 1,y: 2}], // 2>>3
      [{x:0,y:0},{x:-1,y:0},{x:-1,y: 1},{x: 0,y:-2},{x:-1,y:-2}]  // 3>>0
    ],
    /* 180° rotations */ [
      // 180-degree kicks from the fangame NullpoMino. github.com/nullpomino/nullpomino
      [{x: 0,y: 0},{x: 1,y: 0},{x: 2,y: 0},{x: 1,y:-1},{x: 2,y:-1},{x:-1,y: 0},{x:-2,y: 0},{x:-1,y:-1},{x:-2,y:-1},{x: 0,y: 1},{x: 3,y: 0},{x:-3,y: 0}], // 0>>2─┐
      [{x: 0,y: 0},{x: 0,y:-1},{x: 0,y:-2},{x:-1,y:-1},{x:-1,y:-2},{x: 0,y: 1},{x: 0,y: 2},{x:-1,y: 1},{x:-1,y: 2},{x: 1,y:-0},{x: 0,y:-3},{x: 0,y: 3}], // 1>>3─┼┐
      [{x: 0,y: 0},{x:-1,y: 0},{x:-2,y: 0},{x:-1,y: 1},{x:-2,y: 1},{x: 1,y: 0},{x: 2,y: 0},{x: 1,y: 1},{x: 2,y: 1},{x: 0,y:-1},{x:-3,y: 0},{x: 3,y: 0}], // 2>>0─┘│
      [{x: 0,y: 0},{x: 0,y:-1},{x: 0,y:-2},{x: 1,y:-1},{x: 1,y:-2},{x: 0,y: 1},{x: 0,y: 2},{x: 1,y: 1},{x: 1,y: 2},{x:-1,y:-0},{x: 0,y:-3},{x: 0,y: 3}], // 3>>1──┘
    ],
    /* CCW  rotations */ [
      [{x:0,y:0},{x: 1,y:0},{x: 1,y:-1},{x: 0,y: 2},{x: 1,y: 2}], // 0>>3
      [{x:0,y:0},{x: 1,y:0},{x: 1,y: 1},{x: 0,y:-2},{x: 1,y:-2}], // 1>>0
      [{x:0,y:0},{x:-1,y:0},{x:-1,y:-1},{x: 0,y: 2},{x:-1,y: 2}], // 2>>1
      [{x:0,y:0},{x:-1,y:0},{x:-1,y: 1},{x: 0,y:-2},{x:-1,y:-2}]  // 3>>2
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