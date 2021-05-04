const mongoose = require('mongoose');
const {Schema} = mongoose;

const Project = mongoose.model("Project", new Schema({
    name: {
      type: String, 
      required: [true, "Project name required"],
      unique: [true, "Project name must be unique"]
    },
    type: {type: String},
    areas: [{type: String}],
    cover: {type: Schema.Types.ObjectId, ref: 'Media'},
    link: {type: String},
    modules: {
      type: Schema.Types.ObjectId,
      ref: 'ModulesCollection'
    },
  },
  {
    timestamp: true
  }
))

module.exports = Project;
