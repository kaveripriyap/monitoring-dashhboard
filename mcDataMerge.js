const fs = require('fs');
const Papa = require('papaparse');

// Read CSV files
const mcStaticData = fs.readFileSync('mc_static.csv', 'utf-8');
const mcDynamicData = fs.readFileSync('mc_dynamic.csv', 'utf-8');

// Parse CSV data
const mcStaticRows = Papa.parse(mcStaticData, { header: true, dynamicTyping: true }).data;
const mcDynamicRows = Papa.parse(mcDynamicData, { header: true, dynamicTyping: true }).data;

// Create a map of INKA to SOLUTION_ID (asCode) from mc_static data
const solutionMap = {};
mcStaticRows.forEach(row => {
  solutionMap[row.INKA] = row.SOLUTION_ID;
});

// Transform and merge data
const mcData = mcDynamicRows.map(row => {
  const type = 'MC';
  const asCode = solutionMap[row.INKA] || '';
  const statusMap = { '1': 'Working', '2': 'Warning', '3': 'Error' };
  const status = statusMap[row.STATUS] || '';
  const error = row.COMPONENT + ': ' + row.ERROR.split('<br>')[0].trim();
  
  return {
    name: row.SERVER_NAME,
    type,
    asCode,
    time: row.TIME,
    status,
    link: row.LINK,
    error
  };
});

// Convert mcData to CSV format
const mcDataCsv = Papa.unparse(mcData, { header: true });

// Write the merged data to mc_data.csv
fs.writeFileSync('mc_data.csv', mcDataCsv, 'utf-8');

console.log('Merged data saved to mc_data.csv');
