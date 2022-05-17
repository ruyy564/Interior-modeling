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
  projects: [
    {
      type: Types.ObjectId,
      ref: 'Project',
    },
  ],
  roles: [
    {
      type: Types.ObjectId,
      ref: 'Role',
    },
  ],
});

module.exports = model('User', user);
