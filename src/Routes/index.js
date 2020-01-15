const express = require('express');
const category = require('../Routes/category')
const admin = require('../Routes/admin')
const product = require('../Routes/product')
const order = require('../Routes/order')
const Router = express.Router();

Router.use('/category', category);
Router.use('/admin', admin);
Router.use('/product', product);
Router.use('/order', order)

module.exports = Router