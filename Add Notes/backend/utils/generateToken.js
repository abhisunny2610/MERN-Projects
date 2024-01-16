const jwt = require('jsonwebtoken')

function generateToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    return token
}

module.exports = generateToken