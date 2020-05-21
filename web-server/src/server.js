const PATHS = require('./paths');

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
            console.log('DB Connection done.');
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
        this._serverInstance = this.APP.listen(process.env.PORT, s => console.log(`Server (${this.ENV}) started at port ${process.env.PORT}. Process id ${process.pid} and Parent process id ${process.ppid}`));
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

function startServer() {
    var server = new Server();
    global.SERVER = server;
    server.initialize();
    server.startServer();
}
/* 
const cluster = require('cluster');
const os = require('os');
const noOfCpus = os.cpus().length;

if (cluster.isMaster) {
    process.on('message', (data) => {
        console.log('Message recieved in Master:', data);
    });
    console.log('Master Started with pid:', process.pid);
    for (let i = 0; i < noOfCpus; i++) {
        const worker = cluster.fork();
        worker.on('message', data => console.log('Message recieved from ', worker.process.pid));
    }
} else { */
    startServer();
   /*  console.log('Worker Process started with pid:', process.pid);
} */



