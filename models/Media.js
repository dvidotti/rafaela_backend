const mongoose = require('mongoose');
let { Schema } = mongoose;

const Media = mongoose.model("Media", new Schema({
    name: {type: String},
    link: {type: String},
    alt: {type: String},
    media_type: {type: String}
  },
  {
    timestamp: true
  }
))

module.exports = Media;
