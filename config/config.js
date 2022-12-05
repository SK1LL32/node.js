module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_ID: process.env.MONGO_ID || "mongodb://localhost:27017/june",

  ACCESS: process.env.ACCESS_TOKEN,
  REFRESH: process.env.REFRESH_TOKEN,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
};
