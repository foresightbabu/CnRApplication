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
                    .input('PlaceholderText', sql.BigInt, postData.PlaceholderText)
                    .input('Order', sql.BigInt, postData.Order)
                    .input('NewLineBeforeThis', sql.BigInt, postData.NewLineBeforeThis)
                    .input('NewLineAfterThis', sql.BigInt, postData.NewLineAfterThis)
                    .input('IsMandatory', sql.BigInt, postData.IsMandatory)
                    .input('IsCommon', sql.BigInt, postData.IsCommon)
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
                                    sqlConnection.closeConnectionAndResolve(sql, resolve, recordsets['output']['ServicesFormControlsId']);
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
                    .input('PlaceholderText', sql.BigInt, postData.PlaceholderText)
                    .input('Order', sql.BigInt, postData.Order)
                    .input('NewLineBeforeThis', sql.BigInt, postData.NewLineBeforeThis)
                    .input('NewLineAfterThis', sql.BigInt, postData.NewLineAfterThis)
                    .input('IsMandatory', sql.BigInt, postData.IsMandatory)
                    .input('IsCommon', sql.BigInt, postData.IsCommon)
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
