const User = require('../../database/models/user.schema');

module.exports = {
  findByParams: async (filter = {}) => {
    return await User.find(filter);
  },
  findOneByParams: async (filter = {}) => {
    return await User.findOne(filter)
  },
  create: async (userInfo) => {
    return await User.create(userInfo)
  },
  update: async (userId, newInfo) => {
    return await User.findByIdAndUpdate(userId, newInfo, {new: true})
  },
  delete: async (userId) => {
    return await User.deleteOne({id: userId})
  },
}
