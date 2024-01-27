const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Regular expression for email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profileImage: {
        type: String,
        require: true,
        default: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg",
    }
}, {timestamps: true})

const User = model("User", userSchema)

module.exports = User