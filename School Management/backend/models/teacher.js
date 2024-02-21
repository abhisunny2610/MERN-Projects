const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim:true
    },
    email:{
        type: String,
        require:true,
        trim:true
    },
    profileImage: {
        type: String,
        default: "https://unsplash.com/photos/man-standing-near-white-wall-d1UPkiFd04A"
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: ""
    },
    qualification: {
        type: String,
        default: ""
    },
    subjects: {
        type: [String],
        default: []
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
            default: ""
        }
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
    },
    classTeacher: {
        type: String,
        dfault: ""
    },
    classesHandled: {
        type: [String],
        default: []
    },
    experience: {
        type: Number,
        default: 0
    },
    salary: {
        type: Number,
        default: 0
    },
    isPermanent: {
        type: Boolean,
        default: false
    },
    performance: {
        type: String,
        default: "Average"
    },
    responsibilities: {
        type: [String],
        default: []
    },

}, {timestamps: true});

const Teacher = model("teacher", teacherSchema);

module.exports = Teacher;
