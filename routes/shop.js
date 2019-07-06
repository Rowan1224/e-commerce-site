const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productsId',shopController.getProduct);

router.get('/cart',shopController.getCart);

router.post('/cart-delete-item',shopController.postDeleteCart);

router.post('/cart',shopController.postCart);

router.post('/confirmOrder',shopController.postConfirmOrder);

router.get('/checkout',shopController.getCheckout);

router.get('/orders',shopController.getMyOrder);

router.post('/checkout',shopController.getCheckout);
module.exports = router;