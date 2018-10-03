var config = require('../appConfig');
var sql = require("mssql");
var errors = require('../Common/errorCodes');

// Insert Clients
exports.saveClient = function (req, res) {
    errorCodes = errors.errorCodes
    var postData = req.body;
    try {
        if (postData == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "",
                "data": null
            });
        }

        sql.connect(config.db).then(pool => {
            const transaction = new sql.Transaction(pool)
            transaction.begin(err => {
                let rolledBack = false
                transaction.on('rollback', aborted => {
                    // emited with aborted === true  
                    rolledBack = true
                });
                const request = new sql.Request(transaction);
                request.input('ClientName', sql.NVarChar, postData.ClientName)
                    .input('Address', sql.NVarChar, postData.Address)
                    .input('City', sql.NVarChar, postData.City)
                    .input('State', sql.NVarChar, postData.State)
                    .input('Country', sql.NVarChar, postData.Country)
                    .input('NoofUsersAllowed', sql.Int, postData.NoofUsersAllowed)
                    .input('ApproverId', sql.BigInt, postData.ApproverId)
                    .input('CreatedBy', sql.BigInt, postData.CreatedBy)
                    .output('ClientId', sql.BigInt)
                    .execute('[dbo].[Proc_ClientsInsert]', (nerr, recordsets, returnValue) => {
                        if (nerr) {
                            transaction.rollback(err => {
                                sql.close();
                                res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                                res.json({
                                    "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                                    "message": nerr,
                                    "data": null
                                });
                            });
                        }
                        else {
                            transaction.commit(err => {
                                if (err) {
                                    if (!rolledBack) {
                                        transaction.rollback(err => {
                                            sql.close();
                                            res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                                            res.json({
                                                "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                                                "message": err.message,
                                                "data": null
                                            });
                                        });
                                    }
                                } else {
                                    sql.close();
                                    res.status(errorCodes.SUCCESS.Value);
                                    res.json({
                                        "status": errorCodes.SUCCESS.Text,
                                        "message": "",
                                        "data": { ServiceId: recordsets ? recordsets['output']['ClientId'] : null }
                                    });
                                }
                            });
                        }

                    });
            });
        }).catch(err => {
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

//Select Client(s)
exports.getClients = function (req, res) {
    errorCodes = errors.errorCodes
    try {
        var ClientId = req.query['ClientId'];
        sql.connect(config.db).then(pool => {
            return pool.request()
                .input('ClientId', sql.BigInt, ClientId)
                .execute('[dbo].[Proc_ClientsSelect]')
        }).then(result => {
            sql.close();
            res.status(errorCodes.SUCCESS.Value);
            res.json({
                "status": errorCodes.SUCCESS.Text,
                "message": "",
                "data": result.recordset
            });
        }).catch(err => {
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

//Update Client
exports.updateClient = function (req, res) {
    errorCodes = errors.errorCodes
    var postData = req.body;
    try {

        if (postData == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "No parameters received",
                "data": null
            });
        }
        else if (postData != undefined && postData['ClientId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "ClientId required",
                "data": null
            });
        }
        else {

            sql.connect(config.db).then(pool => {
                const transaction = new sql.Transaction(pool)
                transaction.begin(err => {
                    let rolledBack = false
                    transaction.on('rollback', aborted => {
                        // emited with aborted === true  
                        rolledBack = true
                    });
                    const request = new sql.Request(transaction);
                    request.input('ClientId', sql.BigInt, postData.ClientId)
                        .input('ClientName', sql.NVarChar, postData.ClientName)
                        .input('Address', sql.NVarChar, postData.Address)
                        .input('City', sql.NVarChar, postData.City)
                        .input('State', sql.NVarChar, postData.State)
                        .input('Country', sql.NVarChar, postData.Country)
                        .input('NoofUsersAllowed', sql.Int, postData.NoofUsersAllowed)
                        .input('ApproverId', sql.BigInt, postData.ApproverId)
                        .input('IsBlocked', sql.Bit, postData.IsBlocked)
                        .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_ClientsUpdate]', (nerr, recordsets, returnValue) => {
                            if (nerr) {
                                transaction.rollback(err => {
                                    sql.close();
                                    res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                                    res.json({
                                        "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                                        "message": nerr.message,
                                        "data": null
                                    });
                                });
                            }
                            else {
                                transaction.commit(err => {
                                    if (err) {
                                        if (!rolledBack) {
                                            transaction.rollback(err => {
                                                sql.close();
                                                res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                                                res.json({
                                                    "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                                                    "message": err.message,
                                                    "data": null
                                                });
                                            });
                                        }
                                    } else {
                                        sql.close();
                                        res.status(errorCodes.SUCCESS.Value);
                                        res.json({
                                            "status": errorCodes.SUCCESS.Text,
                                            "message": "Updated successfully",
                                            "data": null
                                        });
                                    }
                                });
                            }

                        });
                });
            }).catch(err => {
                sql.close();
                res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                res.json({
                    "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                    "message": err.message,
                    "data": null
                });
            });
        }

    } catch (err) {
        res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
        res.json({
            "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
            "message": err.message,
            "data": null
        });
    }

}

