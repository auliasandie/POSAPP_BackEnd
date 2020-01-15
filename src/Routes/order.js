const express = require('express');
const orderController = require('../Controllers/order');

const Router = express.Router();

Router.get('/', orderController.getOrder);
Router.post('/', orderController.newOrder);
Router.get('/detail', orderController.getOrderDetail);
Router.put('/:order_id', orderController.updateStatusOrder);

module.exports = Router;