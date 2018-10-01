var ClientServicesDao = require('../Model/ClientServicesDao');

exports.saveClientServices = function (postData) {
    return new Promise((resolve, reject) => {
        ClientServicesDao.saveClientServices(postData).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error)
        });
    });
}