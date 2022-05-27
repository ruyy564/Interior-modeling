const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const designDataRouter = require('./routes/designDataRouter');
const fillRouter = require('./routes/fillRouter');
const config = require('./config/common');

const PORT = process.env.PORT || config.port;
const URL = config.urlDb;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/api/auth', authRouter);
app.use('/api/design', designDataRouter);
app.use('/api/create', fillRouter);

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
