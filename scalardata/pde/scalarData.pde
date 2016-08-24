NrrdWrangler data;
float[][] dataArray;
String[][] bin = new String[8][8];

float isoVal;

int rowCount;
int colCount;
int header;

int imageHeight;
int imageWidth;
float intervalX;
float intervalY;
float cornerX;
float cornerY;

float imageWidthInt;

int selection;

void setup() {
	//boxWidth = 700;

	rectMode(CORNER);
	//fill(255);

	//rect(50, 50, boxWidth, boxHeight);

	colCount = 8;
	rowCount = 8;
	header = 6;

	//intervalX = boxWidth/colCount;
	imageHeight = 800;
    int rcount = rowCount - 1;
    int ccount = colCount -1;
	intervalY = (float)(imageHeight)/(rcount);

	imageWidth = ceil(ccount * intervalY);

	imageWidthInt = colCount*intervalY;

	//println(intervalY);

	//imageHeight = rowCount;
	//imageWidth = colCount;

	//intervalY = 1;

	//cornerX = (width - imageWidth)/2;
	//cornerY = (height - imageHeight)/2;

	size(imageWidth, imageHeight);

    isoVal = map(32700, 0, 64000, 0, 255);

	noStroke();
	fill(255);
	//rect(cornerX, cornerY, imageWidth, imageHeight);

	rect(0, 0, width, height);

	// intervalX = 1;
	// intervalY = 1;

	int selection = 0;

	data = new NrrdWrangler("./pde/data/test.nrrd", rowCount, colCount, header);

	dataArray = data.getData();

    for (int i = 0; i < rowCount; i++){
        for (int j = 0; j < colCount; j++){
            dataArray[i][j] = map(dataArray[i][j], 0, 64000, 0, 255);
        }
    }

    for (int i = 0; i < rowCount; i++){
        for (int j = 0; j < colCount; j++){
            bin[i][j] = (dataArray[i][j] >= isoVal) ? "1" : "0";
        }
    }

	//println("data points -- Q11: " + dataArray[1][372] + " Q12: " + dataArray[2][372] + " Q21: " + dataArray[1][373] + " Q22: " + dataArray[2][373]);

	for (int i = 0; i < height; i++){
		for (int j = 0; j < width; j++){
			//fill(mapColor(dataArray[i][j]));
			fill(bilinearInterpolation(j, i));
		    noStroke();
			rect(j, i, 1, 1);
		}
	}

    for (int i = 0; i < rowCount-1; i++){
        for (int j = 0; j < colCount-1; j++){
            noFill();
            stroke(#F20056);
            //rect(i*intervalY, j*intervalY, intervalY, intervalY);
            isoline(getBins(i,j), i*intervalY, j*intervalY);
        }
    }

    noFill();
    stroke(#FF0000);
    rect(0, 0, 800, 800);
}


void draw(){

}


void keyPressed() {

	if (key == 's') {
		save("brain.png");
	}

}

color mapColor(float val){

	// color[][] colorMaps = {{#FFF7FB, #ECE7F2, #D0D1E6, #A6BDDB, #74A9CF, #3690C0, #0570B0, #034E7B},
	// 					   {#F1EEF6, #BDC9E1, #74A9CF, #0570B0, #74A9CF, #3690C0, #0570B0, #034E7B},
	// 					   {#ECE7F2, #A6BDDB, #2B8CBE, #74A9CF, #3690C0, #0570B0, #034E7B, #034E7B}};

	// float[] intervals = {37, 85, 128};

	color[] colorMap = {#3F007D, #6A51A3, #BCBDDC};

	float interval = 128;

	int index = floor(val/interval);

	int nextIndex = index + 1;

	float percent = map(val, index*interval, nextIndex*interval, 0, 1);

	color mappedColor = lerpColor(colorMap[index], colorMap[index+1], percent);

	//color mappedColor = lerpColor(#3F007D, #BCBDDC, norm(val, 0, 255));

	//println("val: " + val + " from " + index*interval + " to " + nextIndex*interval + " percent: " + percent + " index: " + index);

	return mappedColor;

}

//color

color bilinearInterpolation (int x, int y) {
	int[] xy = getLocation(x, y);

	float mpX = x/intervalY;
	float mpY = y/intervalY;

	//this is for f(Qij) where they are ordered f(Q11), f(Q12), f(Q21), f(Q22)
	float[] fQ = {dataArray[xy[2]][xy[0]],
				  dataArray[xy[3]][xy[0]],
				  dataArray[xy[2]][xy[1]],
				  dataArray[xy[3]][xy[1]]};

	//Compute R1 and R2
	float[] fR = {((xy[1]-mpX)/(xy[1]-xy[0]))*fQ[0] + ((mpX-xy[0])/(xy[1]-xy[0]))*fQ[2],
	              ((xy[1]-mpX)/(xy[1]-xy[0]))*fQ[1] + ((mpX-xy[0])/(xy[1]-xy[0]))*fQ[3]};

	//Compute fP
	float fP = ((xy[3]-mpY)/(xy[3]-xy[2]))*fR[0] + ((mpY-xy[2])/(xy[3]-xy[2]))*fR[1];

	//println("fP: " + fP);

	//if (fP >= 255) { fP = 255;}

	return mapColor(fP);

}

int[] getLocation(int x, int y){
	//println(x/intervalY);
	int x1 = floor(x/intervalY);
	//println(x1);
	int x2 = x1 + 1;
	if(x2 == colCount) { x2 = colCount -1; x1 = colCount - 2; x = ceil(x - intervalY);}
	int y1 = floor(y/intervalY);
	int y2 = y1 + 1;
	if(y2 == rowCount) { y2 = rowCount -1; y1 = rowCount - 2; y = ceil(y - intervalY);}

	int[] xy = {x1, x2, y1, y2};

	//println("x: " + x + " y: " + y + " x1: " + x1 + " x2: " + x2 + " y1: " + y1 + " y2 " + y2);

	return xy;
}

int getBins(int x, int y){

    String binary = bin[y][x] + bin[y][x+1] + bin[y+1][x+1] + bin[y+1][x];
    int intBin = unbinary(binary);

    return intBin;

}

void isoline(int bit, float x, float y){

  float intervalY2 = intervalY/2;

  switch(bit) {
    case 0: case 15:
      beginShape();
      endShape();
      break;
    case 1: case 14:
      beginShape();
      vertex(x, y+intervalY2);
      vertex(x+intervalY2, y+intervalY);
      endShape();
      break;
    case 2: case 13:
      beginShape();
      vertex(x+intervalY, y+intervalY2);
      vertex(x+intervalY2, y+intervalY);
      endShape();
      break;
    case 3: case 12:
      beginShape();
      vertex(x, y+intervalY2);
      vertex(x+intervalY, y+intervalY2);
      endShape();
      break;
    case 4: case 11:
      beginShape();
      vertex(x+intervalY2, y);
      vertex(x+intervalY, y+intervalY2);
      endShape();
      break;
    case 6: case 9:
      beginShape();
      vertex(x+intervalY2, y);
      vertex(x+intervalY2, y+intervalY);
      endShape();
      break;
    case 7: case 8:
      beginShape();
      vertex(x, y+intervalY2);
      vertex(x+intervalY2, y);
      endShape();
      break;
    case 5:
      beginShape();
      vertex(x, y+intervalY2);
      vertex(x+intervalY, y);
      endShape();
      beginShape();
      vertex(x+intervalY, y+intervalY2);
      vertex(x+intervalY2, y+intervalY);
      endShape();
      break;
    case 10:
      beginShape();
      vertex(x, y+intervalY2);
      vertex(x+intervalY2, y+intervalY);
      endShape();
      beginShape();
      vertex(x+intervalY, y+inter  valY2);
      vertex(x+intervalY2, y);
      endShape();
      break;
  }

}
