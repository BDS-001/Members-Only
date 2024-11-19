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
      res.redirect("/login");
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

function getMembership(req, res) {
  res.render("membership")
}

async function validateSecretPasscode(req, res, next) {
  try {
    const passcode = req.body.passcode
    const {rows} = await db.validateSecret(passcode)
    if (rows.length < 1) {
      return res.render('membership', {errors: [{msg: 'invalid secret passcode'}]})
    }
    const {grants_member, grants_admin} = rows[0]
    await db.updateUserStatus(req.user.id, grants_member, grants_admin)
    res.redirect('membership')
  } catch(err) {
    return next(err);
  }

}

module.exports = {
    getHomepage,
    getLogOut,
    getUserSignUp,
    postLogIn,
    postUserSignUp,
    getLoginPage,
    getMembership,
    validateSecretPasscode
}