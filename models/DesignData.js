const { Schema, model, Types } = require('mongoose');

const designData = new Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: Types.ObjectId,
    require: true,
    ref: 'TypeData',
  },
  image: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    require: true,
  },
  status: {
    type: Types.ObjectId,
    ref: 'StatusData',
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('DesignData', designData);
