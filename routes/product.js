const express = require('express');
const router = express.Router();
const {
  isAuthenticated,
  isAdmin,
  isAuthorized,
} = require('../controllers/auth');

const {
  create,
  read,
  list,
  getProductById,
  deleteProduct,
  updateProduct,
  photo,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
} = require('../controllers/product');
const { getUserById } = require('../controllers/user');

router.get('/products/categories', listCategories);
router.get('/products/search', listSearch);
router.get('/products/:productId', read);
router.get('/product/photo/:productId', photo);
router.get('/products', list);
router.get('/products/related/:productId', listRelated);

router.delete(
  '/products/:productId/:userId',
  isAuthenticated,
  isAdmin,
  deleteProduct
);
router.patch(
  '/products/:productId/:userId',
  isAuthenticated,
  isAdmin,
  updateProduct
);
router.post('/products/by/search', listBySearch);
router.post('/products/create/:userId', isAuthenticated, isAdmin, create);

router.param('userId', getUserById);
router.param('productId', getProductById);

module.exports = router;
