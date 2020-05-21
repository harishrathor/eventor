
const mongoose = require('mongoose');

class BaseModel {
    constructor(schemaDef, modelName) {
        this.schema = new mongoose.Schema(schemaDef);
        this.configureSchema();
        this.mongoModel = mongoose.model(modelName, userSchema);
        this.name = modelName;
    }

    configureSchema() {
        
    }
    
}

module.exports = BaseModel;