/* const DBService = require('@modules/app/services/db.service');
class AppController {

    constructor() {
        this.dbService = new DBService();
    }

    createUserAction(req, res) {
        this.dbService.insertUser().then((response) => {
            res.send({success: true, message: 'User Created.', data: response});
        }).catch(err => {
            console.log('Error in creating user:', err);
            res.send({success: false, message: 'Error in insertig user.', data: err});
        });
    }

    getUsersAction(req, res) {
        this.dbService.getUsers().then((response) => {
            res.send({success: true, message: '', data: response});
        }).catch(err => {
            console.log('Error in creating user:', err);
            res.send({success: false, message: 'Error in fetching users.', data: err});
        });
    } 
}

module.exports = AppController; */

const userDBService = require('@modules/user/services/user-db.service');
class UserController {
    constructor() {
        this.dbService = userDBService;
    }

    createUserAction(req, res) {
       /*  this.dbService.insertUser().then((response) => {
            res.send({success: true, message: 'User Created.', data: response});
        }).catch(err => {
            console.log('Error in creating user:', err);
            res.send({success: false, message: 'Error in insertig user.', data: err});
        }); */
        this.dbService.createUser({name: 'Harish Rathor'}).then(userInstance => {
            console.log('Created data', userInstance);           
            res.json(userInstance).end(); 
        }, err => {
            console.log(err);
            res.status(500).end();
        });
    }

    allAction(req, res) {
       /*  this.dbService.getUsers().then((response) => {
            res.send({success: true, message: '', data: response});
        }).catch(err => {
            console.log('Error in creating user:', err);
            res.send({success: false, message: 'Error in fetching users.', data: err});
        }); */
        this.dbService.getAllUsers().then((dataArr) => {
            console.log('Data', dataArr);           
            res.json(dataArr).end();
            
        }, err => {
            console.log(err);
            res.status(500).end();
        });
    } 
}

module.exports = new UserController;