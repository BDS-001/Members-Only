const router = require("express").Router();
const userController = require('../controllers/userController')
const messageController = require('../controllers/messageController')
const requireAuth = require('../middleware/requireAuth')

router.get("/", userController.getHomepage);
router.get("/sign-up", userController.getUserSignUp);
router.post("/sign-up", userController.postUserSignUp);
router.get('/login', userController.getLoginPage)
router.post("/login", userController.postLogIn);
router.get("/log-out", userController.getLogOut);
router.get('/new-message', messageController.getNewMessage)
router.post('/new-message', requireAuth, messageController.postNewMessage)

module.exports = router