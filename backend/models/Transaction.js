const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
