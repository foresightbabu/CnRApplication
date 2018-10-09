var express = require('express');
var ClientServiceRouter = express.Router();
var ServicesFormControlController = require('../Controllers/ServicesFormControlsController');

//Client Services Routes //
ClientServiceRouter.post('/', ServicesFormControlController.saveServicesFormControls);
ClientServiceRouter.put('/', ServicesFormControlController.updateServicesFormControls);
ClientServiceRouter.delete('/', ServicesFormControlController.deleteServicesFormControls);
ClientServiceRouter.get('/', ServicesFormControlController.getServicesFormControls);

module.exports = ClientServiceRouter;