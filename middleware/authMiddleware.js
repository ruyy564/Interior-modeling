const jwt = require('jsonwebtoken');
const config = require('../config/common');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'Пользователь не авторизован' });
    }
    const decodeData = jwt.verify(token, config.secret);

    req.user = decodeData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Пользователь не авторизован' });
  }
};
