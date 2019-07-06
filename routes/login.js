const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const loginController = require('../controllers/login');




router.get('/login',loginController.getLogin);

router.post('/login',loginController.postLogin);

router.get('/logout',loginController.getlogout);



module.exports = router;