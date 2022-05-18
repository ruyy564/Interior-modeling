const Router = require('express');
const projectController = require('../controllers/projectController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.post(
  '/createrole',
  // [roleMiddleware(['ADMIN'])],
  projectController.createRole
);

router.post(
  '/createtype',
  // [roleMiddleware(['ADMIN'])],
  projectController.createType
);

router.get(
  '/projectsbytype/:id',
  // [roleMiddleware(['ADMIN'])],
  projectController.getProjectsByType
);

router.get(
  '/projectsbyuser/:id',
  // [roleMiddleware(['ADMIN'])],
  projectController.getProjectsByUserId
);

router.get(
  '/projects/:id',
  // [roleMiddleware(['ADMIN'])],
  projectController.getProjectsById
);

router.post(
  '/saveproject',
  [roleMiddleware(['ADMIN'])],
  projectController.saveProject
);

router.get(
  '/downloadproject/:id',
  [roleMiddleware(['ADMIN'])],
  projectController.downloadProject
);

router.put(
  '/updateproject/:id',
  [roleMiddleware(['ADMIN'])],
  projectController.updateProject
);

router.delete(
  '/deleteproject/:id',
  [roleMiddleware(['ADMIN'])],
  projectController.deleteProject
);

module.exports = router;
