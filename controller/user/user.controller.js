const {userService} = require('../../service');
const oauthService = require('../../service/oAuth/oAuth.service');

module.exports = {
  getAll: async (req, res, next) => {
    try {

      const users = await userService.findByParams();

      res.json(users)

    } catch (e) {
      next(e)
    }
  },
  getById: async (req, res, next) => {
    try {

      const users = await userService.findOneByParams()

      res.json(users)
    } catch (e) {
      next(e)
    }
  },

  update: async (req, res, next) => {
    try {
      const newUserInfo = req.body;
      const userId = req.body.userId;

      const user = await userService.update(userId, newUserInfo)

      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  },
  create: async (req, res, next) => {
    try {
      try {
        const hashPassword = await oauthService.hashPassword(req.body.password);

        await userService.create({ ...req.body, password: hashPassword });

        res.status(201).json('Ok')
      } catch (e) {
        next(e);
      }
      res.status(201).json('ok');
    } catch (e) {
      next(e)
    }
  },
  delete: async (req, res, next) => {
    try {
      const user = await userService.delete(req.params.userId);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
};
