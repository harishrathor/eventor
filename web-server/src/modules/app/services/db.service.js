const { getConnection } = require('@db');

class DBService {

    _runQuery(collectionName, collectionMethod, ...methodArgs) {
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

    insertUser() {
        return this._runQuery('users', 'insertOne', {
            firstName: 'Harish',
            lastName: 'Harish Rathor'
        });
    }
}

module.exports = DBService;