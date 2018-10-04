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
                            if (!rolledBack) {
                                transaction.rollback(err => {
                                    closeConnectionAndReject(sql, reject, nerr);
                                });
                            }
                        }
                        else {
                            closeConnectionAndResolve(sql, resolve, recordsets['output']['ClientServiceId']);
                        }
                    });
            });
        }).catch(err => {
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
    sql.close();
    resolve(data);
}

exports.saveFormInputValues = function (postData) {
    let FormsInputValueIds = [];
    return new Promise((resolve, reject) => {
        if (postData['FormsInputValues'] == undefined) {
            reject("no data found");
        }
        else {
            sql.connect(config.db).then(pool => {
                const transaction = new sql.Transaction(pool)
                transaction.begin(err => {
                    let rolledBack = false
                    transaction.on('rollback', aborted => {
                        rolledBack = true
                    });
                    postData['FormsInputValues'].forEach(inputValues => {
                        const request = new sql.Request(transaction);
                        request.input('ClientId', sql.BigInt, inputValues.ClientId)
                            .input('ClientServicesId', sql.BigInt, ClientServiceId)
                            .input('FormControlsId', sql.BigInt, inputValues.FormControlsId)
                            .input('InputValue', sql.NVarChar, inputValues.InputValue)
                            .input('InputValueType', sql.NVarChar, inputValues.InputValueType)
                            .input('CreatedBy', sql.BigInt, inputValues.CreatedBy)
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
                                    FormsInputValueIds.push(recordsets['output']['FormsInputValueId']);
                                }
                            });

                    });
                });
            }).catch(err => {
                closeConnectionAndReject(sql, reject, err);
            });

        }
    });
}

sql.on('error', err => {
    closeConnectionAndReject(sql, reject, err);
});


// function insertFormInputValues(postData, transaction, ClientServiceId) {
//     return new Promise((resolve, reject) => {
//         if (postData['FormsInputValues'] == undefined) {
//             reject("no data found");
//         }
//         else {
//             postData.FormsInputValues.forEach(inputValues => {
//                 let request = new sql.Request(transaction);
//                 request.input('ClientId', sql.BigInt, inputValues.ClientId)
//                     .input('ClientServicesId', sql.BigInt, ClientServiceId)
//                     .input('FormControlsId', sql.BigInt, inputValues.FormControlsId)
//                     .input('InputValue', sql.NVarChar, inputValues.InputValue)
//                     .input('InputValueType', sql.NVarChar, inputValues.InputValueType)
//                     .input('CreatedBy', sql.BigInt, inputValues.CreatedBy)
//                     .output('FormsInputValueId', sql.BigInt)
//                     .execute('[dbo].[Proc_ClientFormsInputValuesInsert]', (nerr, recordsets, returnValue) => {
//                         if (nerr != undefined) {
//                             reject(nerr);
//                         }
//                     });
//             });
//             resolve(true);
//         }

//     });
// }
