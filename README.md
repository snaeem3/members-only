# Members-Only

This project showcases a Node.js application for a members-only website as part of the [Odin Project](https://www.theodinproject.com/lessons/nodejs-members-only) curriculum. Users can view messages on the site, but only logged in members can view the authors and dates of the messages. It includes authentication features using Passport.js, session management, and a MongoDB database with Mongoose. The application is built on the Express.js framework and utilizes various middleware for enhanced functionality.

<details> 
  <summary>Membership Hint: </summary>
   NewMember123 
</details>

## Skills involved in this project

- User authentication with [Passport.js](https://www.passportjs.org/)
  - LocalStrategy for username and password authentication
  - Managing user sessions and serialization/deserialization
- Secure password hashing using bcrypt
- Database integration with MongoDB using Mongoose to store users and messages
- Routing with modular route handlers (`indexRouter`, `usersRouter`, etc.)
- Environment configuration using a `.env` file using `dotenv`
- Asynchronous programming using `async/await`
- MVC (Model-View-Controller) pattern for structuring the application
- Form validation and sanitization using `express-validator`
- Dynamic view rendering using [ejs](https://ejs.co/)

## Prerequisites

Before you get started with this application, make sure you have the following prerequisites installed on your system:

- Node.js (version >= 18.12.1)
- npm (Node Package Manager)

## Installation

To run the Members-Only application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/snaeem3/members-only.git
   ```

2. Change into the project directory:

   ```bash
   cd members-only
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following variables:

   ```env
   MONGODB_URI=your_mongodb_uri
   MEMBER_PASSCODE=your_member_passcode
   ADMIN_PASSCODE=your_admin_passcode
   ```

   Replace `your_member_passcode` and `your_admin_passcode` with secret passcodes of your choosing. Replace `your_mongodb_uri` with the MongoDB connection URI.

## Usage

### Development

To run the application in development mode with automatic restarts (using Nodemon), use the following command:

```bash
npm run serverstart
```

### Production

For a production-ready start, use:

```bash
npm start
```

## Scripts

- `start`: Start the application in production mode.
- `devstart`: Start the application in development mode with Nodemon for automatic restarts.
- `serverstart`: Start the server with debugging enabled.
- `lint`: Run ESLint to lint the code.
- `lint:fix`: Run ESLint and attempt to automatically fix linting issues.

## Dependencies

- `bcryptjs`: Password hashing library.
- `connect-flash`: Flash message middleware.
- `cookie-parser`: Parse cookie headers.
- `debug`: Debugging utility.
- `dotenv`: Load environment variables from a `.env` file.
- `ejs`: Embedded JavaScript templates.
- `eslint-config-wesbos`: ESLint configuration based on Wes Bos's preferences.
- `express`: Web application framework.
- `express-async-handler`: Handle asynchronous errors in Express middleware.
- `express-session`: Session middleware for Express.
- `express-validator`: Validation middleware for Express.
- `http-errors`: HTTP error handling.
- `mongoose`: MongoDB object modeling for Node.js.
- `morgan`: HTTP request logger middleware.
- `passport`: Authentication middleware.
- `passport-local`: Passport strategy for authenticating with a username and password.

## Dev Dependencies

- `nodemon`: Monitor for changes and automatically restart the server.
