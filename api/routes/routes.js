const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/authMiddleware')
const mediaControler = require('../controllers/mediaControler')
const projectControler = require('../controllers/projectControler')
const portfolioControler = require('../controllers/portfolioControler')
const projHeaderControler = require('../controllers/projHeaderControler')

// MEDIA ROUTES
router.post('/media', isLoggedIn, mediaControler.createMedia)
router.get('/media/:mediaId', mediaControler.getMedia)
router.get('/medias/', mediaControler.getMedias)
router.delete('/media/:mediaId', isLoggedIn, mediaControler.deleteMedia)
router.put('/media', isLoggedIn, mediaControler.updateMedia)

// PROJECT ROUTES
router.post('/project', isLoggedIn, projectControler.createProject)
router.put('/project-cover/', isLoggedIn, projectControler.updateCover)
router.put('/project/', isLoggedIn, projectControler.updateProject)
router.delete('/project/:projectId', isLoggedIn, projectControler.deleteProject)
router.get('/project/:projectId', projectControler.getProject)

// PORTFOLIO ROUTES
router.get('/portfolio', portfolioControler.getPortfolio)
router.put('/portfolio', isLoggedIn, portfolioControler.updatePortfolio)

// MODULE PROJECT HEADER ROUTES
router.post(
    '/project-header/',
    isLoggedIn,
    projHeaderControler.createProjectHeader
)
router.put(
    '/project-header/',
    isLoggedIn,
    projHeaderControler.updateProjectHeader
)
router.delete(
    '/project-header/',
    isLoggedIn,
    projHeaderControler.deleteProjectHeader
)

// MODULE FULL IMAGE ROUTES
router.post('/full-image/', isLoggedIn, projectControler.createFullImage)
router.put('/full-image/', isLoggedIn, projectControler.updateFullImage)
router.delete('/full-image/', isLoggedIn, projectControler.deleteFullImage)

// MODULE FULL IMAGE ROUTES
router.post(
    '/double-picture/',
    isLoggedIn,
    projectControler.createDoublePicture
)
router.delete(
    '/double-picture/',
    isLoggedIn,
    projectControler.deleteDoublePicture
)
router.put('/double-picture/', isLoggedIn, projectControler.updateDoublePicture)

// MODULES COLLECTIONS ROUTES
router.get('/modules/:id', projectControler.getModulesCollection)

module.exports = router
