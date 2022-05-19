const { Schema, model } = require('mongoose');

const userRole = new Schema({
  name: { type: String, unique: true, default: 'USER' },
});

module.exports = model('UserRole', userRole);
