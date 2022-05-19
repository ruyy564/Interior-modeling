const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const config = require('../config/common');

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }
      const { email, password, nickname } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const { id } = await UserRole.findOne({ name: 'ADMIN' });
      const user = new User({
        email,
        nickname,
        password: hashPassword,
        role: id,
      });

      await user.save();
      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      res.status(400).json({ message: 'Пользователь не создан' });
      console.log(e);
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: 'Пользователь не найден',
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: 'Неверный пароль',
        });
      }
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        config.secret,
        {
          expiresIn: '12h',
        }
      );

      res.json({
        message: 'Пользователь авторизирован',
        token,
        userId: user.id,
        roles: user.role,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: 'Ошибка при авторизации',
      });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
