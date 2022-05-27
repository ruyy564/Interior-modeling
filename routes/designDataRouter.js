const Router = require('express');
const designDataController = require('../controllers/designDataController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.get(
  '/statuses',
  //[roleMiddleware(['ADMIN'])],
  designDataController.getStatuses
);

router.get(
  '/types',
  //[roleMiddleware(['ADMIN'])],
  designDataController.getTypes
);

router.get(
  '/databytype/:id',
  //[roleMiddleware(['ADMIN'])],
  designDataController.getDateByType
);

router.get(
  '/databystatus/:id',
  //[roleMiddleware(['ADMIN'])],
  designDataController.getDataByStatusId
);

router.get(
  '/databyuser/:id',
  //[roleMiddleware(['ADMIN'])],
  designDataController.getDataByUserId
);

router.get(
  '/data/:id',
  //[roleMiddleware(['ADMIN'])],
  designDataController.downloadData
);
router.post('/data', [roleMiddleware(['USER'])], designDataController.saveData);

router.put(
  '/data/:id',
  //[roleMiddleware(['ADMIN'])],
  designDataController.updateData
);

router.delete(
  '/data/:id',
  [roleMiddleware(['USER'])],
  designDataController.deleteData
);

router.put(
  '/publish/:id',
  [roleMiddleware(['USER'])],
  designDataController.publish
);

router.put(
  '/cancel/:id',
  [roleMiddleware(['USER'])],
  designDataController.cancel
);

router.put(
  '/accept/:id',
  [roleMiddleware(['USER'])],
  designDataController.accept
);

module.exports = router;
