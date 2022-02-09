// RS stands for Rotation System

class RS {
  constructor(tetrominoData, rotateFunction) {
    /* Constructor for rotation system class.
     *
     * tetrominoData is an array filled with data that determines
     * the shape of each tetromino. This array must contain an object
     * containing a color called color and four other entries whose
     * keys are the numbers 0-3. These determine the shape of each
     * tetromino at each orientation. 0 is the "north" orientation,
     * 1 is "east", 2 is "south", and 3 is "west". Each entry is an
     * array where each contained object is a mino. Each mino object
     * contains two entries x and y, determining the position of each
     * mino relative to a seemingly-arbitrary "origin" position that
     * makes it easy to program tetromino spawning.
     *
     * rotateFunction is a function that determines how tetrominoes
     * should be rotated. It takes two arguments, a direction argument
     * specifying the direction of rotation; 1 if clockwise, -1 or 3 if
     * counterclockwise, and 2 or -2 if 180-degree rotation (if
     * enabled). The other argument is a function returning a boolean
     * value representing whether or not there is a mino at a given
     * position relative to the "origin" or this position is outside the
     * walls or below the floor of the playfield. This position is
     * signified by two arguments: an X and Y position. It returns an
     * object with an x key and a y key, signifying how the tetromino
     * should kick when rotating, a boolean success key, signifying
     * whether the rotation was a success or a failure (this does not
     * affect outcome, only what sound to play, etc), and a tetromino
     * key with a reference to the Tetromino object.
     */
    this.tetrominoes = tetrominoData;
    this.rotate = rotateFunction;
  }
  bag(num=1) {
    /* Function that returns a list of all the Tetromino objects that
     * make up a rotation system. Useful for the 7-bag tetromino
     * generation system.
     *
     * It takes one optional argument, num, which defaults to 1. It
     * determines how many multiples of each tetromino you want in your
     * bag, so if you, for example, wanted a 14-bag instead of a 7-bag
     * you would set this argument to 2 instead of 1.
     */
    let bag = [];
    for (let n=0; n<num; n++) {
      for (let i of this.tetrominoes) {
        bag.push(new Tetromino(JSON.parse(JSON.stringify(i)), this.rotate));
      }
    }
    return bag;
  }
}