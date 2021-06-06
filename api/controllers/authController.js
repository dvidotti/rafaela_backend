const User = require('../../models/User')
const jwt = require('jsonwebtoken')

const {BCKSECRET, SECRET} = process.env


//errorHandler
const handleError = (err) => {
  let error = {}

  if (err.message === "incorrect email or password") {
     error = {message: err.message}
  }

  if(err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
       error[properties.path] = properties.message
    })
  } 
  
  if(err.code === 11000){
    error["message"] = "This email is already in use, choose a new one";
  } else {
    error = {message: err.message}
  }
  error['success'] = false;
  return error
}

// create token
let maxAge = 3 * 24 * 60 * 60;
const createJWT = (id) => {
  return jwt.sign({ id }, SECRET, {expiresIn: maxAge})
}

// SignIn
module.exports.createUser =  async (req, res, next) => {
  let {email, password, secret} = req.body;
  if(secret !== BCKSECRET) {
    res.status(403).json({success: false, message: "Wrong secret"})
    return;
  }
  try {
    let user = await User.create({email, password});
    const token = createJWT(user._id)
    res.cookie('jwt', token, {httpOnly: true, secure: true, maxAge: maxAge * 1000}) //insert httpOnly and secure for https in production
    
    res.status(201).json({success: true, user: user._id})
  }
  catch (err) {
    const errors = handleError(err)
    res.status(400).json(errors)
  }   
}

//Login
module.exports.login = async (req, res, next) => {
  let {email, password} = req.body
  try {
    let user = await User.login(email, password) // login static Schema
    if(user) {
      const token = createJWT(user._id)
      res.cookie('jwt', token, {httpOnly: true, secure: true, maxAge: maxAge * 1000}) //insert httpOnly and secure for https in production
      res.status(201).json({success: true, user: user._id})
    }
  } catch(err) {
    const errors = handleError(err)
    res.status(400).json({errors})
  }
}

//Update

//Logout


