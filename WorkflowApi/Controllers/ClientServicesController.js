var ClientServicesRepo = require('../Repository/ClientServicesRepo');
var errors = require('../Common/errorCodes');

// Insert ClientServices
exports.saveClientServices = function (req, res) {
    errorCodes = errors.errorCodes;
    var postData = req.body;
    try {

        if (postData == undefined || postData['ReferenceName'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "",
                "data": null
            });
        }
        else {

            ClientServicesRepo.saveClientServices(postData).then(result => {
                res.status(errorCodes.SUCCESS.Value);
                res.json({
                    "status": errorCodes.SUCCESS.Text,
                    "message": "",
                    "data": result
                });
            }).catch(error => {
                res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                res.json({
                    "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                    "message": error.message,
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


exports.saveFormInputValues = function (req, res) {
    errorCodes = errors.errorCodes;
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
        else {

            ClientServicesRepo.saveFormInputValues(postData).then(result => {
                res.status(errorCodes.SUCCESS.Value);
                res.json({
                    "status": errorCodes.SUCCESS.Text,
                    "message": "",
                    "data": result
                });
            }).catch(error => {
                res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
                res.json({
                    "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
                    "message": error.message,
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
