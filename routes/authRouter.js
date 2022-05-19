const Router = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = new Router();

router.get('/users', authController.getUsers);

router.post(
  '/registration',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Мин длина пароля 6 символов').isLength({ min: 6 }),
    check('nickname', 'Введите nickname').exists(),
  ],
  authController.registration
);

router.post(
  '/login',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  authController.login
);

module.exports = router;
