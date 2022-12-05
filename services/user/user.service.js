const User = require('../../database/User.schema');

module.exports = {
  findByParams: async (filter = {}) => {
    return await User.find(filter);
  },
  findOneByParams: async (filter = {}) => {
    return await User.findOne(filter)
  },
  findAuth: async (userId) => {
    return User.aggregate([
      {
        $match: {_id: userId}
      },
      {
        $lookup:{
          from: 'O_Auth',
          localField: '_id',
          foreignField: 'User',
          as: 'O_Auth'
        }
      }
    ])
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