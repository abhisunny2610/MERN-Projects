const { Schema, modal } = require('mongoose')

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }
}, { timestamps: true })

const Message = modal('Message', messageSchema)

module.exports = Message