var express = require('express');
var ClientServiceRouter = express.Router();
var ServicesFormControlController = require('../Controllers/ServicesFormControlsController');

//Client Services Routes //
ClientServiceRouter.post('/', ServicesFormControlController.saveServicesFormControls);
ClientServiceRouter.put('/', ServicesFormControlController.up);

module.exports = ClientServiceRouter;