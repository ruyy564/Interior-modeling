const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

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
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(500).json({ message: 'Пользователь уже существует' });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashPassword });

      await user.save();
      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      res.status(500).json({ message: 'Не работает' });
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
      const token = jwt.sign({ userId: user.id }, 'Secret', {
        expiresIn: '1h',
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
