const { Schema, model } = require('mongoose');

const authService = require('../service/auth.service');

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  password: { type: String, required: true },
  phone: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics = {
  async createUserWithHashPassword(userObject) {
    const hashPassword = await authService.hashPassword(userObject.password);

    return this.create({ ...userObject, password: hashPassword });
  }
};

userSchema.methods = {
  async comparePasswords(password) {
    await authService.comparePassword(this.password, password);
  }
};


module.exports = model('User', userSchema);
