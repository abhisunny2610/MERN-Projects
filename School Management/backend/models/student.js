const {model, Schema} = require("mongoose")

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default:"other"
    },
    profileImage: {
        type: String,
        default: "https://unsplash.com/photos/man-standing-near-white-wall-d1UPkiFd04A"
    },
    parentGuardian: {
        name: {
            type: String,
            trim: true,
            default: ""
        },
        relationship: {
            type: String,
            trim: true,
            default: ""
        },
        contact: {
            email: {
                type: String,
                trim: true,
                default: ""
            },
            phone: {
                type: String,
                trim: true,
                default: ""
            }
        }
    },
    age: {
        type: Number,
        default: 0
    },
    grade: {
        type: String,
        trim: true,
        default: ""
    },
    address: {
        street: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        },
        postalCode: {
            type: String,
            default: ""
        }
    },
    contact: {
        phone: {
            type: String,
            trim: true,
            default: ""
        }
    },
    dateOfBirth: {
        type: Date,
        default: Date.now()
    },

}, {timestamps: true})

const Student = model("Student", studentSchema)
module.exports = Student
