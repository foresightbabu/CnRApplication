var ServicesFormControlsDao = require('../Model/ServicesFormControlsDao');

exports.saveServicesFormControls = function (postData) {
    return new Promise((resolve, reject) => {
        ServicesFormControlsDao.saveServicesFormControls(postData).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error)
        });
    });
}

exports.updateServicesFormControls = function (postData) {
    return new Promise((resolve, reject) => {
        ServicesFormControlsDao.updateServicesFormControls(postData).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });
}

exports.deleteServicesFormControls = function (postData) {
    return new Promise((resolve, reject) => {
        ServicesFormControlsDao.deleteServicesFormControls(postData).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });
}

exports.getServicesFormControls = function (postData) {
    return new Promise((resolve, reject) => {
        ServicesFormControlsDao.getServicesFormControls(postData).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });
}