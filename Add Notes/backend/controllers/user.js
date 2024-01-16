const express = require('express')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const handleSingup = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        fullName: fullName,
        email: email,
        password: password,
    })

    if(user){
        res.status(201).json({
            _id: user._id, fullName: user.fullName, email: user.email
        })
    }else{
        res.status(400)
        throw new Error("Error Occured")
    }

})

const handleSignin = asyncHandler(async() => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && user.ma){
        res.status()
    }

})


module.exports = { handleSingup, handleSignin }