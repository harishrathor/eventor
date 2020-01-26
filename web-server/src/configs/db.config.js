
let dbConfig = {};

if(global.SERVER.isDev()) {
    dbConfig = {
        PORT: 27017,
        HOSTNAME: 'localhost',
        PROTOCOL: 'mongodb',
        DB_NAME: 'mean-crud'
    };
    dbConfig.URL = dbConfig.PROTOCOL + '://' + dbConfig.HOSTNAME + ':' + dbConfig.PORT;
} else {
    console.log(`DB configuration not defined for '${SERVER.ENV}' environment.`);
}

module.exports = dbConfig;