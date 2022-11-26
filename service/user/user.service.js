const User = require('../../database/User.schema');

module.exports = {
  findByParams: async (filter = {}) => {
    return await User.find(filter);
  },
  findOneByParams: async (filter = {}) => {
    return await User.findOne(filter)
  },
  create: async (userObject) => {
    return await User.create(userObject)
  },
  update: async (userId, newInfo) => {
    return await User.findByIdAndUpdate(userId, newInfo, {new: true})
  },
  delete: async (userId) => {
    return await User.deleteOne({id: userId})
  },
}