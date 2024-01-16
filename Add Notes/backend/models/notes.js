const {Schema, model} = require('mongoose')

const notesSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    isdone: {
        default: false,
        type:Boolean
    }
}, {timestamps: true})

const Notes = model("note", notesSchema)

module.exports = Notes