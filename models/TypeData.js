const { Schema, model, Types } = require('mongoose');

const typeData = new Schema({
  parent: { type: Types.ObjectId, ref: 'TypeData', default: null },
  name: { type: String, unique: true, required: true },
});

module.exports = model('TypeData', typeData);
