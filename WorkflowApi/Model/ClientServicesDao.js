var config = require('../appConfig');
var sql = require("mssql");

exports.saveClientServices = function (postData) {
    return new Promise((resolve, reject) => {
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
                    .input('ServiceId', sql.BigInt, postData.ServiceId)
                    .input('ReferenceName', sql.NVarChar, postData.ReferenceName)
                    .input('CreatedBy', sql.BigInt, postData.CreatedBy)
                    .output('ClientServiceId', sql.BigInt)
                    .execute('[dbo].[Proc_ClientServicesInsert]', (nerr, recordsets, returnValue) => {
                        if (nerr) {
                            transaction.rollback(err => {
                                closeConnectionAndReject(sql, reject, nerr);
                            });
                        }
                        else {
                            if (recordsets['output']) {
                                if (recordsets['output']['ClientServiceId'] != "" && recordsets['output']['ClientServiceId'] != undefined) {
                                    if (postData['FormsInputValues']) {
                                        try {
                                            insertFormInputValues(postData, transaction, recordsets['output']['ClientServiceId']).then(result => {
                                                transaction.commit(cerr => {
                                                    if (cerr) {
                                                        if (!rolledBack) {
                                                            transaction.rollback(err => {

                                                                closeConnectionAndReject(sql, reject, cerr);
                                                            });
                                                        }
                                                    } else {
                                                        closeConnectionAndResolve(sql, resolve, result);
                                                    }
                                                });
                                            }).catch(nerror => {
                                                transaction.rollback(err => {
                                                    console.log(nerror, "error here");
                                                    closeConnectionAndReject(sql, reject, nerror);
                                                });
                                            });
                                        }
                                        catch (error) {
                                            transaction.rollback(err => {
                                                console.log(error, "error1");
                                                closeConnectionAndReject(sql, reject, error);
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    });
            });
        }).catch(err => {
            closeConnectionAndReject(sql, reject, err);
        });
        sql.on('error', err => {
            closeConnectionAndReject(sql, reject, err);
        });
    });
}

function closeConnectionAndReject(sql, reject, error) {
    //console.log(error);
    sql.close();
    reject(error);

}

function closeConnectionAndResolve(sql, resolve, data) {
    console.log(sql, resolve, data);
    sql.close();
    resolve(data);
}

function insertFormInputValues(postData, transaction, ClientServiceId) {
    return new Promise((resolve, reject) => {
        if (postData['FormsInputValues']) {
            reject();
        }
        let iserror = false;
        postData.FormsInputValues.forEach(inputValues => {
            let request = new sql.Request(transaction);
            request.input('ClientId', sql.BigInt, inputValues.ClientId)
                .input('ClientServicesId', sql.BigInt, ClientServiceId)
                .input('FormControlsId', sql.BigInt, inputValues.FormControlsId)
                .input('InputValue', sql.NVarChar, inputValues.InputValue)
                .input('InputValueType', sql.NVarChar, inputValues.InputValueType)
                .input('CreatedBy', sql.BigInt, inputValues.CreatedBy)
                .output('ClientServiceId', sql.BigInt)
                .execute('[dbo].[Proc_ClientFormsInputValuesInsert]', (nerr, recordsets, returnValue) => {
                    if (nerr != undefined) {
                        iserror = true;
                    }
                });
        });
        if (iserror) {
            reject()
        }
        else {
            resolve();
        }

    });
}
