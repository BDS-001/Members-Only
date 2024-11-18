function requireAuthSignedIn(req, res, next) {
    if (!req.user) {
        return res.redirect('/login')
    }
    next()
}

function requireAuthAdmin(req, res, next) {
    if (!req?.user?.is_admin) {
        return res.redirect('/')
    }
    next()
}

module.exports = {requireAuthSignedIn, requireAuthAdmin}