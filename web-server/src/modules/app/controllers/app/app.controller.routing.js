const AppController = require('./app.controller');
const controllerRouter = SERVER.EXPRESS.Router();
module.exports = (parentRouter) => {
    controllerRouter
    .route('/request-handler')
    .get(new AppController().requestHandlerAction);

    parentRouter.use('/app', controllerRouter);
};