const fs = require('fs');
const Papa = require('papaparse');

// Read CSV files
const appdStaticData = fs.readFileSync('appd_static.csv', 'utf-8');
const appdDynamicData = fs.readFileSync('appd_dynamic.csv', 'utf-8');

// Parse CSV data
const appdStaticRows = Papa.parse(appdStaticData, { header: true, dynamicTyping: true }).data;
const appdDynamicRows = Papa.parse(appdDynamicData, { header: true, dynamicTyping: true }).data;

// Create a map of solution_name to asCode from appd_static data
const solutionMap = {};
appdStaticRows.forEach(row => {
  solutionMap[row.solution_name] = row.asCode;
});

// Transform and merge data
const appdData = appdDynamicRows.map(row => {
  const type = 'AppD';
  const asCode = solutionMap[row.solution_name] || '';
  
  return {
    name: row.name,
    type,
    asCode,
    status: row.status,
    error: row.error
  };
});

// Convert appdData to CSV format
const appdDataCsv = Papa.unparse(appdData, { header: true });

// Write the merged data to appd_data.csv
fs.writeFileSync('appd_data.csv', appdDataCsv, 'utf-8');

console.log('Merged data saved to appd_data.csv');
