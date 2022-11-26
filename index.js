const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const config = require('./config/config');
const helloRouter = require('./router/user.router')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', helloRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Unknown error',
    status: err.status || 500
  });
});

app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGO_URL);
  console.log(`Server ${config.PORT}`);
});
