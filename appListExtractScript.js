const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'path_to_your_input_csv_file.csv'; // Update with the path to your CSV file
const outputFile = 'path_to_your_output_json_file.json'; // Update with the desired output JSON file path

const transformedData = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    if (row[3] && row[4]) { // Check if columns 3 and 4 are not empty
      transformedData.push({
        name: row[3],
        asCode: row[4],
        overallStatus: '',
        mcStatus: '',
        appdStatus: '',
        guiStatus: '',
      });
    }
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, JSON.stringify(transformedData, null, 2));
    console.log('Transformation complete.');
  });
