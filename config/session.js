const passport = require('./passport')
const session = require('express-session');
const pool = require('../db/pool')
const pgSession = require('connect-pg-simple')(session);

function setupSession(app) {
    const sessionStore = new pgSession({
        pool: pool,
        tableName: 'sessions',
        createTableIfMissing: true
    })
    const secret = process.env.SESSION_SECRET
    if (!secret) {
        throw new Error('SESSION_SECRET environment variable is required');
    }

    app.use(session({ 
        secret: secret, 
        resave: false, 
        saveUninitialized: false,
        store: sessionStore,
    }));
    app.use(passport.session());
}

module.exports = setupSession