const { Schema, model, Types } = require('mongoose');

const project = new Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: Types.ObjectId,
    require: true,
    ref: 'TypeObject',
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Project', project);
