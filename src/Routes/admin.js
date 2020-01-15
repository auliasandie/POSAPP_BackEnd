const express = require ("express");
const Router = express.Router();
const adminController = require('../Controllers/admin')

Router.post('/login', adminController.loginAdmin);
Router.get('/', adminController.showAdmin);
Router.put('/update', adminController.updateAdmin);
Router.delete('/delete', adminController.deleteAdmin);

module.exports = Router;