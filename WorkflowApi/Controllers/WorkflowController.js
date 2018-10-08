var config = require('../appConfig');
var sql = require("mssql");
var errors = require('../Common/errorCodes');

// Insert User
exports.saveWorkflow = function (req, res) {
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
                    .input('WorkflowName', sql.NVarChar, postData.WorkflowName)
                    .input('Description', sql.NVarChar, postData.Description)
                    .input('CreatedBy', sql.BigInt, postData.CreatedBy)
                    .output('WorkflowId', sql.BigInt)
                    .execute('[dbo].[Proc_WorkflowInsert]', (nerr, recordsets, returnValue) => {
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
                                        "data": { WorkflowId: recordsets ? recordsets['output']['WorkflowId'] : null }
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

// Update User
exports.updateWorkflow = function (req, res) {
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
        else if (postData != undefined && postData['WorkflowId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "WorkflowId required",
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
                    request.input('WorkflowId', sql.BigInt, postData.WorkflowId)
                        .input('ServiceId', sql.BigInt, postData.ServiceId)
                        .input('WorkflowName', sql.NVarChar, postData.WorkflowName)
                        .input('Description', sql.NVarChar, postData.Description)
                        .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_WorkflowUpdate]', (nerr, recordsets, returnValue) => {
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
                                            "message": "Workflow updated successfully",
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

//Delete User
exports.deleteWorkflow = function (req, res) {
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
        else if (postData != undefined && postData['WorkflowId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "WorkflowId required",
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
                    request.input('WorkflowId', sql.BigInt, postData.WorkflowId)
                        .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_WorkflowDelete]', (nerr, recordsets, returnValue) => {
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


//Select User(s)
exports.getWorkflow = function (req, res) {
    errorCodes = errors.errorCodes
    try {
        var ServiceId = req.query['ServiceId'];
        var WorkflowId = req.query['WorkflowId'];
        sql.connect(config.db).then(pool => {
            return pool.request()
                .input('WorkflowId', sql.BigInt, WorkflowId)
                .input('ServiceId', sql.BigInt, ServiceId)
                .execute('[dbo].[Proc_WorkflowSelect]')
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

sql.on('error', err => {
    sql.close();
    res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
    res.json({
        "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
        "message": err.message,
        "data": null
    });
});