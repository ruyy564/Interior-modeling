const Router = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.get('/users', authController.getUsers);

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
