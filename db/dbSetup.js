const pool = require('./pool');

setupQuery = `
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR( 255 ) NOT NULL,
    last_name VARCHAR( 255 ) NOT NULL,
    username VARCHAR( 255 ) NOT NULL UNIQUE,
    password VARCHAR ( 255 ) NOT NULL,
    is_member BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
);

CREATE TABLE messages (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`

checkTables = `
SELECT COUNT(*) = 2 as both_exist
FROM information_schema.tables 
WHERE table_name IN ('users', 'messages');
`

async function setupDatabase() {
    console.log("Setting up database...");
    
    try {
      const res = await pool.query(checkTables)
      const tablesExist = res.rows[0].both_exist
      if (!tablesExist) {
        console.log("The tables do not exist. Creating...");
        await pool.query(setupQuery);
        console.log("Tables created successfully.");
      } else {
        console.log("Tables already exists. Skipping setup.");
      }
    } catch (err) {
        console.error('Error setting up database:', err);
        throw err;
    }
  }
  
module.exports = { setupDatabase };