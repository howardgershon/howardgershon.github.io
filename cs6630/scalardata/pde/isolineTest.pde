String[] cellNames = {"0000", "0001", "0010", "0011",
                      "0100", "0101", "0110", "0111",
                      "1000", "1001", "1010", "1011",
                      "1100", "1101", "1110", "1111"};
PFont font;

void setup() {
  size(625, 175);
  fill(175);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, 625, 175);

  textAlign(CENTER);
  stroke(0);
  font = createFont("OratorStd", 10);
  textFont(font);

  stroke(#F20056);
  for (int i = 0; i < 8; i++){
    for (int j = 0; j < 2; j++){
      fill(0);
      text(cellNames[(int)(i+7*j)], i*75+50, j*75+18.75);
      fill(255);
      stroke(0);
      rect(i*75+25, j*75+25, 50, 50);
      stroke(#F20056);
      isoline((int)(i+8*j), (i*75)+25, (j*75)+25);
    }
  }
}

void draw(){

}

void isoline(int bit, float x, float y){
  switch(bit) {
    case 0: case 15:
      beginShape();
      endShape();
      break;
    case 1: case 14:
      beginShape();
      vertex(x, y+25);
      vertex(x+25, y+50);
      endShape();
      break;
    case 2: case 13:
      beginShape();
      vertex(x+50, y+25);
      vertex(x+25, y+50);
      endShape();
      break;
    case 3: case 12:
      beginShape();
      vertex(x, y+25);
      vertex(x+50, y+25);
      endShape();
      break;
    case 4: case 11:
      beginShape();
      vertex(x+25, y);
      vertex(x+50, y+25);
      endShape();
      break;
    case 6: case 9:
      beginShape();
      vertex(x+25, y);
      vertex(x+25, y+50);
      endShape();
      break;
    case 7: case 8:
      beginShape();
      vertex(x, y+25);
      vertex(x+25, y);
      endShape();
      break;
    case 5:
      beginShape();
      vertex(x, y+25);
      vertex(x+25, y);
      endShape();
      beginShape();
      vertex(x+50, y+25);
      vertex(x+25, y+50);
      endShape();
      break;
    case 10:
      beginShape();
      vertex(x, y+25);
      vertex(x+25, y+50);
      endShape();
      beginShape();
      vertex(x+50, y+25);
      vertex(x+25, y);
      endShape();
      break;
  }

}
