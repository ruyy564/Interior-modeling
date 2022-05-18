const { Schema, model } = require('mongoose');

const type = new Schema({
  value: { type: String, unique: true, required: true },
});

module.exports = model('TypeObject', type);
