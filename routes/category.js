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
  getCategoryById,
  deleteCategory,
  updateCategory,
  list,
} = require('../controllers/category');
const { getUserById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.delete(
  '/category/:categoryId/:userId',
  isAuthenticated,
  isAdmin,
  deleteCategory
);
router.put(
  '/category/:categoryId/:userId',
  isAuthenticated,
  isAdmin,
  updateCategory
);
router.get('/categories', list);
router.post('/category/create/:userId', isAuthenticated, isAdmin, create);

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

module.exports = router;
