const userService = require('../service/user.service');
const authService = require('../service/auth.service')
const emailService = require('../service/email.service')
const { FORGOT_PASS, WELCOME } = require('../enum/email.enum')

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
      const user = await userService.findByOneParams();
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {

      const hashPassword = await authService.hashPassword(req.body.password);

      const user = await userService.createUser({ ...req.body, password: hashPassword });

      await emailService.sendEmail('myroslav191@gmail.com', WELCOME);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const newUserInfo = req.body;
      const userId = req.params.userId;

      const user = await userService.updateUser(userId, newUserInfo);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {

      const user = await userService.deleteUserOne(req.params.userId);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
};
