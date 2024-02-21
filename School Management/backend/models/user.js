const {model, Schema} = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new Schema({
    username:{
        type: String,
        required:true,
        trim: true
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
    role: {
        type:String,
        enum: ["admin", "teacher", "student"],
        required: true,
        default: "student"
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

UserSchema.pre("save", async function(this){
    if(!this.isModified) next()

    const salt = await bcrypt.genSalt(16)
    this.password = bcrypt.hash(this.password , salt)
})

const User = model("User", UserSchema)

module.exports = User