const PATHS = require('./paths');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const expressSession = require('express-session');
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
        this.CONFIGS = require('@configs');
        this._registerMiddlwares();
        this._initRouting();
        this._connectDB();
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

    _connectDB() {
        const { makeConnection, getConnection } = require('@db');
        makeConnection()
        .then(() => {
            let sessionStore = null;
            if (this.CONFIGS.serverConfig.dbType == 'mysql') {
                const MySQLStore = require('express-mysql-session')(expressSession);
                sessionStore = new MySQLStore(this.CONFIGS.dbConfig);
            } else {
                const MongoStore = require('connect-mongo')(expressSession);
                sessionStore = new MongoStore({ db: getConnection() });
            }
            this.CONFIGS.sessionConfig.store = sessionStore;
            this.APP.use(expressSession(this.CONFIGS.sessionConfig));
        }).catch(err => {
            console.log(err);
        });
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

    callRequestHanlder(ControllerClass, methodName, ...args) {
        const controller = new ControllerClass();
        controller[methodName].apply(controller, args);
    }
}

var server = new Server();
global.SERVER = server;
server.initialize();
server.startServer();


