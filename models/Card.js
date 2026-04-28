const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  order: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);