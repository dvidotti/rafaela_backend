const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/authMiddleware')
const mediaControler = require("../controllers/mediaControler")
const projectControler = require("../controllers/projectControler")
const portfolioControler = require("../controllers/portfolioControler")
const projHeaderControler = require("../controllers/projHeaderControler")


// MEDIA ROUTES
router.post('/media', isLoggedIn, mediaControler.createMedia)
router.get('/media/:mediaId', mediaControler.getMedia)
router.get('/medias/', mediaControler.getMedias)
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

// MODULE ROUTEs
router.post('/project-header/', isLoggedIn, projHeaderControler.createProjectHeader)
router.put('/project-header/', isLoggedIn, projHeaderControler.updateProjectHeader)
router.post('/full-image/', isLoggedIn, projectControler.createFullImage)

// MODULES COLLECTIONS ROUTES
router.get('/modules/:id', isLoggedIn, projectControler.getModulesCollection)

module.exports = router