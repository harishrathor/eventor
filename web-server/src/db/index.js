
const { dbConfig, serverConfig } = require('@configs');


/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://harishrathor:<password>@cluster0-90bt6.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */
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
      /*  function onDBConnection(dbName, err, dbClient) {
            if (err) {
                reject(err);
            } else {
                const dbConnection = dbClient.db(dbName);
    
                const connection =  {
                    DB_CLIENT       : dbClient,
                    CONNECTION      : dbConnection
                };
                
                SERVER.DB = connection;
                console.log(`Successfully made DB(MongoDB) connection to server.`);
                resolve(connection);
            }
        }
        const { MongoClient } = require('mongodb');
        MongoClient.connect(dbConfig.url, onDBConnection.bind(dbConfig, dbConfig.database));  */

        function onDBConnection(err) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
        }

        const mongoose = require('mongoose');
        mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true}, onDBConnection);
        const db = mongoose.connection;
        db.on('error', err => {
            console.log('Connection error:', err);
        });
        db.once('open', function() {
            const connection =  {
                DB_CLIENT       : db,
                CONNECTION      : mongoose
            };
            
            SERVER.DB = connection;
            console.log(`Successfully made DB(MongoDB) connection to server.`);
            resolve(connection);
        });

    });
    return connectionPromise;
}

function makeMySQLConnection() {
    if (connectionPromise) {
        return connectionPromise;
    }
    connectionPromise = new Promise((resolve, reject) => {
        function onDBConnection(err) {
            if (err) {
                console.error('error in connecting mysql db:', err);
                reject(err);
            } else {
                const connectionObj =  {
                    DB_CLIENT       : connection,
                    CONNECTION      : connection
                };
                SERVER.DB = connectionObj;
                console.log(`Successfully made DB (MySQL) connection to server.`);
                resolve(connection);
            }
        }
        const mysql = require('mysql');
        const connection = mysql.createConnection(dbConfig); 
        connection.connect(onDBConnection);
    });
    return connectionPromise;
}

module.exports = {
    getConnection,
    getDBClient,
    makeConnection: (serverConfig.dbType == 'mysql' ? makeMySQLConnection : makeConnection)
}
;
