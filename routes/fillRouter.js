const Router = require('express');
const createController = require('../controllers/createController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.post(
  '/role',
  //, [roleMiddleware(['ADMIN'])]
  createController.createRole
);

router.post(
  '/typedata',
  //[roleMiddleware(['ADMIN'])],
  createController.createTypeData
);

router.post(
  '/status',
  //[roleMiddleware(['ADMIN'])],
  createController.createStatus
);

module.exports = router;
