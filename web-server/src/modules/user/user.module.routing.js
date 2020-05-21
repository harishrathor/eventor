const express = require('express');
const moduleRouter = express.Router();
module.exports = (parentRouter) => {
    const controllerBasePath = '@modules/user/controllers';
    require(`${controllerBasePath}/user/user.controller.routing`)(moduleRouter);
    parentRouter.use('/user', moduleRouter);
};