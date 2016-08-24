class NrrdWrangler {

  	int rowCount;
  	int colCount;
  	float[][] data;
  	int header;


	NrrdWrangler(String filename, int rowCount, int colCount, int header) {

		String[] rows = loadStrings(filename);

		//println(rows[0]);


		this.rowCount = rowCount;
		this.colCount = colCount;
		this.header = header;

		data = new float[rowCount][colCount];

		//println("loaded!" + " : " + rowCount + " : " + colCount + " : " + header);

		//trim beforehand
		for (int i = 0; i < rowCount; i++){
			for (int j = 0; j < colCount; j++){
				//data[i][j] = parseFloat(rows[j + (i)*colCount + header]);
				data[i][j] = parseFloat(rows[j + i*colCount + header]);
				//print(data[i][j] + " ");
			}
			//print("\n");
		}
	}

	float[][] getData(){
		return data;
	}


}

