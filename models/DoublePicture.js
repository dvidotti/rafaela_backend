const mongoose = require('mongoose')
const { Schema } = mongoose

const DoublePicture = mongoose.model(
    'DoublePicture',
    new Schema(
        {
            imageOne: { type: Schema.Types.ObjectId, ref: 'Media' },
            imageTwo: { type: Schema.Types.ObjectId, ref: 'Media' },
        },
        {
            timestamp: true,
        }
    )
)

module.exports = DoublePicture
