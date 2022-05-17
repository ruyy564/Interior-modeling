const Router = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = new Router();

router.post(
  '/registration',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Мин длина пароля 6 символов').isLength({ min: 6 }),
  ],
  authController.registration
);

router.post(
  '/login',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Ввудите пароль').exists(),
  ],
  authController.login
);

module.exports = router;
