const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  order: { type: Number, required: true }, // float sıralama
}, { timestamps: true });

module.exports = mongoose.model('Column', columnSchema);