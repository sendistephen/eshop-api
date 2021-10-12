const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/mongoError');

// orderById middleware
exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      req.order = order;
      next();
    });
};

exports.create = (req, res) => {
  // get the user associated to the order -> add info from the req.profile to order
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(orders);
    });
};

exports.getPaymentStatus = (req, res) => {
  return res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(order);
    }
  );
};
