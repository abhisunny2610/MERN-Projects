const asyncHandler = require("express-async-handler")

// for register
const register = asyncHandler(async (req,res,next) =>{
    const {firstName, lastName, email, password, phoneNumber, type} = req.body
})

module.exports = {register}