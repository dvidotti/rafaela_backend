const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const {isEmail } = require('validator');
const bcrypt = require('bcrypt');

let userSchema =  new Schema({
  email:{
     type: String, 
     required:[true, "Please enter an Email"],
     unique: true,
     validate: [isEmail, 'Please enter a valid email']
    },
  password: {
    type: String, 
    required:[true, "Please enter a password"],
    minlength: [8, "Your password should have at least 8 characters"],
    validate: []
  },
  favorites: [{type: Schema.Types.ObjectId, ref: 'Apod'}]
}, {timestamps: true})

userSchema.post('save', function(doc, next) {
  console.log('user created')
  next()
})

userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email})
  if (user) {
    let isAuth = await bcrypt.compare(password, user.password);
    if (isAuth) return user; 
    throw Error("incorrect email or password")
  }
  throw Error('incorrect email or password')
}

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt()
  this.password =  await bcrypt.hash(this.password, salt);
  next()
})

module.exports = mongoose.model("User", userSchema)