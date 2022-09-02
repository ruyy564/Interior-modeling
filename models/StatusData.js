const { Schema, model, Types } = require('mongoose');

const statusData = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    default: 'PRIVATE',
  },
});

module.exports = model('StatusData', statusData);
