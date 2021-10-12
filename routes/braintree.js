const express = require('express');
const router = express.Router();
const { isAuthenticated, isAuthorized } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const {
  generateToken,
  processPayment,
} = require('../controllers/braintree.js');

router.get('/braintree/get-token/:userId', isAuthenticated, generateToken);

router.post('/braintree/payment/:userId', isAuthenticated, processPayment);

router.param('userId', getUserById);
module.exports = router;
