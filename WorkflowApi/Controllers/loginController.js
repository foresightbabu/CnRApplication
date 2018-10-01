var config = require('../appConfig');
var sql = require("mssql");
var errors = require('../Common/errorCodes');

exports.validateLogin = function (req, res) {
    errorCodes = errors.errorCodes
    var postData = req.body;
    try {
        if (postData == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "Username and Password required",
                "data": null
            });
        }
        sql.connect(config.db).then(pool => {
            return pool.request()
                .input('Username', sql.NVarChar, postData.Username)
                .input('Password', sql.NVarChar, postData.Password)
                .execute('[dbo].[Proc_UsersValidation]')
        }).then(result => {
            sql.close();
            if (result.recordset.length > 0) {
                res.status(errorCodes.SUCCESS.Value);
                res.json({
                    "status": errorCodes.SUCCESS.Text,
                    "message": "",
                    "data": result.recordset[0]
                });
            }
            else {
                res.status(errorCodes.UNAUTHORIZED.Value);
                res.json({
                    "status": errorCodes.UNAUTHORIZED.Text,
                    "message": "Invalid credentials",
                    "data": null
                });
            }
        }).catch(err => {
            sql.close();
            res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
            res.json({
                "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                "message": err.message,
                "data": null
            });
        });
        sql.on('error', err => {
            sql.close();
            res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
            res.json({
                "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                "message": err.message,
                "data": null
            });
        });

    } catch (err) {
        res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
        res.json({
            "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
            "message": err.message,
            "data": null
        });
    }
}