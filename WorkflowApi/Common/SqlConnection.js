var config = require('../appConfig');
var sql = require("mssql");

exports.getConnection = function () {
    const sqlConfig = (process.env.NODENV == "DEV" ? config.app.dev.db : config.app.prod.db);
    return new Promise((resolve, reject) => {
        sql.connect(sqlConfig).then(pool => {
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

exports.closeConnectionAndReject = function (sql, reject, error) {
    //console.log(error);
    sql.close();
    reject(error);

}

exports.closeConnectionAndResolve = function (sql, resolve, data) {
    sql.close();
    resolve(data);
}