//Delete Client
exports.deleteClient = function (req, res) {
    errorCodes = errors.errorCodes
    var postData = req.body;
    try {

        if (postData == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "",
                "data": null
            });
        }
        else if (postData["ClientId"] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "ClientId required",
                "data": null
            });
        }
        else {

            sql.connect(config.db).then(pool => {
                const transaction = new sql.Transaction(pool)
                transaction.begin(err => {
                    let rolledBack = false
                    transaction.on('rollback', aborted => {
                        // emited with aborted === true  
                        rolledBack = true
                    });
                    const request = new sql.Request(transaction);
                    request.input('ClientId', sql.BigInt, postData.ClientId)
                        .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_ClientsDelete]', (nerr, recordsets, returnValue) => {
                            if (nerr) {
                                transaction.rollback(err => {
                                    sql.close();
                                    res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                                    res.json({
                                        "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                                        "message": nerr.message,
                                        "data": null
                                    });
                                });
                            }
                            else {
                                transaction.commit(err => {
                                    if (err) {
                                        if (!rolledBack) {
                                            transaction.rollback(err => {
                                                sql.close();
                                                res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                                                res.json({
                                                    "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                                                    "message": err.message,
                                                    "data": null
                                                });
                                            });
                                        }
                                    } else {
                                        sql.close();
                                        res.status(errorCodes.SUCCESS.Value);
                                        res.json({
                                            "status": errorCodes.SUCCESS.Text,
                                            "message": "Deleted successfully",
                                            "data": null
                                        });
                                    }
                                });
                            }

                        });
                });
            }).catch(err => {
                sql.close();
                res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                res.json({
                    "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                    "message": err.message,
                    "data": null
                });
            });
        }

    } catch (err) {
        res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
        res.json({
            "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
            "message": err.message,
            "data": null
        });
    }
}

//Block Client
exports.blockClient = function (req, res) {
    errorCodes = errors.errorCodes
    var postData = req.body;
    try {

        if (postData == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "",
                "data": null
            });
        }

        sql.connect(config.db).then(pool => {
            const transaction = new sql.Transaction(pool)
            transaction.begin(err => {
                let rolledBack = false
                transaction.on('rollback', aborted => {
                    // emited with aborted === true  
                    rolledBack = true
                });
                const request = new sql.Request(transaction);
                request.input('ClientId', sql.BigInt, postData.ClientId)
                    .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                    .execute('[dbo].[Proc_ClientsBlock]', (nerr, recordsets, returnValue) => {
                        if (nerr) {
                            transaction.rollback(err => {
                                sql.close();
                                res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                                res.json({
                                    "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                                    "message": nerr.message,
                                    "data": null
                                });
                            });
                        }
                        else {
                            transaction.commit(err => {
                                if (err) {
                                    if (!rolledBack) {
                                        transaction.rollback(err => {
                                            sql.close();
                                            res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                                            res.json({
                                                "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                                                "message": err.message,
                                                "data": null
                                            });
                                        });
                                    }
                                } else {
                                    sql.close();
                                    res.status(errorCodes.SUCCESS.Value);
                                    res.json({
                                        "status": errorCodes.SUCCESS.Text,
                                        "message": "Blocked successfully",
                                        "data": null
                                    });
                                }
                            });
                        }

                    });
            });
        }).catch(err => {
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


sql.on('error', err => {
    if (sql)
        sql.close();
    res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
    res.json({
        "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
        "message": err.message,
        "data": null
    });
});