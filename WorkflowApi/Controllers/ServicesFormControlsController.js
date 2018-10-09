var ServicesFormControlsRepo = require('../Repository/ServicesFormControlsRepo');
var errors = require('../Common/errorCodes');


// Insert ServicesFormControls
exports.saveServicesFormControls = function (req, res) {
    errorCodes = errors.errorCodes;
    var postData = req.body;
    try {

        if (postData == undefined || postData['LableName'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "",
                "data": null
            });
        }
        else {

            ServicesFormControlsRepo.saveServicesFormControls(postData).then(result => {
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


// Update ServicesFormControls
exports.updateServicesFormControls = function (req, res) {
    errorCodes = errors.errorCodes;
    var postData = req.body;
    try {

        if (postData == undefined || postData['LableName'] == undefined) {
            res.status(errorCodes.BAD_REQUEST.Value);
            res.json({
                "status": errorCodes.BAD_REQUEST.Text,
                "message": "",
                "data": null
            });
        }
        else {

            ServicesFormControlsRepo.updateServicesFormControls(postData).then(result => {
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

// Delete ServicesFormControls
exports.deleteServicesFormControls = function (req, res) {
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

            ServicesFormControlsRepo.deleteServicesFormControls(postData).then(result => {
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

// Select ServicesFormControls
exports.getServicesFormControls = function (req, res) {
    errorCodes = errors.errorCodes;
    var postData = {
        ServicesFormControlsId: req.query['ServicesFormControlsId'],
        ServiceId: req.query['ServiceId']
    }

    try {
        ServicesFormControlsRepo.getServicesFormControls(postData).then(result => {
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

    } catch (err) {
        res.status(errorCodes.INTERNAL_SERVER_ERROR.Value);
        res.json({
            "status": errorCodes.INTERNAL_SERVER_ERROR.Text,
            "message": err.message,
            "data": null
        });
    }
}
