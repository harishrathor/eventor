const { serverConfig } = require('@configs');
let dbConfig = {};

if(global.SERVER.isDev()) {
    if (serverConfig.dbType == 'mysql') {
        dbConfig ={
            host     : 'localhost',
            user     : 'root',
            password : 'indian.19',
            database : 'mean',
            insecure: true
          };
    } else {
        dbConfig = {
            port: 27017,
            host: 'localhost',
            protocol: 'mongodb',
            database: 'mean-crud'
        };
        dbConfig.url = dbConfig.protocol + '://' + dbConfig.host + ':' + dbConfig.port;
    }
} else {
    console.log(`DB configuration not defined for '${SERVER.ENV}' environment.`);
}

module.exports = dbConfig;