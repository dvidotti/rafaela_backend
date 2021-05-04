const mongoose = require('mongoose');
const {Schema} = mongoose;

const Module = mongoose.model("Module", new Schema({
    module: {type: Schema.Types.ObjectId, refPath: 'onModel'},
    onModel: {
      type: String,
      // required: true,
      enum: ['ProjectHeader', 'FullImageModule']
    }
  },
  {
    timestamp: true
  }
))

module.exports = Module;
