const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById, addOrderToUserHistory } = require('../controllers/user');
const {
  create,
  listOrders,
  getPaymentStatus,
  updateOrderStatus,
  orderById,
} = require('../controllers/order.js');
const { decreaseQuantity } = require('../controllers/product');

router.post(
  '/order/create/:userId',
  isAuthenticated,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
router.get('/order/list/:userId', isAuthenticated, isAdmin, listOrders);
router.get(
  '/order/status-values/:userId',
  isAuthenticated,
  isAdmin,
  getPaymentStatus
);
router.put(
  '/order/:orderId/status/:userId',
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);
router.param('userId', getUserById);
router.param('orderId', orderById);
module.exports = router;
