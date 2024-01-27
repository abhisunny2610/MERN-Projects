const { Schema, model} = require('mongoose')

const chatModalSchema = new Schema({
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: true,
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Chat = model('Chat', chatModalSchema)

module.exports = Chat