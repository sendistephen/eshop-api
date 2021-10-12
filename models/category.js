const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, maxLength: 32 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
