// Class for a matrix, which stores what minoes go where.

class Matrix {
  constructor(width=10, skyline=width*2, height=skyline*2) {
    this.skyline = skyline;
    this.emptyRow = [];
    for (let i=0; i<width; i++) this.emptyRow.push("");
    this.data = [];
    for (let i=0; i<height; i++) this.data.push(JSON.parse(JSON.stringify(this.emptyRow)));
  }
  
  // Gets the width of the matrix
  getWidth() {
    return this.emptyRow.length;
  }
  
  // Gets the height of the matrix
  getHeight() {
    return this.data.length;
  }
  
  // Gets both the width and height using the previous two functions
  getDimensions() {
    return {width: this.getWidth(), height: this.getHeight()}
  }
  
  // Returns whether there is a mino at a given position
  minoAtPos(x,y) {
    if (y<=-this.getHeight() && x>=0 && x < this.getWidth()) return false;
    else return this.data[-y] == undefined || this.data[-y][x] == undefined ? true : this.data[-y][x] != "";
  }
  
  // Returns what color mino there is at a given positon
  colorAtPos(x,y) {
    return this.data[-y] == undefined || this.data[-y][x] == undefined ? undefined : this.data[-y][x];
  }
  
  // Locks a tetromino to the matrix. Accepts a PositionedTetrmomino object as input. Also is responsible for two of the game over conditions.
  lock(t) {
    let lockOut = true;
    for (let i of t.getCurrentShape()) {
      if (-i.y<this.skyline) lockOut=false;
      if (this.minoAtPos(i.x, i.y)) throw {name: "Block out", message: "Tetromino must lock over empty space"};
      this.data[-i.y][i.x] = t.tetromino.color;
    }
    if (lockOut) throw {name: "Lock out", message: "Tetromino must not lock completely above Skyline"};
  }
  
  // Detects what lines need to be cleared.
  detectLines() {
    let lines = [];
    this.data.forEach(function (i, ind, arr) {
      let line = true;
      for (let j of i) {
        if (j == "") {
          line = false;
          break;
        }
      }
      
      if (line) lines.push(ind);
    });
    return lines;
  }
  
  // Clears lines. Default for lines to clear is result from above
  clearLines(lines=this.detectLines()) {
    let t = this;
    lines.sort((a,b)=>a-b).reverse().forEach(function (i, ind, arr) {
      t.data.splice(i, 1);
      t.data.push(JSON.parse(JSON.stringify(t.emptyRow)));
    });
    
    return lines;
  }

  eraseLinesToClear(lines=this.detectLines()) {
    let t = this;
    lines.sort((a,b)=>a-b).reverse().forEach(function (i, ind, arr) {
      t.data[i] = JSON.parse(JSON.stringify(t.emptyRow));
    });
    
    return lines;
  }
}