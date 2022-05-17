const jwt = require('jsonwebtoken');
const Role = require('../models/Role');

module.exports = (accessRoles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(400).json({ message: 'Пользователь не авторизован' });
      }
      const { roles } = jwt.verify(token, 'Secret');
      let hasRole = false;

      roles.forEach((role) => {
        if (accessRoles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(400).json({ message: 'У пользователя нет доступа' });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Пользователь не авторизован' });
    }
  };
};
