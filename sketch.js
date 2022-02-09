// Idea: I'm a fan of modern T****s, so I want to make a T****s clone that incorporates features of modern games. I've made something like this before, using Python and the Pygame library. However the code style was kind of crappy. I want to make a better version using JavaScript.

const SRS = new RS([
  { // Z
    color: "red",
    0: [{x:-2,y:-2},{x:-1,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    3: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:-2,y: 0}]
  },
  { // L
    color: "#ff8000",
    0: [{x: 0,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x:-1,y:-2},{x:-1,y:-1},{x:-1,y: 0},{x: 0,y: 0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1},{x:-2,y: 0}],
    3: [{x:-2,y:-2},{x:-1,y:-2},{x:-1,y:-1},{x:-1,y: 0}]
  },
  { // O
    color: "yellow",
    0: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    2: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1}],
    3: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x: 0,y:-1}]
  },
  { // S
    color: "lime",
    0: [{x:-1,y:-2},{x: 0,y:-2},{x:-2,y:-1},{x:-1,y:-1}],
    1: [{x:-1,y:-2},{x:-1,y:-1},{x: 0,y:-1},{x: 0,y: 0}],
    2: [{x:-1,y:-1},{x: 0,y:-1},{x:-2,y: 0},{x:-1,y: 0}],
    3: [{x:-2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:-1,y: 0}]
  },
  { // I
    color: "cyan",
    0: [{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1},{x: 1,y:-1}],
    1: [{x: 0,y:-2},{x: 0,y:-1},{x: 0,y: 0},{x: 0,y: 1}],
    2: [{x:-2,y: 0},{x:-1,y: 0},{x: 0,y: 0},{x: 1,y: 0}],
    3: [{x:-1,y:-2},{x:-1,y:-1},{x:-1,y: 0},{x:-1,y: 1}]
  },
  { // J
    color: "blue",
    0: [{x:-2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x:-1,y:-2},{x: 0,y:-2},{x:-1,y:-1},{x:-1,y: 0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1},{x: 0,y: 0}],
    3: [{x:-1,y:-2},{x:-1,y:-1},{x:-2,y: 0},{x:-1,y: 0}]
  },
  { // T
    color: "magenta",
    0: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1}],
    1: [{x:-1,y:-2},{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0}],
    2: [{x:-2,y:-1},{x:-1,y:-1},{x: 0,y:-1},{x:-1,y: 0}],
    3: [{x:-1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:-1,y: 0}]
  }
], function (dir, minoAtRelPos) {
  /*
This data was copied and pasted from various wikis

J, L, T, S, Z Tetromino Wall Kick Data
		Test 2	Test 3	Test 4	Test 5
0>>1	(-1, 0)	(-1, 1)	( 0,-2)	(-1,-2)
1>>0	( 1, 0)	( 1,-1)	( 0, 2)	( 1, 2)
1>>2	( 1, 0)	( 1,-1)	( 0, 2)	( 1, 2)
2>>1	(-1, 0)	(-1, 1)	( 0,-2)	(-1,-2)
2>>3	( 1, 0)	( 1, 1)	( 0,-2)	( 1,-2)
3>>2	(-1, 0)	(-1,-1)	( 0, 2)	(-1, 2)
3>>0	(-1, 0)	(-1,-1)	( 0, 2)	(-1, 2)
0>>3	( 1, 0)	( 1, 1)	( 0,-2)	( 1,-2)

I Tetromino Wall Kick Data
		Test 2	Test 3	Test 4	Test 5
0>>1	(-2, 0)	( 1, 0)	(-2,-1)	( 1, 2)
1>>0	( 2, 0)	(-1, 0)	( 2, 1)	(-1,-2)
1>>2	(-1, 0)	( 2, 0)	(-1, 2)	( 2,-1)
2>>1	( 1, 0)	(-2, 0)	( 1,-2)	(-2, 1)
2>>3	( 2, 0)	(-1, 0)	( 2, 1)	(-1,-2)
3>>2	(-2, 0)	( 1, 0)	(-2,-1)	( 1, 2)
3>>0	( 1, 0)	(-2, 0)	( 1,-2)	(-2, 1)
0>>3	(-1, 0)	( 2, 0)	(-1, 2)	( 2,-1)

I Tetromino Wall Kick Data (Arika)
		Test 2	Test 3	Test 4	Test 5
0->1	(-2, 0)	( 1, 0)	( 1, 2)	(-2,-1)
1->0	( 2, 0)	(-1, 0)	( 2, 1)	(-1,-2)
1->2	(-1, 0)	( 2, 0)	(-1, 2)	( 2,-1)
2->1	(-2, 0)	( 1, 0)	(-2, 1)	( 1,-1)
2->3	( 2, 0)	(-1, 0)	( 2, 1)	(-1,-1)
3->2	( 1, 0)	(-2, 0)	( 1, 2)	(-2,-1)
3->0	(-2, 0)	( 1, 0)	(-2, 1)	( 1,-2)
0->3	( 2, 0)	(-1, 0)	(-1, 2)	( 2,-1)


These 180-degree kicks come from the fan-game NullpoMino. But they need to be translated from Java to JavaScript first

private static final int WALLKICK_NORMAL_180[][][] =
{
	{{ 1, 0},{ 2, 0},{ 1, 1},{ 2, 1},{-1, 0},{-2, 0},{-1, 1},{-2, 1},{ 0,-1},{ 3, 0},{-3, 0}},	// 0>>2─┐
	{{ 0, 1},{ 0, 2},{-1, 1},{-1, 2},{ 0,-1},{ 0,-2},{-1,-1},{-1,-2},{ 1, 0},{ 0, 3},{ 0,-3}},	// 1>>3─┼┐
	{{-1, 0},{-2, 0},{-1,-1},{-2,-1},{ 1, 0},{ 2, 0},{ 1,-1},{ 2,-1},{ 0, 1},{-3, 0},{ 3, 0}},	// 2>>0─┘│
	{{ 0, 1},{ 0, 2},{ 1, 1},{ 1, 2},{ 0,-1},{ 0,-2},{ 1,-1},{ 1,-2},{-1, 0},{ 0, 3},{ 0,-3}},	// 3>>1──┘
};
private static final int WALLKICK_I_180[][][] =
{
	{{-1, 0},{-2, 0},{ 1, 0},{ 2, 0},{ 0, 1}},													// 0>>2─┐
	{{ 0, 1},{ 0, 2},{ 0,-1},{ 0,-2},{-1, 0}},													// 1>>3─┼┐
	{{ 1, 0},{ 2, 0},{-1, 0},{-2, 0},{ 0,-1}},													// 2>>0─┘│
	{{ 0, 1},{ 0, 2},{ 0,-1},{ 0,-2},{ 1, 0}},													// 3>>1──┘
};
  */
});




function setup() {
  createCanvas(640, 480, WEBGL);
}

function draw() {
  background(56);
  
  
  // Still working on implementing the Super Rotation System (SRS). The first part of the implementation is complete and it is visualized using this rotating block.
  
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