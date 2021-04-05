const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) throw Error("Authentication Failed")
      else req.userId = decodedToken.id;
    })
  } else throw Error("No token detected")
  next()
}

module.exports = isLoggedIn;