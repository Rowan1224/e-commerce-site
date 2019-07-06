const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const supplyController = require('../controllers/supply');




router.get('/orders-list',supplyController.getOrderlist);

router.get('/order-details/:orderId',supplyController.getOrderDetails);

router.post('/order-validation',supplyController.postOrderValidation);

//router.get('/admin-products',supplyController.getProducts);




module.exports = router;