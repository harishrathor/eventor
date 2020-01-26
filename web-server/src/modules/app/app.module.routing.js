const moduleRouter = SERVER.EXPRESS.Router();
module.exports = (parentRouter) => {
    const controllerBasePath = '@modules/app/controllers';
    require(`${controllerBasePath}/app/app.controller.routing`);
    parentRouter.use('/app', moduleRouter);
};