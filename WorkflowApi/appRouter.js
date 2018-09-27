var express = require('express');
var router = express.Router();

var loginController = require('./Controllers/LoginController');
var clientController = require('./Controllers/ClientController');
var userController = require('./Controllers/UserController');
var serviceMasterController = require('./Controllers/ServiceMasterController');
var subTaskController = require('./Controllers/SubTaskController');


// Login Routes //
router.post('/users/authenticate', loginController.validateLogin);

// Client Routes //
router.post('/client', clientController.saveClient);
router.get('/client', clientController.getClients);
router.put('/client', clientController.updateClient);
router.delete('/client', clientController.deleteClient);
router.patch('/client', clientController.blockClient);

//User Routes //
router.post('/users', userController.saveUser);
router.put('/users', userController.updateUser);
router.delete('/users', userController.deleteUser);
router.patch('/users', userController.blockUser);
router.get('/users', userController.getUsers);

//ServicesMaster (TaskGroup) Routes //
router.post('/service', serviceMasterController.saveServiceMaster);
router.put('/service', serviceMasterController.updateServiceMaster);
router.delete('/service', serviceMasterController.deleteServiceMaster);
router.get('/service', serviceMasterController.getServiceMaster);

//SubTask Routes //
router.post('/subtask', subTaskController.saveSubTaskMaster);
router.put('/subtask', subTaskController.updateSubTaskMaster);
router.delete('/subtask', subTaskController.deleteSubTaskMaster);
router.get('/subtask', subTaskController.getSubTaskMaster);


// Export Router //
module.exports = router;