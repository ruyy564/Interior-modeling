const Router = require('express');
const designDataController = require('../controllers/designDataController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.get('/statuses', authMiddleware, designDataController.getStatuses);

router.get('/types', authMiddleware, designDataController.getTypes);

router.get(
  '/databytype/:id',
  authMiddleware,
  designDataController.getDateByType
);

router.get(
  '/databystatus/:id',
  authMiddleware,
  designDataController.getDataByStatusId
);

router.get(
  '/databyuser/:id',
  authMiddleware,
  designDataController.getDataByUserId
);

router.get(
  '/catalogbyuser/:id',
  authMiddleware,
  designDataController.getDataCatalog
);
router.get('/alldata/:id', authMiddleware, designDataController.getAllData);
router.get('/data/:id', authMiddleware, designDataController.downloadData);
router.post('/data', authMiddleware, designDataController.saveData);

router.put('/data/:id', authMiddleware, designDataController.updateData);

router.delete('/data/:id', authMiddleware, designDataController.deleteData);

router.put('/publish/:id', authMiddleware, designDataController.publish);

router.put('/cancel/:id', authMiddleware, designDataController.cancel);

router.put('/accept/:id', authMiddleware, designDataController.accept);

module.exports = router;
