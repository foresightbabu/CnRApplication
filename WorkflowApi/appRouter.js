var express = require('express');
var router = express.Router();

var loginController = require('./Controllers/loginController');
var clientController = require('./Controllers/clientController');
var userController = require('./Controllers/userController');

// Login Routes //
router.post('/users/authenticate', loginController.validateLogin);

// Client Routes //
router.post('/client', clientController.saveClient);
router.get('/client', clientController.getClients);
router.put('/client', clientController.updateClient);
router.delete('/client', clientController.deleteClient);
router.patch('/client', clientController.blockClient);

//User Routes //
router.post('/users/', userController.saveUser);
router.put('/users/', userController.updateUser);
router.delete('/users', userController.deleteUser);
router.patch('/users', userController.blockUser);
router.get('/users', userController.getUsers);


// Export Router //
module.exports = router;