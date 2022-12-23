const User = require('../database/user.schema');

module.exports = {
  findByParams: async (filter = {}) => {
    return User.find(filter)
  },
  findByOneParams: async (filter = {}) => {
    return User.findOne(filter)
  },
  findAggregate : async (userId) => {
    const res = await User.aggregate([
      {
        $match: {
          _id: userId
        }
      },
      {
        $lookup: {
          from: 'ActionToken',
          localField: '_id',
          foreignField: 'User',
          as: 'ActionToken',
        }
      }
    ]);

    return res[0];
  },
  createUserWithHashPassword: async (e) => {
    return User.createUserWithHashPassword(e);
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
