class Matrix {
  constructor(width=10, height=20) {
    this.emptyRow = [];
    for (let i=0; i<width; i++) this.emptyRow.push("");
    this.data = [];
    for (let i=0; i<height; i++) this.data.push(JSON.parse(JSON.stringify(this.emptyRow)));
  }
  
  getWidth() {
    return this.emptyRow.length;
  }
  
  getHeight() {
    return this.data.length;
  }
  
  getDimensions() {
    return {width: this.getWidth(), height: this.getHeight()}
  }
  
  minoAtPos(x,y) {
    if (y<=-this.getHeight() && x>=0 && x < this.getWidth()) return false;
    else return this.data[-y] == undefined || this.data[-y][x] == undefined ? true : this.data[-y][x] != "";
  }
  
  colorAtPos(x,y) {
    return this.data[-y] == undefined || this.data[-y][x] == undefined ? undefined : this.data[-y][x];
  }
  
  lock(t) {
    for (let i of t.getCurrentShape()) {
      if (this.minoAtPos(i.x, i.y)) throw {name: "Block out", message: "Tetromino must lock over empty space"};
      this.data[-i.y][i.x] = t.tetromino.color;
    }
  }
  
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
  
  clearLines(lines=this.detectLines()) {
    let t = this;
    lines.sort((a,b)=>a-b).reverse().forEach(function (i, ind, arr) {
      t.data.splice(i, 1);
      t.data.push(JSON.parse(JSON.stringify(t.emptyRow)));
    });
  }
}