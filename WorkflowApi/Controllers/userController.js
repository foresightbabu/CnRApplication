var config = require('../appConfig');
var sql = require("mssql");
var errors = require('../Common/errorCodes');

// Insert User
exports.saveUser = function (req, res) {
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
                request.input('Name', sql.NVarChar, postData.Name)
                    .input('ClientId', sql.BigInt, postData.ClientId)
                    .input('Username', sql.NVarChar, postData.Username)
                    .input('Password', sql.NVarChar, postData.Password)
                    .input('PasswordSalt', sql.NVarChar, postData.PasswordSalt)
                    .input('UserType', sql.Int, postData.UserType)
                    .input('EmailId', sql.NVarChar, postData.EmailId)
                    .input('CreatedBy', sql.BigInt, postData.CreatedBy)
                    .output('UserId', sql.BigInt)
                    .execute('[dbo].[Proc_UsersInsert]', (nerr, recordsets, returnValue) => {
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
                                        "data": { UserId: recordsets ? recordsets['output']['UserId'] : null }
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
exports.updateUser = function (req, res) {
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
        else if (postData != undefined && postData['UserId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "UserId required",
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
                    request.input('UserId', sql.BigInt, postData.UserId)
                        .input('Name', sql.NVarChar, postData.Name)
                        .input('ClientId', sql.BigInt, postData.ClientId)
                        .input('Username', sql.NVarChar, postData.Username)
                        .input('Password', sql.NVarChar, postData.Password)
                        .input('PasswordSalt', sql.NVarChar, postData.PasswordSalt)
                        .input('UserType', sql.Int, postData.UserType)
                        .input('EmailId', sql.NVarChar, postData.EmailId)
                        .input('ModifyBy', sql.BigInt, postData.ModifyBy)
                        .execute('[dbo].[Proc_UsersUpdate]', (nerr, recordsets, returnValue) => {
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
                                            "message": "User updated successfully",
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
exports.deleteUser = function (req, res) {
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
        else if (postData != undefined && postData['UserId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "UserId required",
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
                    request.input('UserId', sql.BigInt, postData.UserId)
                        .input('ModifyBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_UsersDelete]', (nerr, recordsets, returnValue) => {
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

//Block User
exports.blockUser = function (req, res) {
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
        else if (postData != undefined && postData['UserId'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "UserId required",
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
                    request.input('UserId', sql.BigInt, postData.UserId)
                        .input('ModifyBy', sql.BigInt, postData.ModifiedBy)
                        .execute('[dbo].[Proc_UsersBlock]', (nerr, recordsets, returnValue) => {
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
exports.getUsers = function (req, res) {
    errorCodes = errors.errorCodes
    try {
        var UserId = req.query['UserId'];
        sql.connect(config.db).then(pool => {
            return pool.request()
                .input('UserId', sql.BigInt, UserId)
                .execute('[dbo].[Proc_UsersSelect]')
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
