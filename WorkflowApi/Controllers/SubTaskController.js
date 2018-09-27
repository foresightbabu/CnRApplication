var config = require('../appConfig');
var sql = require("mssql");
var errors = require('../Common/errorCodes');

// Insert User
exports.saveSubTaskMaster = function (req, res) {
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
                request.input('ServiceId', sql.BigInt, postData.ServiceId)
                    .input('TaskName', sql.NVarChar, postData.TaskName)
                    .input('Description', sql.NVarChar, postData.Description)
                    .input('CreatedBy', sql.BigInt, postData.CreatedBy)
                    .output('SubTaskId', sql.BigInt)
                    .execute('[dbo].[Proc_ServicesSubTaskMasterInsert]', (nerr, recordsets, returnValue) => {
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
                                        "data": { SubTaskId: recordsets ? recordsets['output']['SubTaskId'] : null }
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
exports.updateSubTaskMaster = function (req, res) {
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
        else if (postData != undefined && postData['SubTaskId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "SubTaskId required",
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
                    request.input('SubTaskId', sql.BigInt, postData.SubTaskId)
                        .input('ServiceId', sql.BigInt, postData.ServiceId)
                        .input('TaskName', sql.NVarChar, postData.TaskName)
                        .input('Description', sql.NVarChar, postData.Description)
                        .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_ServicesSubTaskMasterUpdate]', (nerr, recordsets, returnValue) => {
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
                                            "message": "Subtask updated successfully",
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
exports.deleteSubTaskMaster = function (req, res) {
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
        else if (postData != undefined && postData['SubTaskId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "SubTaskId required",
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
                    request.input('SubTaskId', sql.BigInt, postData.SubTaskId)
                        .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_ServicesSubTaskMasterDelete]', (nerr, recordsets, returnValue) => {
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
exports.getSubTaskMaster = function (req, res) {
    errorCodes = errors.errorCodes
    try {
        var SubtaskId = req.query['SubTaskId'];
        var ServiceId = req.query['ServiceId'];
        sql.connect(config.db).then(pool => {
            return pool.request()
                .input('SubtaskId', sql.BigInt, SubtaskId)
                .input('ServiceId', sql.BigInt, ServiceId)
                .execute('[dbo].[Proc_ServicesSubTaskMasterSelect]')
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
