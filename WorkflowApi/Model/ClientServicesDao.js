var config = require('../appConfig');
var sql = require("mssql");
var sqlConnection = require('../Common/SqlConnection');

exports.saveClientServices = function (postData) {
    return new Promise((resolve, reject) => {
        sqlConnection.getConnection().then(pool => {
            const transaction = new sql.Transaction(pool)
            transaction.begin(err => {
                let rolledBack = false
                transaction.on('rollback', aborted => {
                    // emited with aborted === true  
                    rolledBack = true
                });
                const request = new sql.Request(transaction);
                request.input('ClientId', sql.BigInt, postData.ClientId)
                    .input('ServiceId', sql.BigInt, postData.ServiceId)
                    .input('ReferenceName', sql.NVarChar, postData.ReferenceName)
                    .input('CreatedBy', sql.BigInt, postData.CreatedBy)
                    .output('ClientServiceId', sql.BigInt)
                    .execute('[dbo].[Proc_ClientServicesInsert]', (nerr, recordsets, returnValue) => {
                        if (nerr) {
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                    closeConnectionAndReject(sql, reject, nerr);
                                });
                            }
                        }
                        else {
                            transaction.commit(err => {
                                if (err) {
                                    if (!rolledBack) {
                                        transaction.rollback(err => {
                                            closeConnectionAndReject(sql, reject, err);
                                        });
                                    }
                                }
                                else {
                                    closeConnectionAndResolve(sql, resolve, recordsets['output']['ClientServiceId']);
                                }
                            });
                        }
                    });
            });
        }).catch(err => {
            closeConnectionAndReject(sql, reject, err);
        });
    });
}

exports.saveFormInputValues = function (FormsInputValues) {
    return new Promise((resolve, reject) => {
        if (FormsInputValues == undefined) {
            reject("no data found");
        }
        else {
            sqlConnection.getConnection().then(pool => {
                const transaction = new sql.Transaction(pool)
                transaction.begin(err => {
                    let rolledBack = false
                    transaction.on('rollback', aborted => {
                        rolledBack = true
                    });

                    const request = new sql.Request(transaction);
                    request.input('ClientId', sql.BigInt, FormsInputValues.ClientId)
                        .input('ClientServicesId', sql.BigInt, FormsInputValues.ClientServicesId)
                        .input('FormControlsId', sql.BigInt, FormsInputValues.FormControlsId)
                        .input('InputValue', sql.NVarChar, FormsInputValues.InputValue)
                        .input('InputValueType', sql.NVarChar, FormsInputValues.InputValueType)
                        .input('CreatedBy', sql.BigInt, FormsInputValues.CreatedBy)
                        .output('FormsInputValueId', sql.BigInt)
                        .execute('[dbo].[Proc_ClientFormsInputValuesInsert]', (nerr, recordsets, returnValue) => {
                            if (nerr) {
                                if (!rolledBack) {
                                    transaction.rollback(err => {
                                        closeConnectionAndReject(sql, reject, nerr);
                                    });
                                }
                            }
                            else {

                                transaction.commit(err => {
                                    if (err) {
                                        if (!rolledBack) {
                                            transaction.rollback(err => {
                                                closeConnectionAndReject(sql, reject, err);
                                            });
                                        }
                                    }
                                    else {
                                        closeConnectionAndResolve(sql, resolve, recordsets['output']['FormsInputValueId']);
                                    }
                                });
                            }
                        });
                });
            }).catch(err => {
                closeConnectionAndReject(sql, reject, err);
            });

        }
    });
}


function closeConnectionAndReject(sql, reject, error) {
    //console.log(error);
    sql.close();
    reject(error);

}

function closeConnectionAndResolve(sql, resolve, data) {
    sql.close();
    resolve(data);
}


sql.on('error', err => {
    closeConnectionAndReject(sql, reject, err);
});