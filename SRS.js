// Super Rotation System, the rotation system present in modern titles

const SRS = new RS([
  /*Z*/{
    color: "red",
    0: [{x:-2,y:-1},{x:-1,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    1: [{x: 0,y:-1},{x:-1,y: 0},{x: 0,y: 0},{x:-1,y: 1}],
    2: [{x:-2,y: 0},{x:-1,y: 0},{x:-1,y: 1},{x: 0,y: 1}],
    3: [{x:-1,y:-1},{x:-2,y: 0},{x:-1,y: 0},{x:-2,y: 1}],
    isT: false
  },
  /*L*/{
    color: "#ff8000",
    0: [{x: 0,y:-1},{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0}],
    1: [{x:-1,y:-1},{x:-1,y: 0},{x:-1,y: 1},{x: 0,y: 1}],
    2: [{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0},{x:-2,y: 1}],
    3: [{x:-2,y:-1},{x:-1,y:-1},{x:-1,y: 0},{x:-1,y: 1}],
    isT: false
  },
  /*O*/{
    color: "yellow",
    0: [{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    1: [{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    2: [{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    3: [{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    /* Although the O tetromino has no wallkicks, we do not need to specify any
     * wallkick override since its rotational symmetry means that rotating it will not
     * change anything, and since the first wallkick for rotating is always {x:0,y:0},
     * meaning no movement, and since it was in an open space before it will stay in an
     * open space, meaning the first wallkick will always be successful and the others
     * are not needed.
     */
    isT: false
  },
  /*S*/{
    color: "lime",
    0: [{x:-1,y:-1},{x: 0,y:-1},{x:-2,y: 0},{x:-1,y: 0}],
    1: [{x:-1,y:-1},{x:-1,y: 0},{x: 0,y: 0},{x: 0,y: 1}],
    2: [{x:-1,y: 0},{x: 0,y: 0},{x:-2,y: 1},{x:-1,y: 1}],
    3: [{x:-2,y:-1},{x:-2,y: 0},{x:-1,y: 0},{x:-1,y: 1}],
    isT: false
  },
  /*I*/{
    color: "cyan",
    0: [{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0},{x: 1,y: 0}],
    1: [{x: 0,y:-1},{x: 0,y: 0},{x: 0,y: 1},{x: 0,y: 2}],
    2: [{x:-2,y: 1},{x:-1,y: 1},{x: 0,y: 1},{x: 1,y: 1}],
    3: [{x:-1,y:-1},{x:-1,y: 0},{x:-1,y: 1},{x:-1,y: 2}],
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
    ],
    arikaWallkickOverride: {
      // Wallkick override in the case that Arika SRS is enabled by setting SRS.settings.iKicks to SRS.settings.iKicksEnum.ARIKA
      1: [
        [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x: 1,y: 2},{x:-2,y:-1}],  //0>>1
        [{x:0,y:0},{x:-1,y: 0},{x: 2,y: 0},{x:-1,y: 2},{x: 2,y:-1}],  //1>>2
        [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x: 2,y: 1},{x:-1,y:-1}],  //2>>3
        [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x:-2,y: 1},{x: 1,y:-2}]  //3>>0
      ],
      3: [
        [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x:-1,y: 2},{x: 2,y:-1}],  //0>>3
        [{x:0,y:0},{x: 2,y: 0},{x:-1,y: 0},{x: 2,y: 1},{x:-1,y:-2}],  //1>>0
        [{x:0,y:0},{x:-2,y: 0},{x: 1,y: 0},{x:-2,y: 1},{x: 1,y:-1}],  //2>>1
        [{x:0,y:0},{x: 1,y: 0},{x:-2,y: 0},{x: 1,y: 2},{x:-2,y:-1}]  //3>>2
      ]
    },
    isT: false
  },
  /*J*/{
    color: "blue",
    0: [{x:-2,y:-1},{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0}],
    1: [{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0},{x:-1,y: 1}],
    2: [{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0},{x: 0,y: 1}],
    3: [{x:-1,y:-1},{x:-1,y: 0},{x:-2,y: 1},{x:-1,y: 1}],
    isT: false
  },
  /*T*/{
    color: "magenta",
    0: [{x:-1,y:-1},{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0}],
    1: [{x:-1,y:-1},{x:-1,y: 0},{x: 0,y: 0},{x:-1,y: 1}],
    2: [{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0},{x:-1,y: 1}],
    3: [{x:-1,y:-1},{x:-2,y: 0},{x:-1,y: 0},{x:-1,y: 1}],
    isT: true
  }
], function (d, minoAtRelPos) {
  
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
      [{x: 0,y: 0},{x: 0,y:-1},{x: 0,y:-2},{x: 1,y:-1},{x: 1,y:-2},{x: 0,y: 1},{x: 0,y: 2},{x: 1,y: 1},{x: 1,y: 2},{x:-1,y:-0},{x: 0,y:-3},{x: 0,y: 3}]  // 3>>1──┘
    ],
    /* CCW  rotations */ [
      [{x:0,y:0},{x: 1,y:0},{x: 1,y:-1},{x: 0,y: 2},{x: 1,y: 2}], // 0>>3
      [{x:0,y:0},{x: 1,y:0},{x: 1,y: 1},{x: 0,y:-2},{x: 1,y:-2}], // 1>>0
      [{x:0,y:0},{x:-1,y:0},{x:-1,y:-1},{x: 0,y: 2},{x:-1,y: 2}], // 2>>1
      [{x:0,y:0},{x:-1,y:0},{x:-1,y: 1},{x: 0,y:-2},{x:-1,y:-2}]  // 3>>2
    ]
  ]
  
  // sets some preliminary info

  let wallkicks = this.wallkickOverride == undefined ? 
      defaultWallkicks :
      this.wallkickOverride;

  if (SRS.settings != undefined) {
    switch (SRS.settings.one80Spins) {
      case SRS.settings.one80SpinsEnum.DISABLED:
        wallkicks[2] = [
          [{x: 0,y: Infinity}], // 0>>2─┐
          [{x: 0,y: Infinity}], // 1>>3─┼┐
          [{x: 0,y: Infinity}], // 2>>0─┘│
          [{x: 0,y: Infinity}]  // 3>>1──┘
        ];
        break;
      case SRS.settings.one80SpinsEnum.NO_KICKS:
        wallkicks[2] = [
          [{x: 0,y: 0}], // 0>>2─┐
          [{x: 0,y: 0}], // 1>>3─┼┐
          [{x: 0,y: 0}], // 2>>0─┘│
          [{x: 0,y: 0}]  // 3>>1──┘
        ];
        break;
      case SRS.settings.one80SpinsEnum.TETRIO:
        wallkicks[2] = [
          [{x: 0,y: 0},{x: 0,y:-1},{x: 1,y:-1},{x:-1,y:-1},{x: 1,y: 0}], // 0>>2─┐
          [{x: 0,y: 0},{x: 1,y: 0},{x: 1,y:-2},{x: 1,y:-1},{x: 0,y:-2}], // 1>>3─┼┐
          [{x: 0,y: 0},{x: 0,y: 1},{x:-1,y: 1},{x: 1,y: 1},{x:-1,y: 0}], // 2>>0─┘│
          [{x: 0,y: 0},{x:-1,y: 0},{x:-1,y:-2},{x:-1,y:-1},{x: 0,y:-2}]  // 3>>1──┘
        ];
        break;
      case SRS.settings.one80SpinsEnum.NULLPOMINO:
        break;
      default: break;
    }

    if (SRS.settings.iKicks == SRS.settings.iKicksEnum.ARIKA) {
      if (this.arikaWallkickOverride != undefined) Object.assign(wallkicks, this.arikaWallkickOverride);
    }
  }

  let dir = posMod(d,4);
  let newDir = posMod((this.facing + dir),4);

  // everything else does the actual rotating
  
  let o = {success: false, x: 0, y: 0};
  wallkicks[dir][this.facing].forEach((i, ind, arr) => {
    if (!o.success) {
      let testSuccess = true;
      for (let j of this[newDir]) {
        if (minoAtRelPos(i.x + j.x, i.y + j.y)) {
          testSuccess = false;
          break;
        }
      }
      if (testSuccess) {
        this.facing = newDir;
        o = Object.assign({success: true}, i);
        return;
      }
    }
  });
  
  return Object.assign(o, {tetromino: this});
});

SRS.settings = {
  one80SpinsEnum: {
    DISABLED: 0,
    NO_KICKS: 1,
    TETRIO: 2,
    NULLPOMINO: 3
  },
  one80Spins: 0,
  iKicksEnum: {
    STANDARD: 0,
    ARIKA: 1
  },
  iKicks: 0
};

// TODO: find a way to implement 180 spins that doesn't rely on Nullpomino's kicks being stored with the tetromino data