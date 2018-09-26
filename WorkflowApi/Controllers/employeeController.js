var config = require('../appConfig');
var sql = require("mssql");

exports.getEmployees = function (req, res) {
    sql.connect(config.db).then(pool => {
        return pool.request()
            .input('EmpNo', sql.Int, 511090)
            .execute('[dbo].[Proc_Employee_GetDetails]')
    }).then(result => {
        sql.close();
        res.status(200);
        res.json(result.recordset);
    }).catch(err => {
        sql.close();
        res.status(500);
        res.send({ error: err.message });
    });
    sql.on('error', err => {
        sql.close();
        res.status(500);
        res.send({ error: "Error while connecting to database. Message : " + err.message });
    });
}

//module.exports = employeeapp;