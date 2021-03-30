const jwt = require("jsonwebtoken");
const JWT_SECRET = "keypassword";

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

module.exports = { generateToken };
