const mongoose = require('mongoose')
const { Schema } = mongoose

const Portfolio = mongoose.model(
    'Portfolio',
    new Schema(
        {
            portfolio: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
        },
        {
            timestamp: true,
        }
    )
)

module.exports = Portfolio
