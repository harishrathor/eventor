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
       /*  dbConfig = {
            port: 27017,
            host: 'localhost',
            protocol: 'mongodb',
            database: 'mean-crud'
        };
        dbConfig.url = dbConfig.protocol + '://' + dbConfig.host + ':' + dbConfig.port; */
       
        dbConfig.url = "mongodb+srv://harishrathor:${{secrets.MONGO_SERVER_PASSWORD_1}}@cluster0-90bt6.mongodb.net/eventor?retryWrites=true&w=majority";
    }
} else {
    dbConfig.url = "mongodb+srv://harishrathor:${{secrets.MONGO_SERVER_PASSWORD_1}}@cluster0-90bt6.mongodb.net/eventor?retryWrites=true&w=majority";
    
}

module.exports = dbConfig;
