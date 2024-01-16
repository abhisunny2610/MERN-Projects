const {Schema, model, trusted} = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema({

    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

}, {timestamps: true})

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(20)
    this.password = await bcrypt.hash(this.password, salt)
})  

userSchema.static("matchPassword", async function(password){
    return await bcrypt.compare(password, this.password)
})

const User = model("user", userSchema)

module.exports = User