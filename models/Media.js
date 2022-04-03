const mongoose = require('mongoose')
let { Schema } = mongoose

const Media = mongoose.model(
    'Media',
    new Schema(
        {
            name: { type: String },
            linkCloudinary: { type: String },
            public_id: { type: String },
            linkMyDomain: { type: String },
            linkS3: { type: String },
            alt: { type: String },
            media_type: { type: String },
        },
        {
            timestamp: true,
        }
    )
)

module.exports = Media
