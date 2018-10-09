var sql = require("mssql");
var sqlConnection = require('../Common/SqlConnection');

exports.saveServicesFormControls = function (postData) {
    return new Promise((resolve, reject) => {
        sqlConnection.getConnection().then(pool => {
            const transaction = new sql.Transaction(pool)
            transaction.begin(err => {
                let rolledBack = false
                transaction.on('rollback', aborted => {
                    rolledBack = true
                });
                const request = new sql.Request(transaction);
                request.input('ServiceId', sql.BigInt, postData.ServiceId)
                    .input('FormControlId', sql.BigInt, postData.FormControlId)
                    .input('LableName', sql.NVarChar, postData.LableName)
                    .input('PlaceholderText', sql.NVarChar, postData.PlaceholderText)
                    .input('Order', sql.Int, postData.Order)
                    .input('NewLineBeforeThis', sql.Bit, postData.NewLineBeforeThis)
                    .input('NewLineAfterThis', sql.Bit, postData.NewLineAfterThis)
                    .input('IsMandatory', sql.Bit, postData.IsMandatory)
                    .input('IsCommon', sql.Bit, postData.IsCommon)
                    .input('CreatedBy', sql.BigInt, postData.CreatedBy)
                    .output('ServicesFormControlsId', sql.BigInt)
                    .execute('[dbo].[Proc_ServicesFormControlsInsert]', (nerr, recordsets, returnValue) => {
                        if (nerr) {
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                    sqlConnection.closeConnectionAndReject(sql, reject, nerr);
                                });
                            }
                        }
                        else {
                            transaction.commit(err => {
                                if (err) {
                                    if (!rolledBack) {
                                        transaction.rollback(err => {
                                            sqlConnection.closeConnectionAndReject(sql, reject, err);
                                        });
                                    }
                                }
                                else {
                                    sqlConnection.closeConnectionAndResolve(sql, resolve, { ServicesFormControlsId: recordsets['output']['ServicesFormControlsId'] });
                                }
                            });
                        }
                    });
            });
        }).catch(err => {
            sqlConnection.closeConnectionAndReject(sql, reject, err);
        });
    });
}

exports.updateServicesFormControls = function (postData) {
    return new Promise((resolve, reject) => {
        sqlConnection.getConnection().then(pool => {
            const transaction = new sql.Transaction(pool)
            transaction.begin(err => {
                let rolledBack = false
                transaction.on('rollback', aborted => {
                    rolledBack = true
                });
                const request = new sql.Request(transaction);
                request.input('ServicesFormControlsId', sql.BigInt, postData.ServicesFormControlsId)
                    .input('ServiceId', sql.BigInt, postData.ServiceId)
                    .input('FormControlId', sql.BigInt, postData.FormControlId)
                    .input('LableName', sql.NVarChar, postData.LableName)
                    .input('PlaceholderText', sql.NVarChar, postData.PlaceholderText)
                    .input('Order', sql.Int, postData.Order)
                    .input('NewLineBeforeThis', sql.Bit, postData.NewLineBeforeThis)
                    .input('NewLineAfterThis', sql.Bit, postData.NewLineAfterThis)
                    .input('IsMandatory', sql.Bit, postData.IsMandatory)
                    .input('IsCommon', sql.Bit, postData.IsCommon)
                    .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                    .execute('[dbo].[Proc_ServicesFormControlsUpdate]', (nerr, recordsets, returnValue) => {
                        if (nerr) {
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                    sqlConnection.closeConnectionAndReject(sql, reject, nerr);
                                });
                            }
                        }
                        else {
                            transaction.commit(err => {
                                if (err) {
                                    if (!rolledBack) {
                                        transaction.rollback(err => {
                                            sqlConnection.closeConnectionAndReject(sql, reject, err);
                                        });
                                    }
                                }
                                else {
                                    sqlConnection.closeConnectionAndResolve(sql, resolve, "updated successfully");
                                }
                            });
                        }
                    });
            });
        }).catch(err => {
            sqlConnection.closeConnectionAndReject(sql, reject, err);
        });
    });
}

exports.deleteServicesFormControls = function (postData) {
    return new Promise((resolve, reject) => {
        sqlConnection.getConnection().then(pool => {
            const transaction = new sql.Transaction(pool)
            transaction.begin(err => {
                let rolledBack = false
                transaction.on('rollback', aborted => {
                    rolledBack = true
                });
                const request = new sql.Request(transaction);
                request.input('ServicesFormControlsId', sql.BigInt, postData.ServicesFormControlsId)
                    .input('ModifiedBy', sql.BigInt, postData.ModifiedBy)
                    .execute('[dbo].[Proc_ServicesFormControlsDelete]', (nerr, recordsets, returnValue) => {
                        if (nerr) {
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                    sqlConnection.closeConnectionAndReject(sql, reject, nerr);
                                });
                            }
                        }
                        else {
                            transaction.commit(err => {
                                if (err) {
                                    if (!rolledBack) {
                                        transaction.rollback(err => {
                                            sqlConnection.closeConnectionAndReject(sql, reject, err);
                                        });
                                    }
                                }
                                else {
                                    sqlConnection.closeConnectionAndResolve(sql, resolve, "deleted successfully");
                                }
                            });
                        }
                    });
            });
        }).catch(err => {
            sqlConnection.closeConnectionAndReject(sql, reject, err);
        });
    });
}

exports.getServicesFormControls = function (postData) {
    return new Promise((resolve, reject) => {
        sqlConnection.getConnection().then(pool => {
            const request = new sql.Request(pool);
            request.input('ServicesFormControlsId', sql.BigInt, postData.ServicesFormControlsId)
                .input('ServiceId', sql.BigInt, postData.ServiceId)
                .execute('[dbo].[Proc_ServicesFormControlsSelect]', (nerr, recordsets, returnValue) => {
                    if (nerr) {
                        sqlConnection.closeConnectionAndReject(sql, reject, nerr);
                    }
                    else {
                        sqlConnection.closeConnectionAndResolve(sql, resolve, recordsets.recordset);
                    }
                });
        }).catch(err => {
            sqlConnection.closeConnectionAndReject(sql, reject, err);
        });
    });
}