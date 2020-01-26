const AppController = require('./app.controller');
const controllerRouter = SERVER.EXPRESS.Router();

function handler(methodName, req, res) {
    SERVER.callRequestHanlder(AppController, methodName, req, res);
}

module.exports = (parentRouter) => {
    controllerRouter
    .route('/create-user')
    .get(handler.bind(undefined, 'createUserAction'));
    controllerRouter
    .route('/users')
    .get(handler.bind(undefined, 'getUsersAction'));

    parentRouter.use('/app', controllerRouter);
};