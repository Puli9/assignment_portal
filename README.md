# Assignment Submission Portal

## Table of Contents
- [Introduction](#introduction)
- [Project Features](#project-features)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Testing the Backend](#testing-the-backend)
- [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

## Introduction
This project is an **Assignment Submission Portal** that allows users and admins to interact in a secure environment:

- **Users** can upload assignments.
- **Admins** can review, accept, or reject assignments.

The backend is built using **Node.js**, **Express**, and **MongoDB** with **Mongoose** for data modeling. **JWT** is used for authentication, and **bcrypt** for password hashing.

## Project Features

### User Features:
- **User Registration**: Users can register with their email, password, and role as 'user'.
- **User Login**: Users can log in using their credentials.
- **Upload Assignments**: Users can upload assignments, specifying the task and the admin who will review it.

### Admin Features:
- **Admin Registration**: Admins can register with their email, password, and role as 'admin'.
- **Admin Login**: Admins can log in using their credentials.
- **View Assignments**: Admins can view all assignments assigned to them and see the user name, task and timedate data of each assignment.
- **Accept/Reject Assignments**: Admins can accept or reject specific assignments based on the review.

## Setup Instructions

### Prerequisites:
- **Node.js**: Version 12.x or higher.
- **MongoDB**: A MongoDB instance (local or MongoDB Atlas).
- **Postman**: For testing the API endpoints.

### Step 1: Clone the Repository
```bash
git clone https://github.com/Puli9/assignment-submission-portal.git
cd assignment-submission-portal
```

### Step 2: Install Dependencies
```bash
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken nodemon
```

This includes the initialization step (`npm init -y`) and the installation of common packages used in this project:

- `express`: For building the server.
- `mongoose`: For interacting with MongoDB.
- `dotenv`: For managing environment variables.
- `bcryptjs`: For hashing passwords.
- `jsonwebtoken`: For creating and verifying JWT tokens.
- `nodemon`: For automatically restarting the server during development.


### Step 3: Configure package.json
In the `package.json` file, update the `scripts` section as follows:
```json
"scripts": {
  "start": "nodemon index.js"
},
```

### Step 4: Configure Environment Variables
Create a `.env` file in the root of the project with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
- Replace `your_mongodb_connection_string` with your MongoDB URI.
- Replace `your_jwt_secret_key` with a secure key for JWT signing.

### Step 4: Start the Server
```bash
npm run start
```
The server will start on `http://localhost:5000` if not otherwise specified in the `.env` file.

## Environment Variables

| Variable    | Description                                 |
|-------------|---------------------------------------------|
| MONGO_URI   | Connection string for MongoDB instance.     |
| JWT_SECRET  | Secret key used for signing JWT tokens.     |
| PORT        | Port on which the server runs (default: 5000). |

## Database Models

1. User Model (`userModel.js`)
   - Fields: `name`, `email`, `password`, `role`
   - `role` can be either 'user' or 'admin'.

2. Admin Model (`adminModel.js`)
   - Fields: `name`, `email`, `password`, `role`
   - `role` is set to 'admin'.

3. Assignment Model (`assignmentModel.js`)
   - Fields: `userId`, `task`, `admin`, `status`, `createdAt`
   - `userId`: References the user who submitted the assignment.
   - `admin`: References the admin assigned to review the assignment.
   - `status`: Enum of ['pending', 'accepted', 'rejected'].

## API Endpoints

### User Endpoints:
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in a user and get a JWT token.
- `POST /api/users/upload`: Upload an assignment (requires Authorization header with token).
- `GET /api/users/admins`: Fetch a list of all admins.

### Admin Endpoints:
- `POST /api/admins/register`: Register a new admin.
- `POST /api/admins/login`: Log in an admin and get a JWT token.
- `GET /api/admins/assignments`: View all assignments assigned to the logged-in admin (requires Authorization header with token).
- `POST /api/admins/assignments/:id/accept`: Accept a specific assignment (requires Authorization header with token).
- `POST /api/admins/assignments/:id/reject`: Reject a specific assignment (requires Authorization header with token).

## Testing the Backend

You can use Postman to test the API endpoints. Here are the steps:

### 1. User Registration
   - **Method**: `POST`
   - **URL**: `http://localhost:5000/api/users/register`
   - **Body** (JSON):
     ```json
     {
       "name": "Alice",
       "email": "alice@example.com",
       "password": "password123",
       "role": "user"
     }
     ```
   - **Expected Result**:
     - **Status Code**: `201 Created`
     - **Response**:
       ```json
       { message: 'Registration successful'}
       ```

### 2. User Login
   - **Method**: `POST`
   - **URL**: `http://localhost:5000/api/users/login`
   - **Body** (JSON):
     ```json
     {
       "email": "alice@example.com",
       "password": "password123",
       "role": "user"
     }
     ```
   - **Expected Result**:
     - **Status Code**: `200 OK`
     - **Response**:
       ```json
       {
         "message": "Login successful",
         "token": "your_jwt_token_here"
       }
       ```

### 3. Upload Assignment
   - **Method**: `POST`
   - **URL**: `http://localhost:5000/api/users/upload`
   - **Headers**:
     - `Authorization: Bearer <your_jwt_token>`
   - **Body** (JSON):
     ```json
     {
       "userId": "Alice",
       "task": "task1",
       "admin": "Admin1"
     }
     ```
   - **Expected Result**:
     - **Status Code**: `201 Created`
     - **Response**:
       ```json
       {
         "message": "Assignment uploaded successfully",
       }
       ```

### 4. Admin Registration
   - **Method**: `POST`
   - **URL**: `http://localhost:5000/api/admins/register`
   - **Body** (JSON):
     ```json
     {
       "name": "Admin1",
       "email": "admin@example.com",
       "password": "adminpassword",
       "role": "admin"
     }
     ```
   - **Expected Result**:
     - **Status Code**: `201 Created`
     - **Response**:
       ```json
       { message: 'Registration successful'}
       ```

### 5. Admin Login
   - **Method**: `POST`
   - **URL**: `http://localhost:5000/api/admins/login`
   - **Body** (JSON):
     ```json
     {
       "email": "admin@example.com",
       "password": "adminpassword",
       "role": "admin"
     }
     ```
   - **Expected Result**:
     - **Status Code**: `200 OK`
     - **Response**:
       ```json
       {
         "message": "Login successful",
         "token": "your_jwt_token_here"
       }
       ```

### 6. View Assignments for Admin
   - **Method**: `GET`
   - **URL**: `http://localhost:5000/api/admins/assignments`
   - **Headers**:
     - `Authorization: Bearer <your_jwt_token>`
   - **Expected Result**:
     - **Status Code**: `200 OK`
     - **Response**:
       ```json
       [
         {
           "userName": "some_user_name"
           "task": "task1",
           "status": "pending",
           "createdAt": "some_date some_time"
         },
         {
           "userName": "another_user_name"
           "task": "task2",
           "status": "pending",
           "createdAt": "another_date another_time"
         }
       ]
       ```

### 7. Accept an Assignment
   - **Method**: `POST`
   - **URL**: `http://localhost:5000/api/admins/assignments/:id/accept` (replace `:id` with the assignment ID)
   - **Headers**:
     - `Authorization: Bearer <your_jwt_token>`
   - **Expected Result**:
     - **Status Code**: `200 OK`
     - **Response**:
       ```json
       {
         "message": "Assignment accepted successfully",
         "assignment": {
           "_id": "some_assignment_id",
           "userId": "some_user_id",
           "task": "task1",
           "admin": "some_admin_id",
           "status": "accepted",
           "createdAt": "2024-10-11T03:15:37.153Z"
         }
       }
       ```

### 8. Reject an Assignment
   - **Method**: `POST`
   - **URL**: `http://localhost:5000/api/admins/assignments/:id/reject` (replace `:id` with the assignment ID)
   - **Headers**:
     - `Authorization: Bearer <your_jwt_token>`
   - **Expected Result**:
     - **Status Code**: `200 OK`
     - **Response**:
       ```json
       {
         "message": "Assignment rejected successfully",
         "assignment": {
           "_id": "some_assignment_id",
           "userId": "some_user_id",
           "task": "Complete marketing analysis",
           "admin": "some_admin_id",
           "status": "rejected",
           "createdAt": "2024-10-11T03:15:37.153Z"
         }
       }
       ```

## Common Issues and Troubleshooting

- **401 Unauthorized**: Make sure to include the Authorization header with a valid JWT token.
- **404 Not Found**: Ensure the API URL is correct and that the `:id` is a valid MongoDB ObjectId.
- **500 Server Error**: Check server logs for error details, such as database connection issues or missing fields.
- **Missing Environment Variables**: Verify that the `.env` file exists and contains all necessary variables.