const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');

// Read CSV files
const mcStaticData = fs.readFileSync('mc_static.csv', 'utf-8');
const mcDynamicData = fs.readFileSync('mc_dynamic.csv', 'utf-8');

// Parse CSV data
const mcStaticRows = parse(mcStaticData, { columns: true });
const mcDynamicRows = parse(mcDynamicData, { columns: true });

// Create a map of SOLUTION_ID to SOLUTION_NAME
const solutionMap = {};
mcStaticRows.forEach(row => {
  solutionMap[row.SOLUTION_ID] = row.SOLUTION_NAME;
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
const mcDataCsv = stringify(mcData, {
  header: true,
  columns: ['name', 'type', 'asCode', 'time', 'status', 'link', 'error']
});

// Write the merged data to mc_data.csv
fs.writeFileSync('mc_data.csv', mcDataCsv, 'utf-8');

console.log('Merged data saved to mc_data.csv');
