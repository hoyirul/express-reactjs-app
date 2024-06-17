var express = require('express');
var router = express.Router();
const { authJwt, verifySignUp } = require("../middlewares");
const authcontroller = require("./../controllers/api/auth.controller");
const userController = require('./../controllers/api/user.controller');
const roleController = require('./../controllers/api/role.controller');

router.post(
  "/auth/signup",
  [
    verifySignUp.checkDuplicateEmail,
    // verifySignUp.checkRolesExisted
  ],
  authcontroller.signup
);

router.post("/auth/signin", authcontroller.signin);
router.post("/auth/signout", authJwt.verifyToken, authcontroller.signout);
// Profile route
router.get("/auth/profile", authJwt.verifyToken, authcontroller.profile);

// User routes
router.route('/users')
  .get([authJwt.verifyToken, authJwt.isAdmin], userController.index)
  .post([authJwt.verifyToken, authJwt.isAdmin], userController.store);

router.route('/users/:id')
  .get([authJwt.verifyToken, authJwt.isAdmin], userController.show)
  .put([authJwt.verifyToken, authJwt.isAdmin], userController.update)
  .delete([authJwt.verifyToken, authJwt.isAdmin], userController.destroy);

// Role routes
router.route('/roles')
  .get([authJwt.verifyToken, authJwt.isOperatorOrAdmin], roleController.index)
  .post([authJwt.verifyToken, authJwt.isOperatorOrAdmin], roleController.store);

router.route('/roles/:id')
  .get([authJwt.verifyToken, authJwt.isOperatorOrAdmin], roleController.show)
  .put([authJwt.verifyToken, authJwt.isOperatorOrAdmin], roleController.update)
  .delete([authJwt.verifyToken, authJwt.isOperatorOrAdmin], roleController.destroy);

module.exports = router;
