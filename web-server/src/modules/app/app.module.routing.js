const moduleRouter = SERVER.EXPRESS.Router();
module.exports = (parentRouter) => {
    const controllerBasePath = '@modules/app/controllers';
    require(`${controllerBasePath}/app/app.controller.routing`)(moduleRouter);
    parentRouter.use('/app', moduleRouter);
};