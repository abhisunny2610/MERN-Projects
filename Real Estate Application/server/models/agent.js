const {Schema, model} = require("mongoose")

const agentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNumber: {
        type: String,
        required: true
    },
    agency: {
        type: String,
    },
    address: {
        type: String,
    }
})

const Agent = model("Agent", agentSchema)
module.exports = Agent