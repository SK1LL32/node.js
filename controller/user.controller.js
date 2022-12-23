const { userService, emailService, s3Service } = require('../service');
const { WELCOME } = require('../enum/email.enum');

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

      const user = await userService.createUserWithHashPassword(req.body);

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
  },
  uploadAvatar: async (req, res, next) => {
    try {
      const uploadedData = await s3Service.uploadPublicFile(req.files.avatar, 'user', req.user._id);

      const updatedUser = await userService.updateUser(req.user._id, { avatar: uploadedData.Location })

      res.json(updatedUser)
    } catch (e) {
      next(e)
    }
  }
};
