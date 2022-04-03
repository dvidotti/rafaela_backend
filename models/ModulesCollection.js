const mongoose = require('mongoose')
const { Schema } = mongoose

const ModulesCollection = mongoose.model(
    'ModulesCollection',
    new Schema(
        {
            modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
        },
        {
            timestamp: true,
        }
    )
)

module.exports = ModulesCollection
