var express = require('express');
var ClientServiceRouter = express.Router();
var ClientServicesController = require('../Controllers/ClientServicesController');

//Client Services Routes //
ClientServiceRouter.post('/createservies', ClientServicesController.saveClientServices);
ClientServiceRouter.post('/submitforminputs', ClientServicesController.saveFormInputValues);

module.exports = ClientServiceRouter;