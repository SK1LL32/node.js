const bcrypt = require('bcrypt');

const ApiError = require("../../error/ApiError");

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePasswords: async (hashPassword, password) => {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsSame) {
      throw new ApiError('Wrong email or password', 400);
    }
  }
}
