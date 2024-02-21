const {model, Schema} = require("mongoose")

const UserSchema = new Schema({
    
})

const User = model("User", UserSchema)

module.exports = User