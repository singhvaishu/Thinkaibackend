# Personal Blog Platform - Backend

## Overview
This is the backend for the personal blog platform, built with Node.js and Express. It handles user registration, login, and post creation. It also provides endpoints to retrieve blog posts, including filtering by author.

---

## Features

1. **API Endpoints**:
   - `POST /signup`: Registers a new user with email and password.
   - `POST /login`: Authenticates a user and returns a session token.
   - `POST /post`: Allows authenticated users to post a new article.
   - `GET /posts`: Retrieves all posts.
   - `GET /posts?author=userId`: Retrieves posts by a specific author.

2. **Authentication**:
   - JWT-based authentication for secure user sessions.
   - Secure password storage using bcrypt.

3. **Data Models**:
   - **User**: 
     - `id`: Unique identifier for the user.
     - `email`: User's email address.
     - `passwordHash`: Hashed password for secure storage.
   - **Post**: 
     - `id`: Unique identifier for the post.
     - `title`: Title of the post.
     - `content`: Content of the post.
     - `authorId`: Reference to the user who created the post.
     - `createdAt`: Timestamp for when the post was created.

---

## Setup Instructions

### Prerequisites
- Node.js >= 16.x
- MongoDB instance running locally or on the cloud.
- NPM >= 8.x

### Steps to Run the Backend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/singhvaishu/Thinkaibackend
2. **Install dependencies**:
   ```bash
   npm install
   

3 **Backend: Create a .env file in the backend folder with the following variables**:
env
PORT=5000
JWT_SECRET=<your-jwt-secret>
MONGO_URI=<your-mongodb-connection-string>
Run the application:

4 **Start the backend server**
   ```bash
cd backend
node index.js
```
Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

