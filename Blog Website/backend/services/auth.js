const jwt = require('jsonwebtoken');
const { isTokenIncluded, getAccessTokenFromHeader } = require('../Helper/tokenHepler');

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  }

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30d" })
  return token
}

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  if(!isTokenIncluded(req)){
    throw new Error("You are not authorized to access this route ")
  }

  const access_token = getAccessTokenFromHeader(req)

  jwt.verify(access_token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { createTokenForUser, authenticateToken }