const mongoose = require('mongoose');
const {Schema} = mongoose;

const ModulesCollection = mongoose.model("ModulesCollection", new Schema({
    modules: [{type: Schema.Types.ObjectId, ref: 'Module'}],
    // modules: [{type: Schema.Types.ObjectId, refPath: 'onModel'}],
    // onModel: {
    //   type: String,
    //   // required: true,
    //   enum: ['ProjectHeader', 'FullImageModule']
    // }
  },
  {
    timestamp: true
  }
))

module.exports = ModulesCollection;
