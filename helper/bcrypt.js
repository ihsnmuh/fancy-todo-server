const bcrypt = require("bcrypt");

function hashPassword(inputPassword) {
  return bcrypt.hashSync(inputPassword, 8);
}

function comparePassword(inputPassword, encryptedPassword) {
  return bcrypt.compareSync(inputPassword, encryptedPassword);
}

module.exports = { hashPassword, comparePassword };
