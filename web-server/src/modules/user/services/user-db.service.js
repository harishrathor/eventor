const DBService = require('@modules/core/services/db.service');
const User = require('@db/models/user');

class UserDBService extends DBService {
    constructor() {
        super(User);
    }

}

module.exports = UserDBService;