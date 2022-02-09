class Tetromino {
  constructor(dataEntry, rotateFunction) {
    Object.assign(this, dataEntry);
    this.rotate = rotateFunction;
    this.facing = 0;
  }
}