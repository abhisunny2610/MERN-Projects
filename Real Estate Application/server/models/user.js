const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

// Define User schema
const UserSchema = new Schema({
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
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phoneNumber: {
        type: String,
        required: true
    },
    type:{
        type: String,
        default: "buyer",
        enum: ["buyer", "agent"]
    },
    //   properties: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Property'
    //   }],
}, {
    timestamps: true
});

// hashing the password before save the data in database
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next()
    }

    const salt = await bcrypt.genSalt(15)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


// Create and export User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
