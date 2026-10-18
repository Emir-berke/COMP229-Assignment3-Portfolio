# COMP229 Assignment 2 – Portfolio Backend

## Project Description

This project is a portfolio application developed for COMP229 Assignment 2. It uses a Node.js and Express.js backend with MongoDB for database management and a React frontend.

The backend provides RESTful API endpoints for managing contacts, projects, qualifications, and users. It also includes JWT-based authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- React
- Vite
- JSON Web Tokens (JWT)
- JavaScript
- HTML and CSS

## Database Collections

The MongoDB database is named `Portfolio` and contains four collections:

1. Contacts
2. Projects
3. Qualifications
4. Users

## RESTful API Endpoints

Each collection supports the following CRUD operations:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/contacts` | Retrieve all contacts |
| GET | `/api/contacts/:id` | Retrieve a contact by ID |
| POST | `/api/contacts` | Create a contact |
| PUT | `/api/contacts/:id` | Update a contact |
| DELETE | `/api/contacts/:id` | Delete a contact |
| DELETE | `/api/contacts` | Delete all contacts |

The same CRUD structure is implemented for `/api/projects`, `/api/qualifications`, and `/api/users`.

## Authentication

The application uses JSON Web Tokens (JWT) for authentication.

Authentication endpoints:

- `POST /auth/signin` — Sign in and receive a JWT.
- `GET /auth/signout` — Sign out.

Protected user routes require a valid JWT bearer token. Authorization checks prevent users from modifying another user's account through the user-specific update and delete endpoints.

## Installation

1. Clone the GitHub repository.
2. Open the project folder.
3. Install backend dependencies using `npm install`.
4. Install frontend dependencies using `cd client` followed by `npm install`.
5. Configure the required environment variables.
6. Start the application using `npm run dev` from the `client` folder.

## Environment Variables

Create a `.env` file in the main project folder containing:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to GitHub.

## API Testing

The RESTful API endpoints were tested using Talend API Tester. The testing included CRUD operations, JWT authentication, and authorization responses.

MongoDB Compass was used to verify the database collections.

## GitHub Repository

https://github.com/Emir-berke/COMP229-Assignment2-Portfolio

## Course

COMP229 – Web Application Development

Assignment 2 – Portfolio Backend
