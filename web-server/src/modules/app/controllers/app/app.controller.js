const DBService = require('@modules/app/services/db.service');
class AppController {

    requestHandlerAction(req, res) {
        const dbService = new DBService();
        dbService.insertUser().then((response) => {
            console.log('User Created.', response);
            res.send({success: true, message: 'User Created.', data: response});
        }).catch(err => {
            console.log('Error in creating user:', err);
            res.send({success: false, message: 'Error in insertig user.', data: err});
        });
    }
}

module.exports = AppController;