const express = require('express');
const oracledb = require('oracledb');
const http = require('http');
const socketIO = require('socket.io');
const { exec } = require('child_process');
const cron = require('node-cron');
const csvParser = require('csv-parser');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

// Middleware
app.use(express.json());

const dbConfig = {
    user: 'your_db_user',
    password: 'your_db_password',
    connectString: 'your_db_connect_string',
};

// Function to process AppD data from events.csv file
function processEventsData(eventsData) {
    // Group the data by unique name and process each group
    const groupedData = {};
    
    eventsData.forEach(row => {
        const name = row.Name;
        if (!groupedData[name]) {
            groupedData[name] = [];
        }
        groupedData[name].push(row);
    });

    // Process and transform each group
    const processedData = [];

    for (const name in groupedData) {
        const group = groupedData[name];
        const latestRow = group[0]; // Assumes data is sorted with most recent at the top
        
        let status = '';
        if (latestRow.Severity === 'INFO') {
            status = 'Working';
        } else if (latestRow.Severity === 'WARN') {
            status = 'Warning';
        } else if (latestRow.Severity === 'ERROR') {
            status = 'Error';
        }

        const error = latestRow.Summary + (latestRow.Description ? ': ' + latestRow.Description : '');

        processedData.push({
            'Time': latestRow['Event Time'],
            'Name': name,
            'Status': status,
            'Application': latestRow.Solution,
            'Error': error,
        });
    }

    return processedData;
}

// Data processing and transformation function for business_transactions.csv
function processBusinessTransactionsData(bizTransData) {
    const processedData = bizTransData.map(row => ({
        'Time': row.Time,
        'Name': row.Biz_trans,
        'Status': row.Severity,
        'Application': row.Application,
        'Error': row.Description,
    }));

    return processedData;
}

function mergeAndSortData(eventsData, bizTransData) {
    const mergedData = [...eventsData, ...bizTransData]
        .sort((a, b) => new Date(b.Time) - new Date(a.Time));

    const groupedData = mergedData.reduce((result, row) => {
        const key = row.Application;
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(row);
        return result;
    }, {});

    return groupedData;
}

// Schedule cron job for data collection and processing
// Schedule cron job for data collection and processing
cron.schedule('*/15 * * * *', async () => {
    try {
        // Execute your AppD data collection script
        exec('python appd.py', (error, stdout, stderr) => {
            if (error) {
                console.error(`AppD script execution error: ${error}`);
            } else {
                console.log(`AppD script executed successfully: ${stdout}`);

                // Process the events.csv file
                const eventsData = [];
                fs.createReadStream('path_to_your_events_csv_file')
                    .pipe(csvParser())
                    .on('data', (row) => {
                        eventsData.push(row);
                    })
                    .on('end', () => {
                        // Process the business_transactions.csv file
                        const bizTransData = [];
                        fs.createReadStream('path_to_your_business_transactions_csv_file')
                            .pipe(csvParser())
                            .on('data', (row) => {
                                bizTransData.push(row);
                            })
                            .on('end', async () => {
                                // Process and truncate-and-load the database with merged data
                                const processedEventsData = processEventsData(eventsData);
                                const processedBizTransData = processBusinessTransactionsData(bizTransData);

                                const appdData = mergeAndSortData(processedEventsData, processedBizTransData);

                                const connection = await oracledb.getConnection(dbConfig);

                                // Truncate the table to remove existing data
                                const truncateQuery = 'TRUNCATE TABLE your_merged_table';
                                await connection.execute(truncateQuery);

                                // Insert the merged and sorted data into the database
                                const insertQuery = 'INSERT INTO your_merged_table (Time, Name, Status, Application, Error) VALUES (:time, :name, :status, :application, :error)';
                                for (const row of appdData) {
                                    await connection.execute(insertQuery, {
                                        time: row.Time,
                                        name: row.Name,
                                        status: row.Status,
                                        application: row.Application,
                                        error: row.Error
                                    });
                                }

                                await connection.close();
                                console.log('Data processing and update completed successfully');

                            });
                    });
            }
        });
    } catch (error) {
        console.error('Data processing and update error:', error);
    }
});

// API route to fetch merged and sorted data (server node list) from the database
app.get('/api/server-node-list', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const query = 'SELECT * FROM your_merged_table'; // Adjust as needed
        const result = await connection.execute(query);
        await connection.close();

        // Process the result to match the frontend data structure
        const mergedAndSortedData = mergeAndSortData([], []); // Placeholder, fetch data from the database here
        res.json(mergedAndSortedData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/api/server-node-list', async (req, res) => {
    try {
        const mcData = await parseCsv('mc_data.csv');
        const appdData = await parseCsv('appd_data.csv');
        const guiData = await parseCsv('gui_data.csv');
        
        const mergedData = mergeData(mcData, appdData, guiData);

        res.json(mergedData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Helper function to parse a CSV file and return a Promise with the parsed data
function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

// Helper function to merge data from three arrays
function mergeData(array1, array2, array3) {
    const merged = [];

    for (let i = 0; i < array1.length; i++) {
        merged.push({
            ...array1[i],
            ...array2[i],
            ...array3[i]
        });
    }

    return merged;
}