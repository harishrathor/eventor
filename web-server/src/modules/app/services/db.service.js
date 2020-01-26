const { getConnection } = require('@db');

class DBService {

    _runMongoQuery(collectionName, collectionMethod, ...methodArgs) {
        return new Promise((resolve, reject) => {
            getConnection().collection(collectionName, (err, collection) => {
                if (err) {
                    console.log('Error in getting collection.', err);
                } else {
                    if (!methodArgs) {
                        methodArgs = [];
                    }
                    methodArgs.push(resolve);
                    collection[collectionMethod].apply(collection, methodArgs);
                }
            });
        });
    } 

    _runSQLQuery(query) {
        return new Promise((resolve, reject) => {
            getConnection().query(query, (err, ...restArgs) => {
                console.log(err);
                if (err) {
                    reject(err);
                } else {
                    resolve(err, ...restArgs);
                }
            });
        });
    }
    
    runQuery(...args) {
        if (SERVER.CONFIGS.serverConfig.dbType == 'mysql') {
            return this._runSQLQuery.apply(this, args);
        } else {
            return this._runMongoQuery.apply(this, args);
        }
    }

    insertUser() {
        if (SERVER.CONFIGS.serverConfig.dbType == 'mysql') {
            return this.runQuery(`insert into users(firstName, lastName, age) values('Harish', 'Rathor', 23)`);
        } else {
            return this.runQuery('users', 'insertOne', {
                firstName: 'Harish',
                lastName: 'Harish Rathor'
            });
        }
    }
}

module.exports = DBService;