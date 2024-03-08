const { Schema, model } = require("mongoose")
const { schema } = require("./user")

const classSchema = new Schema({
    className: {
        type: String,
        trim: true,
        required: true,
    },
    classTeacher: {
        type: Schema.Types.ObjectId,
        ref: "teacher",
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "student"
    }],
    teachers: [
        {
            type: Schema.Types.ObjectId,
            ref: "teacher"
        }]
}, { timestamps: true })

const Class = model("class", classSchema)
module.exports = Class