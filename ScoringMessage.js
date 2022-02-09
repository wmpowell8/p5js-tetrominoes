// Class for a scoring message with a cool animation

class ScoringMessage {
  constructor(text, color, position, size=36, animStart=millis(), isCentered=false, font=regularFont, strokWeight=0, strokColor="white") {
    this.text=text;
    this.color=color;
    this.position=position;
    this.size=size;
    this.isCentered=isCentered;
    this.animStart = animStart;
    this.strokeWeight = strokWeight;
    this.strokeColor = strokColor;
    this.font = font;
  }
  
  // Shows the scoring message
  
  show(sideX, sideY, centerX=0, centerY=0) {
    push();
    
    if (this.strokeWeight == 0) noStroke();
    else {
      stroke(this.strokeColor);
      strokeWeight(this.strokeWeight);
    }
    
    let transColor = color(this.color);
    let sinceAnimStart = millis()-this.animStart;
    if (sinceAnimStart<0) transColor.setAlpha(0);
    else if (sinceAnimStart>=0 && sinceAnimStart<150) transColor.setAlpha(sinceAnimStart / 500 * 256);
    else transColor.setAlpha((1-(sinceAnimStart-150) / 2350) * 256);
    
    
    fill(transColor);
    textSize(this.size);
    if (this.isCentered) textAlign(CENTER, CENTER); else textAlign(RIGHT, TOP);
    
    textFont(this.font);

    text(this.text, this.isCentered ? centerX : sideX, this.position + (this.isCentered ? centerY : sideY));
    
    pop();
    
    return sinceAnimStart<2500;
  }
}