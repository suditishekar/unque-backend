# College Appointment Booking Backend

This repository contains the backend implementation for a college appointment booking system, built as part of an engineering intern take-home assignment.

The system allows professors to define their availability and students to book and manage appointments in a secure, role-based manner.

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

# Authentication & Roles

The system supports two user roles:
- Student
- Professor

Authentication is handled using JSON Web Tokens (JWT).  
All protected routes require a valid token.

# Core Features
 User Authentication
- User registration
- User login with JWT-based authentication

 Professor Features
- Create availability slots
- View pending appointments
- Cancel appointments booked with students

Student Features
- View available (unbooked) slots
- Book appointments
- View pending appointments

Appointment Management
- Prevents double booking
- Cancelling an appointment frees the availability slot
- Appointments are tracked using status (`booked`, `cancelled`)

# Project Structure
src/
├── config/ # Database configuration
├── middleware/ # Authentication middleware
├── models/ # Mongoose schemas
├── routes/ # API routes
├── app.js # Express app setup
index.js # Server entry point

# Running the Project Locally
1. Clone the repository
git clone https://github.com/suditishekar/unque-backend.git
cd backend
2. Install dependencies
npm install
3. Environment variables
Create a .env file with the following:
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
Note: The `.env` file is intentionally excluded from version control.
4. Start the server
node index.js


