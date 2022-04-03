const mongoose = require('mongoose')
const { Schema } = mongoose

const Module = mongoose.model(
    'Module',
    new Schema(
        {
            component: { type: Schema.Types.ObjectId, refPath: 'onComponent' },
            onComponent: {
                type: String,
                enum: ['ProjectHeader', 'FullImageModule', 'DoublePicture'],
            },
        },
        {
            timestamp: true,
        }
    )
)

module.exports = Module
