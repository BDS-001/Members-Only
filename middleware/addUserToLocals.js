const addUserToLocals = (req, res, next) => {
    res.locals.currentUser = req.user;
    console.log()
    next();
};

module.exports = addUserToLocals