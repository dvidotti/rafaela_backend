const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/authMiddleware')
const mediaControler = require("../controllers/mediaControler")
const projectControler = require("../controllers/projectControler")
const portfolioControler = require("../controllers/portfolioControler")


// MEDIA ROUTES
router.post('/media', isLoggedIn, mediaControler.createMedia)
router.get('/media/:mediaId', mediaControler.getMedia)
router.delete('/media/:mediaId', isLoggedIn, mediaControler.deleteMedia)
router.put('/media', isLoggedIn, mediaControler.updateMedia)


// PROJECT ROUTES
router.post('/project', isLoggedIn,  projectControler.createProject)
router.put('/project/', isLoggedIn, projectControler.updateProject)
router.delete('/project/:projectId', isLoggedIn, projectControler.deleteProject)
router.get('/project/:projectId', projectControler.getProject)

// PORTFOLIO ROUTES
router.get('/portfolio', isLoggedIn,  portfolioControler.getPortfolio)
router.put('/portfolio', isLoggedIn,  portfolioControler.updatePortfolio)


module.exports = router