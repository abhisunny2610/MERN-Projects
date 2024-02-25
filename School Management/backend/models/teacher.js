const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
    teacherId: {
        type: Number,
        trim: true,
        required: true
    },
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
    profileImage: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fwoman%2F&psig=AOvVaw1iYfnUY32Zx3Z7nQ9omQjh&ust=1708666770702000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNC_oPGdvoQDFQAAAAAdAAAAABAE"
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required: true
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
            required: true
        }
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
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
        required: true
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

}, { timestamps: true });

const Teacher = model("teacher", teacherSchema);

module.exports = Teacher;
