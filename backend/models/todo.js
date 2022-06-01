const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  endDate: { type: Number }
});

module.exports = mongoose.model('Todo', todoSchema);
