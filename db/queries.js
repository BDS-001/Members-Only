const pool = require('./pool')

async function addUser(user) {
    const {firstName, lastName, username, password} = user
    await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, username, password])
}

async function getAllMessages() {
    return await pool.query('SELECT messages.id, messages.message, messages.timestamp, users.username FROM messages JOIN users ON messages.user_id = users.id')
}

async function addNewMessage(userId, message) {
    await pool.query('INSERT INTO messages (user_id, message) VALUES ($1, $2)', [userId, message])
}

async function deleteMessage(id) {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}

async function validateSecret(secret) {
    return await pool.query('SELECT grants_member, grants_admin FROM secrets WHERE secret = $1', [secret])
}

async function updateUserStatus(userId, membership, admin) {
    await pool.query('UPDATE users SET is_member = $1, is_admin = $2 WHERE id = $3', [membership, admin, userId])
}

module.exports = {
    addUser,
    getAllMessages,
    addNewMessage,
    deleteMessage,
    validateSecret,
    updateUserStatus
}