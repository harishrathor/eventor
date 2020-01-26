const DBService = require('@modules/app/services/db.service');
class AppController {

    requestHandlerAction(req, res) {
        const dbService = new DBService();
        dbService.insertUser().then((err, resPonse) => {
            console.log(resPonse);
            if (err) {
                res.send({message: 'Error in insertig user.'});
            } else {
                res.send({message: 'User Created.'});
            }
        });
    }
}

module.exports = AppController;