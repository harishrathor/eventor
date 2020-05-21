const BaseModel = require('./base-modal');

const schemaDef = {
    name: String
};

class User extends BaseModel {
    constructor() {
        super(schemaDef, 'User');
    }
}

module.exports = new User;