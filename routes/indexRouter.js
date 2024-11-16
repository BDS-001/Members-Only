const router = require("express").Router();
const bcrypt = require('bcryptjs');
const passport = require('../config/passport')
const db = require('../db/queries')

router.get("/", (req, res) => res.render("index"));
router.get('/sign-up', (req, res) => res.render('sign-up-form'))
router.post("/sign-up", async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) return next(err)
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword
      }
      await db.addUser(user)
      res.redirect("/");
    } catch(err) {
      return next(err);
    }
  });
});
router.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
);
router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

module.exports = router