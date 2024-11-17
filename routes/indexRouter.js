const router = require("express").Router();
const userController = require('../controllers/userController')

router.get("/", userController.getHomepage);
router.get("/sign-up", userController.getUserSignUp);
router.post("/sign-up", userController.postUserSignUp);
router.get('/login', userController.getLoginPage)
router.post("/login", userController.postLogIn);
router.get("/log-out", userController.getLogOut);

module.exports = router