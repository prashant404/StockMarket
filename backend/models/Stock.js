const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);
