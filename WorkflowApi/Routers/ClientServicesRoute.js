var express = require('express');
var ClientServiceRouter = express.Router();
var clientServicesController = require('../Controllers/ClientServicesController');

//Client Services Routes //
ClientServiceRouter.post('/createservies', clientServicesController.saveClientServices);
ClientServiceRouter.post('/submitforminputs', clientServicesController.saveFormInputValues);

module.exports = ClientServiceRouter;