const Category = require('../models/category');
const { errorHandler } = require('../helpers/mongoError');

exports.getCategoryById = (req, res, next, categoryId) => {
  Category.findById(categoryId).exec((err, foundCategory) => {
    if (err || !foundCategory) {
      return res.status(400).json({ error: 'Category not found' });
    }
    // add category to the req object
    req.category = foundCategory;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({ error: errorHandler });
    }
    return res.json({
      message: 'Category deleted successfully!',
      deletedCategory,
    });
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  if (!req.body.name) {
    return res.status(400).json({ error: 'Category is required' });
  }
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ data });
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ data });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json(categories);
  });
};
