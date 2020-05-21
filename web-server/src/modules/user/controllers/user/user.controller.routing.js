const express = require('express');
const UserController = require('./user.controller');
const controllerRouter = express.Router();

function handler(methodName, req, res) {
    console.log('This request handled by ', process.pid, ' whose parent is ', process.ppid);
    SERVER.callRequestHanlder(UserController, methodName, req, res);
}

module.exports = (parentRouter) => {
   /*  controllerRouter
    .route('/create-user')
    .get(handler.bind(undefined, 'createUserAction'));
    controllerRouter
    .route('/users')
    .get(handler.bind(undefined, 'getUsersAction'));

    parentRouter.use('/app', controllerRouter); */
};