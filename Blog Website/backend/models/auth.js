const { model, Schema, default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt');
const { createTokenForUser } = require("../services/auth");

const authSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length >= 8;
            },
            message: 'Password must be at least 8 characters long.'
        }
    }
}, {timestamps:true})

authSchema.pre("save", async function(next){
    
    const user = this

    if(!user.isModified('password')) return next()
    const salt = await bcrypt.genSalt(20)
    const hashedPassword = await bcrypt.hash(user.password, salt)

    user.password = hashedPassword

})

authSchema.static("matchPassword", async function(res,email,password){
    const user = await this.findOne({email})

    if(!user){
        res.status(404) 
        throw new Error("User not found")
    }
    
    const validPassowrd = await bcrypt.compare(password, user.password)
    if(!validPassowrd){
        res.status(404)
        throw new Erro("Invalid username or password")
    }

    const token = createTokenForUser(user)
    return token
})

const Auth = model("auth", authSchema)

module.exports = Auth




// const createAuthCollection = async () => {
//     try {
//       // Import the "AUTH" model
//       const AUTH = require('./models/auth'); // Update the path accordingly
  
//       // Create a new document and save it to the "auth" collection
//       const newAuthUser = new AUTH({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         password: 'password123',
//       });
  
//       await newAuthUser.save();
  
//       console.log('Auth document saved successfully.');
//     } catch (error) {
//       console.error('Error creating "auth" collection:', error);
//     } finally {
//       // Close the connection when done (optional)
//       mongoose.connection.close();
//     }
//   };
