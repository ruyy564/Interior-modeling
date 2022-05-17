const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT || 5000;
const URL = 'mongodb://localhost:27017';
const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(URL);
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
