const userService = require('../../service/user/user.service');
const oauthService = require('../../service/Auth/auth.service');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const users = await userService.findByParams();

      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  getById: async (req, res, next) => {
    try {
      const users = await userService.findOneByParams();

      res.json(users)
    } catch (e) {
      next(e)
    }
  },

  create: async (req, res, next) => {
    try {
      const hashPassword = await oauthService.hashPassword(req.body.password);

      const user = await userService.create({...req.body, password: hashPassword})

      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  },
  update: async (req, res, next) => {
    try {
      const {newInfo} = req.body;
      const {userId} = req.body.userId;

      const user = await userService.update(userId, newInfo);

      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  },

  delete: async (req, res, next) => {
    try {
      const user = await userService.delete(req.params.userId);

      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  }
}
