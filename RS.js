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
     * walls or below the floor of the playfield. It returns _________
     */
    this.tetrominoes = tetrominoData;
    this.rotate = rotateFunction;
  }
}