const { MongoClient } = require('mongodb');
const { dbConfig } = require('@configs');

function getConnection() {
    if (global.SERVER.DB) {
        return global.SERVER.DB.CONNECTION;
    }
    return undefined;
}

function getDBClient() {
    if (global.SERVER.DB) {
        return global.SERVER.DB.DB_CLIENT;
    }
    return undefined;
}
let connectionPromise = null;
function makeConnection() {
    if (connectionPromise) {
        return connectionPromise;
    }
    connectionPromise = new Promise((resolve, reject) => {
        function onDBConnection(dbName, err, dbClient) {
            if (err) {
                reject(err);
            } else {
                const dbConnection = dbClient.db(dbName);
    
                const connection =  {
                    DB_CLIENT       : dbClient,
                    CONNECTION      : dbConnection
                };
                
                SERVER.DB = connection;
                console.log(`Successfully made DB connection to server.`);
                resolve(connection);
            }
        }
        MongoClient.connect(dbConfig.URL, onDBConnection.bind(dbConfig, dbConfig.DB_NAME)); 
    });
    return connectionPromise;
}

module.exports = {
    getConnection,
    getDBClient,
    makeConnection
}
;
