const express = require('express');
const moduleRouter = express.Router();
module.exports = (parentRouter) => {
    /* const controllerBasePath = '@modules/app/controllers';
    require(`${controllerBasePath}/app/app.controller.routing`)(moduleRouter);
    parentRouter.use('/app', moduleRouter); */
};