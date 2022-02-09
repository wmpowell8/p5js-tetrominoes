class PositionedTetromino {
  constructor(tetromino, x=-20, y=5) {
    
    // tetromino attributes include: color, 0, 1, 2, 3, rotate, facing
    this.tetromino = tetromino;
    
    this.x = x;
    this.y = y;
  }
  
  getCurrentShape() {
    /* Same as getCurrentShape for Tetromino class, but the positions
     * returned are global instead of relative to the tetromino
     * origin position.
     */
    return this.tetromino.getCurrentShape().map((p)=>({x:p.x+this.x,y:p.y+this.y}));
  }
  
  rotate(dir, minoAtPos) {
    /* Rotates tetromino. Accept two arguments, the first being the
     * direction of rotation, and the second being a function returning
     * whether or not there is a mino at a position given by an x and y
     * argument. Returns whether or not the rotation was successful
     * (although this does not affect the outcome, only what sound to
     * play, etc). This return value is subject to change to an object
     * of the form: 
     *
     * {
     *   success: (boolean success value),
     *   tetromino: (this PositionedTetromino object)
     * }
     */
    
    let result = this.tetromino.rotate(dir, (x,y)=>minoAtPos(x-this.x,y-this.y));
    x += result.x;
    y += result.y;
    
    // Return value subject to change as detailed above.
    return result.success;
  }
}