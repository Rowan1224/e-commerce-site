const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank');

router.post('/cashIN',bankController.postCashIN);

router.post('/cashOUT',bankController.postCashOUT);

router.get('/cashIN',bankController.getCashIN);

router.get('/cashOUT',bankController.getCashOUT);

router.get('/message',bankController.postMessage);

router.get('/balance',bankController.getBalance);
router.post('/balance',bankController.postBalance);

router.get('/validate',bankController.getValidate);
router.post('/validate',bankController.postValidate);
router.post('/supplier-validate',bankController.postSupplierValidate);
module.exports = router;