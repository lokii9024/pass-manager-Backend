🔐 Password Manager Backend

A secure and scalable backend API for a Password Manager application built using Node.js, Express, and MongoDB. This backend supports user authentication and CRUD operations for storing, updating, and deleting password entries.

🚀 Features

✅ User Signup & Login with JWT authentication

🔐 Secure password storage (you can enhance with encryption)

📦 Add, Update, Delete, and Fetch saved passwords

🧑‍💻 User-based data isolation

🌐 CORS and environment-based config

🧪 Error handling and input validation

💠 Tech Stack

Backend: Node.js, Express

Database: MongoDB + Mongoose

Auth: JWT-based Authentication

Others: dotenv, cors, nodemon, bcrypt, cookie-parser

📁 Project Structure

/backend
│
├── controllers/
│   └── pass.controller.js        # CRUD logic for pass entries
├── models/
│   ├── User.js                   # Mongoose User model
│   └── Passes.js                 # Mongoose Pass model
├── routes/
│   ├── user.routes.js            # User auth routes
│   └── pass.routes.js            # Password CRUD routes
├── middlewares/
│   └── auth.middleware.js        # JWT auth middleware
├── .env                          # Environment variables
├── app.js                        # Express app setup
└── server.js                     # Server entry point

⚙️ Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/password-manager-backend.git
cd password-manager-backend

2. Install Dependencies

npm install

3. Setup Environment Variables

Create a .env file in the root:

PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000

4. Run the Server

npm run dev

Server runs on http://localhost:8000

📡 API Endpoints

🔐 Auth Routes (/api/v1/users)

POST /signup — Register new user

POST /signin — Login user and receive JWT

POST /logout — Logut the current user

🔐 Password Routes (/api/v1/passes) — Protected

POST /add-pass — Add a new password entry

POST /update-pass — Update an existing entry

DELETE /delete-pass — Delete a saved entry

GET /all — Fetch all saved entries

All /passes routes require a valid JWT in Authorization header.

🔒 Authentication

Uses JWT stored in Authorization header (Bearer token)

Middleware (auth.middleware.js) validates the token and attaches req.user



📦 Dev Dependencies

npm install --save-dev nodemon eslint



👨‍💼 Author

Lokesh VaishnavBuilt with 💙 to learn full-stack development and security best practices.



