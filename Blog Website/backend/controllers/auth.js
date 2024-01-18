const Auth = require("./models/auth")

const handleSignUp = async (req,res) => {
    
    try {
        const {name, email, password} = req.body
        
        const userExists = await Auth.findOne({email})

        if(userExists){
            res.status(404)
            throw new Error("User Already Exists")
        }

        const user = await Auth.create({name, email, password})
        
        if (user) {
            res.status(201).json({
                _id: user._id, name:user.name, email:user.email
            })
        } else {
            res.status(400)
            throw new Error("Something wents wrong.")
        }

    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

}


const handleSignIn = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {handleSignIn, handleSignUp}