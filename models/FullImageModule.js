const mongoose = require('mongoose');
const {Schema} = mongoose;

const FullImageModule = mongoose.model("FullImageModule", new Schema({
    images: [{type: Schema.Types.ObjectId, ref: 'Media'}],
  },
  {
    timestamp: true
  }
))

module.exports = FullImageModule;
