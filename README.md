# Members Only

A private clubhouse web application where members can write anonymous posts. Inside the clubhouse, members can see who wrote each post, but non-members can only see the content without knowing the author.

## Project Overview

Members Only is an exclusive platform where:
- Visitors can view messages but cannot see who posted them
- Members can see message authors and timestamps
- Admins have additional privileges to delete messages
- Users can register, login, and apply for membership using a secret passcode

## Features

- **User Authentication**:
  - Secure registration with bcrypt password hashing
  - Login/logout functionality using Passport.js
  - Session management with PostgreSQL session store

- **Permission Levels**:
  - Visitors: Can only view message content
  - Members: Can view message content, authors, and timestamps
  - Admins: Can view all information and delete messages

- **Messaging System**:
  - Create new messages (authenticated users only)
  - View all messages
  - Delete messages (admin only)

- **Membership Management**:
  - Secret passcode entry to gain member status
  - Admin designation through secret passcode

## Technology Stack

- **Backend**:
  - Node.js with Express
  - PostgreSQL database
  - EJS templating engine
  
- **Authentication & Security**:
  - Passport.js for authentication
  - bcrypt.js for password hashing
  - express-session for session management
  - connect-pg-simple for PostgreSQL session store
  
- **Validation**:
  - express-validator for form validation and sanitation

## Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_USERNAME=your_db_username
   DATABASE_PASS=your_db_password
   DATABASE_PORT=5432
   DATABASE_NAME=your_db_name
   SESSION_SECRET=your_session_secret
   USE_PORT=3000
   ```
4. Setup your PostgreSQL database
5. Start the server
   ```
   npm start
   ```

## Database Schema

The application uses three main tables:

1. **users**:
   - id (PK)
   - first_name
   - last_name
   - username (unique)
   - password (hashed)
   - is_member (boolean)
   - is_admin (boolean)

2. **messages**:
   - id (PK)
   - user_id (FK)
   - message (text)
   - timestamp

3. **secrets**:
   - id (PK)
   - secret
   - is_active
   - grants_member
   - grants_admin

## Application Structure

- `/config` - Configuration files for Passport and sessions
- `/controllers` - Controller logic for users and messages
- `/db` - Database setup and queries
- `/middleware` - Custom middleware
- `/public` - Static files (CSS, JS, images)
- `/routes` - Express routes
- `/views` - EJS templates
- `app.js` - Main application entry point

## Usage

1. Register a new account with your first name, last name, username, and password
2. Log in with your credentials
3. To become a member, navigate to the Membership page and enter the secret passcode
4. Once a member, you can see who wrote each message and when
5. If you're an admin, you can also delete messages

## Secret Passcodes

To set up initial secret passcodes for membership and admin access, insert records into the `secrets` table:

```sql
INSERT INTO secrets (secret, is_active, grants_member, grants_admin) 
VALUES ('member_secret_passcode', TRUE, TRUE, FALSE);

INSERT INTO secrets (secret, is_active, grants_member, grants_admin) 
VALUES ('admin_secret_passcode', TRUE, TRUE, TRUE);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
