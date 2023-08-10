const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'path_to_your_input_csv_file.csv'; // Update with the path to your CSV file
const outputFile = 'path_to_your_output_json_file.json'; // Update with the desired output JSON file path

const columnHeaders = ['name', 'asCode', 'overallStatus', 'mcStatus', 'appdStatus', 'guiStatus'];
const transformedData = [];

fs.createReadStream(inputFile)
  .pipe(csv({ separator: ';' })) // Specify the correct separator used in your CSV file
  .on('data', (row) => {
    const entry = {};
    for (let i = 0; i < columnHeaders.length; i++) {
      entry[columnHeaders[i]] = row[i];
    }
    transformedData.push(entry);
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, JSON.stringify(transformedData, null, 2));
    console.log('Transformation complete.');
  });
