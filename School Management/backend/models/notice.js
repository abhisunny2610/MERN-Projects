const {model, Schema} = require("mongoose")

const noticeSchema = new Schema({
    publishedBy: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [5, "Please provide a content least 3 characters"]
    }
}, {timestamps: true})

const Notice = model("notice", noticeSchema)

module.exports = Notice