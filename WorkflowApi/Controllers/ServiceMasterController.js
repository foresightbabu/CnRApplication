var config = require('../appConfig');
var sql = require("mssql");
var errors = require('../Common/errorCodes');

// Insert User
exports.saveServiceMaster = function (req, res) {
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
                request.input('ServiceName', sql.NVarChar, postData.ServiceName)
                    .input('Description', sql.NVarChar, postData.Description)
                    .input('InitialManagerId', sql.BigInt, postData.InitialManagerId)
                    .input('CreatedBy', sql.BigInt, postData.CreatedBy)
                    .output('ServiceId', sql.BigInt)
                    .execute('[dbo].[Proc_ServicesMasterInsert]', (nerr, recordsets, returnValue) => {
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
                                        "data": { ServiceId: recordsets ? recordsets['output']['ServiceId'] : null }
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

// Update User
exports.updateServiceMaster = function (req, res) {
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
        else if (postData != undefined && postData['ServiceId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "ServiceId required",
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
                    request.input('ServiceId', sql.BigInt, postData.ServiceId)
                        .input('ServiceName', sql.NVarChar, postData.ServiceName)
                        .input('Description', sql.NVarChar, postData.Description)
                        .input('InitialManagerId', sql.BigInt, postData.InitialManagerId)
                        .input('ModifyBy', sql.BigInt, postData.ModifyBy)
                        .execute('[dbo].[Proc_ServicesMasterUpdate]', (nerr, recordsets, returnValue) => {
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
                                            "message": "Task Group updated successfully",
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
            sql.on('error', err => {
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

//Delete User
exports.deleteServiceMaster = function (req, res) {
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
        else if (postData != undefined && postData['ServiceId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "ServiceId required",
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
                    request.input('ServiceId', sql.BigInt, postData.ServiceId)
                        .input('ModifyBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_ServicesMasterDelete]', (nerr, recordsets, returnValue) => {
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
            sql.on('error', err => {
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


//Select User(s)
exports.getServiceMaster = function (req, res) {
    errorCodes = errors.errorCodes
    try {
        var ServiceId = req.query['ServiceId'];
        sql.connect(config.db).then(pool => {
            return pool.request()
                .input('ServiceId', sql.BigInt, ServiceId)
                .execute('[dbo].[Proc_ServicesMasterSelect]')
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
