const User = require('../database/user.schema');

module.exports = {
  findByParams: async (filter = {}) => {
    return User.find(filter)
  },
  findByOneParams: async (filter = {}) => {
    return User.findOne(filter)
  },
  createUser: async (userObject) => {
    return User.create(userObject)
  },
  updateUser: async (userId, newInfo) => {
    return User.findByIdAndUpdate(userId, newInfo, { new: true })
  },
  updateOnne: async (_id = {}, password = {}) => {
    return User.updateOne(_id, password, { new: true })
  },
  deleteUserOne: async (userId) => {
    return User.deleteOne({ _id: userId })
  }
};
