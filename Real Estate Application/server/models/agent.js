const {Schema, model} = require("mongoose")

const agentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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