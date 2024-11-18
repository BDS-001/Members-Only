const bcrypt = require('bcryptjs');
const passport = require('../config/passport')
const db = require('../db/queries')

async function getHomepage(req, res) {
    const result = await db.getAllMessages()
    const messages = result.rows
    res.render("index", {messages: messages})
}

function getLoginPage(req, res) {
  res.render("login")
}

function getUserSignUp(req, res) {
    res.render('sign-up-form')
}

async function postUserSignUp(req, res, next) {
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
};

const postLogIn = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
});

function getLogOut(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
};

function getMembership(req,res) {
  res.render("membership")
}

module.exports = {
    getHomepage,
    getLogOut,
    getUserSignUp,
    postLogIn,
    postUserSignUp,
    getLoginPage,
    getMembership
}