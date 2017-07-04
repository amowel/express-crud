const router = require('express').Router();
const userController = require('../controlers/user.controller');
const authController = require('../controlers/auth.controler');
const adminController = require('../controlers/admin.controller');


router.route('/users/count')
  .get(authController.verifyToken, userController.countUsers);

router.route('/users/:from-:to')
  .get(authController.verifyToken, userController.findByPosition);

router.route('/users/search/')
  .get(authController.verifyToken, userController.searchForUsers, userController.getAll, adminController.getAll);

router.route('/login')
  .post(authController.login);

router.route('/users')
  .get(authController.verifyToken, userController.getAll, adminController.getAll)
  .post(userController.post);

router.route('/users/:id')
  .get(authController.verifyToken, userController.get)
  .put(authController.verifyToken, userController.update)
  .delete(authController.verifyToken, userController.remove);

module.exports = router;
