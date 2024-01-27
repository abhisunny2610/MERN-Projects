const User = require("../Models/UserModel")

const login = async (req, res) => {

}

const singup = async (req, res) => {
    const { name, email, password, profileImage } = req.body

    try {
        // check if all required fields are provided
        if (!name || !email || !password){
            res.status(400).json({error: "Please Enter all the Fields"})
        }
    
        // check if user with the provided email already exists
        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400).json({error: "User email already exists."})
        }

        // create a new user
        const newUser = await User.create({
            name, email, password, profileImage
        })

        res.status(201).json({message: "User created successfully"})
        
    } catch (error) {
        res.status(500).json({error: "Internal server error."})
    }

}

module.exports = { login, singup }