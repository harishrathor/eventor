const DBService = require('@modules/core/services/db.service');
const User = require('@db/models/user');
const { promisify } = require('util');

class UserDBService extends DBService {
    constructor() {
        super(User);
    }

    createUser(userData) {
        return this.model.mongoModel.create(userData);
    }

    getAllUsers(callback) {
        return this.model.mongoModel.find(callback);
    }
}

module.exports = new UserDBService;