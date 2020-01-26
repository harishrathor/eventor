const PATHS = require('./paths');
const configs = require('@configs');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const app = express();



class Server {

    constructor() {
        this._serverInstance = null;
    }

    initialize() {
        this.PATHS = PATHS;
        this.APP = app;
        this.EXPRESS = express;
        this.ENV = process.env.NODE_ENV;
        this.CONFIGS = configs;
        this._registerMiddlwares();
        this._initRouting();
    }

    isDev() {
        return this.ENV === 'development';
    }

    isProduction() {
        return this.ENV === 'develprodopment';
    }

    isStaging() {
        return this.ENV === 'development';
    }

    _initRouting() {
        require('@routes');
    }

    _registerMiddlwares() {
        this.APP.use(this.EXPRESS.static(this.PATHS.CLIENT_ROOT));
        this.APP.use(this.EXPRESS.static(this.PATHS.CLIENT_ASSETS));
        this.APP.use(this.EXPRESS.static(this.PATHS.SERVER_ASSETS));
        this.APP.use(cookieParser());
        this.APP.use(compression());
        this.APP.use(helmet());
        this.APP.use(bodyParser.json());
        this.APP.use(bodyParser.urlencoded({extended: true}));
        if (this.isDev()) {
            this.APP.use(logger('dev'));
        }
        
        this.APP.use(cors({
            origin: function(origin, callback) {
                // allow requests with no origin 
                // (like mobile apps or curl requests)
                if(!origin) return callback(null, true);
                /* if(SERVER_CONFIG.ALLOWED_ORIGINS.indexOf(origin) === -1){
                var msg = 'The CORS policy for this site does not ' +
                            'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                } */
                return callback(null, true);
            }
        }));
    }

    startServer() {
        this._serverInstance = this.APP.listen(process.env.PORT, s => console.log(`Server (${this.ENV}) started at port ${process.env.PORT}.`));
    }

    stopServer() {
        if (this._serverInstance) {
            this._serverInstance.close();
        }
    }

    all(req, res, next) { //Called for all request.
        next(req, res);
    }
}

var server = new Server();
global.SERVER = server;
server.initialize();
server.startServer();


