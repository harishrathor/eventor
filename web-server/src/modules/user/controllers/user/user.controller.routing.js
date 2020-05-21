const express = require('express');
const userController = require('./user.controller');
const controllerRouter = express.Router();

function handler(methodName, req, res) {
   /*  console.log('This request handled by ', process.pid, ' whose parent is ', process.ppid);
    SERVER.callRequestHanlder(UserController, methodName, req, res); */
    userController[methodName](req, res);
}

module.exports = (parentRouter) => {
    controllerRouter
    .route('/create')
    .get(handler.bind(undefined, 'createUserAction'));
    controllerRouter
    .route('/all')
    .get(handler.bind(undefined, 'allAction'));

    parentRouter.use('/user', controllerRouter);
};