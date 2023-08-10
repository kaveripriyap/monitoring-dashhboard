// const fs = require('fs');
// const csv = require('csv-parser');

// const inputFile = 'path_to_your_input_csv_file.csv'; // Update with the path to your CSV file
// const outputFile = 'path_to_your_output_json_file.json'; // Update with the desired output JSON file path

// const columnHeaders = ['name', 'asCode', 'overallStatus', 'mcStatus', 'appdStatus', 'guiStatus'];
// const transformedData = [];

// fs.createReadStream(inputFile)
//   .pipe(csv({ separator: ';' })) // Specify the correct separator used in your CSV file
//   .on('data', (row) => {
//     const entry = {};
//     for (let i = 0; i < columnHeaders.length; i++) {
//       entry[columnHeaders[i]] = row[i];
//     }
//     transformedData.push(entry);
//   })
//   .on('end', () => {
//     fs.writeFileSync(outputFile, JSON.stringify(transformedData, null, 2));
//     console.log('Transformation complete.');
//   });

const fs = require('fs');
const csvParser = require('csv-parser');
const csvWriter = require('csv-write-stream');

const inputFilePath = 'path_to_your_input_csv_file.csv'; // Replace with the actual file path
const outputFilePath = 'path_to_your_output_csv_file.csv'; // Replace with the desired output file path

const processedData = [];
let isFirstRow = true;

fs.createReadStream(inputFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    if (isFirstRow) {
      isFirstRow = false;
      return; // Skip processing the first row (column headers)
    }

    // Extract data from columns 3 and 4
    const name = row['blah_3']; // Replace 'blah_3' with the actual column header of the third column
    const asCode = row['blah_4']; // Replace 'blah_4' with the actual column header of the fourth column

    // Create a new object with the extracted data
    const newData = {
      name,
      asCode,
      overallStatus: '',
      mcStatus: '',
      appdStatus: '',
      guiStatus: '',
    };

    // Push the new object to the processedData array
    processedData.push(newData);
  })
  .on('end', () => {
    // Write the processed data to the output file
    const writer = csvWriter();
    writer.pipe(fs.createWriteStream(outputFilePath));
    processedData.forEach((data) => {
      writer.write(data);
    });
    writer.end();

    console.log('Data extraction and transformation complete.');
  });
