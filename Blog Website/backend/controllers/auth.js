const Auth = require("./models/auth")

const handleSignUp = async (req,res) => {
    
    try {
        const {name, email, password} = req.body
        
        await Auth.create({name, email, password})
        res.status(201).

    } catch (error) {
        
    }

}


const handleSignIn = async (req,res) => {
    
}

module.exports = {handleSignIn, handleSignUp}