const jwt = require('jsonwebtoken')

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
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { createTokenForUser, authenticateToken }