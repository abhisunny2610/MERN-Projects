const { model, Schema, default: mongoose } = require("mongoose")

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
    if()
})

const AUTH = model("auth", authSchema)

module.exports = AUTH




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
