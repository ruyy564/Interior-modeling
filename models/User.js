const { Schema, model, Types } = require('mongoose');

const user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  role: {
    type: Types.ObjectId,
    ref: 'UserRole',
  },
});

module.exports = model('User', user);
