const pool = require('./pool')

async function addUser(user) {
    const {firstName, lastName, username, password} = user
    await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, username, password])
}

module.exports = {
    addUser,
}