const Media = require('../../models/Media')
const dotenv = require('dotenv')
dotenv.config()

// ERRORS HANDLER //
const handleErrors = err => {
    let errors = {}
    if (err.message === 'User is not Logged') {
        errors['message'] = err.message
    } else if (err.message === 'No token detected') {
        errors['message'] = err.message
    } else {
        errors['message'] = err.message
    }
    errors['success'] = false
    return errors
}

// CONTROLERS //

module.exports.createMedia = async (req, res, next) => {
    let {
        name,
        public_id,
        linkCloudinary,
        linkMyDomain,
        linkS3,
        media_type,
    } = req.body

    let media = {
        name,
        public_id,
        linkCloudinary,
        linkMyDomain,
        linkS3,
        media_type,
        alt: name,
    }

    try {
        let savedMedia = await Media.create(media)
        res.status(201).json(savedMedia)
    } catch (err) {
        const errors = handleErrors(err)
        res.status(401).json({ errors })
    }
}

module.exports.getMedia = async (req, res, next) => {
    try {
        let { mediaId } = req.params
        let mediaObj = await Media.findOne({ _id: mediaId })
        if (mediaObj === null) {
            throw Error("Couldn't get media, not found")
        }
        res.status(201).json(mediaObj)
    } catch (err) {
        const error = handleErrors(err)
        res.status(401).json(error)
    }
}

module.exports.getMedias = async (req, res, next) => {
    try {
        let medias = await Media.find()
        if (medias === null) {
            throw Error("Couldn't get medias, not found")
        }
        res.status(201).json(medias)
    } catch (err) {
        const error = handleErrors(err)
        res.status(401).json(error)
    }
}

module.exports.deleteMedia = async (req, res, next) => {
    let { mediaId } = req.params
    try {
        let response = await Media.findByIdAndRemove(mediaId)
        if (response === null) {
            throw Error("Couldn't find and delete media")
        }
        response['success'] = true
        res.status(200).json(response)
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.updateMedia = async (req, res, next) => {
    let { mediaId, name } = req.body
    try {
        const media = await Media.findByIdAndUpdate(
            mediaId,
            { name, alt: name },
            { new: true }
        )
        if (media === null) {
            throw Error("Couldn't find and update media")
        }
        res.status(201).json(media)
    } catch (err) {
        const error = handleErrors(err)
        res.status(401).json(error)
    }
}
