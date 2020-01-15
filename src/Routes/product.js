const express = require('express');
const productController = require('../Controllers/product')
const Router = express.Router();

Router.get('/', productController.getProduct)
Router.get('/:product_id', productController.getProductById)
Router.post('/', productController.newProduct)
Router.put('/:product_id', productController.updateProduct)
Router.delete('/:product_id', productController.deleteProduct)
module.exports = Router;