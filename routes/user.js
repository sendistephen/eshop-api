const express = require('express');
const router = express.Router();

const { isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById, read, update, purchaseHistory } = require('../controllers/user');
router.get('/user/:userId', isAuthenticated, read);
router.put('/user/:userId', isAuthenticated, update);
router.get('/orders/by/user/:userId', isAuthenticated, purchaseHistory);
router.param('userId', getUserById);

module.exports = router;
