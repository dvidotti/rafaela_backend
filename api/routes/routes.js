const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/authMiddleware')
const apodController = require("../controllers/apodController")


// APOD ROUTES //

router.get('/', (req, res, next) => {
  res.status(404).json({"error": "CHEGOU"})
})

router.post('/apod', apodController.createApod )

router.get('/apod/:apodDate', apodController.getApod)

router.get('/favorites', isLoggedIn, apodController.getFavorites)

router.put('/favorite/:apodDate/:flag', isLoggedIn, apodController.updatedFavorites)

module.exports = router