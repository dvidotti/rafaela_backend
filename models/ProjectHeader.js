const mongoose = require('mongoose')
const { Schema } = mongoose

const ProjectHeader = mongoose.model(
    'ProjectHeader',
    new Schema(
        {
            title: {
                type: String,
                // required: [true, "Project title required"],
                // unique: [true, "Project title must be unique"]
            },
            areas: [{ type: String }],
            headImg: { type: Schema.Types.ObjectId, ref: 'Media' },
            description: { type: String },
            local: { type: String },
            date: { type: String },
            partnership: { type: String },
        },
        {
            timestamp: true,
        }
    )
)

module.exports = ProjectHeader
