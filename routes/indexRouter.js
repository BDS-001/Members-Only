const router = require("express").Router();
const userController = require('../controllers/userController')

// Routes using controller methods
router.get("/", userController.getHomepage);
router.get("/sign-up", userController.getUserSignUp);
router.post("/sign-up", userController.postUserSignUp);
router.post("/log-in", userController.postLogIn);
router.get("/log-out", userController.getLogOut);

module.exports = router