const DBService = require('@modules/app/services/db.service');
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

module.exports = AppController;