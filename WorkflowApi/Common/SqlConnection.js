var config = require('../appConfig');
var sql = require("mssql");

exports.getConnection = function () {
    return new Promise((resolve, reject) => {
        sql.connect(config.db).then(pool => {
            resolve(pool);
        }).catch(err => {
            reject(err);
        });
    });

}

sql.on('error', err => {
    sql.close();
    next(err);
});