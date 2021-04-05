const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Apod = mongoose.model('Apod', new Schema({
  title: {type: String},
  copyright: {type: String},
  url: {type: String},
  apodDate: {type: String, required: true, unique: true},
  explanation: {type: String},
  hdurl: {type: String},
  media_type: {type: String},
},
{
  timestamps:true
}
))

module.exports = Apod