class Tetromino {
  /* Class to represent tetrominoes. Constructor is only meant to be
   * called by methods of the RS class.
   * 
   * All data associated with indiviual types of tetrominoes are
   * interited from an entry in an RS's tetromino data array via the
   * dataEntry argument in the constructor, such as the values of the
   * color, 0, 1, 2, and 3 keys.
   *
   * The rotate function is inherited directly from the RS.
   *
   * The value of facing defaults to 0 and determines what direction
   * the tetromino is facing. It is used by the rotate function.
   */
  constructor(dataEntry, rotateFunction) {
    Object.assign(this, dataEntry);
    this.rotate = rotateFunction;
    this.facing = 0;
  }
  
  getCurrentShape() {
    /* Returns an array where each contained object represents a
     * mino. Each mino object contains two entries x and y,
     * determining the position of each mino relative to a seemingly-
     * arbitrary "origin" position that makes it easy to program
     * tetromino spawning.
     */
    return this[this.facing];
  }
  
  spawn(x,y) {
    /* Accepts two arguments x and y and returns a new
     * PositionedTetromino object spawned at position (x,y).
     */
    
    return new PositionedTetromino(this, x, y);
  }
}