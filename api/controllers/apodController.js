const axios = require('axios')
const Apod = require('../../models/Apod')
const User = require('../../models/User')
const dotenv = require('dotenv');
dotenv.config();
const nasaKey = process.env.NASAKEY

// ERRORS HANDLER //
const handleErrors = (err) => {
  console.log("INERORROROR", err)
  let errors = {}
  if (err.message === 'User is not Logged') {
     errors["message"] = err.message;
     return errors
  }
  if (err.message === "Image not found") {
     errors["message"] = err.message;
     return errors
  }
  if (err.message === "No token detected") {
     errors["message"] = err.message;
     return errors
  } else {
    errors["message"] = err.message;
    return errors
  }
}

// CONTROLERS //

module.exports.createApod = async (req, res, next) => {
  let {
    url, explanation, title, copyright, hdurl, media_type
  } = req.body

  let urlObj = {
    url, explanation,title, copyright, hdurl, media_type 
  }
  urlObj.apodDate = req.body.date
  try {
    let apod = await Apod.create(urlObj)
    res.status(201).json(apod)
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors})
  }
}

// make a request to Mongo for a specific register by date,
// if stored in Mongo send JSON. 
// if not stored in Mongo request from NASA API, 
// then save it into Mongo and send it as a JSON.
module.exports.getApod = async (req, res, next) => {
  let { apodDate } = req.params;
  try {
    let apodDateObj = await Apod.findOne({apodDate}).exec()
    if(apodDateObj === null) {
      let nasaResponse = await axios.get(`https://api.nasa.gov/planetary/apod?date=${apodDate}&api_key=${nasaKey}`)
      let dbResponse = await axios.post('http://localhost:5000/apod', nasaResponse.data)
      res.status(200).json(JSON.parse(dbResponse.config.data))
    } else return res.send(apodDateObj)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.getFavorites = async (req, res, next) => {
  try {
    let { userId } = req
    let user = await User.findOne({_id: userId}).populate('favorites')
    res.status(201).json(user.favorites)
  } catch(err) {
    const error = handleErrors(err)
    res.status(401).json(error)
  }
}

module.exports.updatedFavorites = async (req, res, next) => {
  let { apodDate, flag } = req.params;
  try {
    const apod = await Apod.findOne({apodDate});
    if(!apod) throw Error("Image not found")
    if(flag === "true") {
      const user = await User.findOneAndUpdate(
        {_id: req.userId}, {$push: {favorites: apod}}
        )
      } else {
      const user = await User.findOneAndUpdate(
        {_id: req.userId}, {$pull: {favorites: apod._id}}
      )
    }
    res.status(200).json({
      "success": true,
      "message": "Your favorite image of the day is saved in your favorites selection"
    })
  } catch(err){
    const error = handleErrors(err)
    res.status(401).json(error)
  }
}