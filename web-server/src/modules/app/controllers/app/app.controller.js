

class AppController {

    requestHandlerAction(req, res) {
        res.json({
            name: 'Harish Rathor'
        });
    }
}

module.exports = AppController;