const express = require ("express");
const Router = express.Router();
const categoryController = require('../Controllers/category')


Router.get('/', categoryController.getCategory);
Router.get('/:id', categoryController.getCategoryById);
Router.post('/', categoryController.addCategory);
Router.put('/:id', categoryController.updateCategory);
Router.delete('/:id', categoryController.deleteCategory);

module.exports = Router