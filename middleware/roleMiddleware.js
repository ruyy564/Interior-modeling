const jwt = require('jsonwebtoken');
const Role = require('../models/Role');

module.exports = (accessRoles) => {
  return async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(400).json({ message: 'Пользователь не авторизован' });
      }
      const decodeData = jwt.verify(token, 'Secret');
      const { value } = await Role.findOne({ _id: decodeData.role });

      if (!accessRoles.includes(value)) {
        return res.status(400).json({ message: 'У пользователя нет доступа' });
      }
      req.user = decodeData;
      next();
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Пользователь не авторизован' });
    }
  };
};
