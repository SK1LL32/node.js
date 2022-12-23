const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
require('dotenv').config();

const { userRouter, authRouter } = require('./router');
const config = require('./config/config');
const { cronRunner } = require('./cron');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    massage: err.massage || 500,
    status: err.status || 500
  });
});

mongoose.set('strictQuery', false);

app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGO_URL);
  console.log(`Server start ${config.PORT}`);
  // cronRunner();
});