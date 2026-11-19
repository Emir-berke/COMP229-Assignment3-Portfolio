# COMP229 Assignment 3 – Full Stack Portfolio Application

## Project Description

This project is a full-stack portfolio application developed for COMP229 – Web Application Development, Assignment 3 at Centennial College.

The application was built using the MERN stack (MongoDB, Express.js, React, and Node.js). It connects the React frontend to a REST API backend and uses MongoDB Atlas to store application data.

Assignment 3 extends the previous portfolio application by adding user authentication, role-based authorization, React forms, state management, and frontend CRUD operations.

## Technologies Used

- **Frontend:** React, Vite, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Development Tools:** Visual Studio Code, Git, GitHub, MongoDB Compass, Talend API Tester

## Main Features

### 1. User Authentication

- User registration (Sign Up)
- User login (Sign In)
- User logout (Sign Out)
- JWT-based authentication
- Protected backend API routes
- User and Admin roles

### 2. Role-Based Authorization

The application supports two user roles:

**Admin**
- Create, read, update, and delete project records
- Create, read, update, and delete education/qualification records
- View, edit, and delete contact messages
- Access protected Admin functionality

**Regular User**
- Register and sign in
- View portfolio information
- View projects and education records
- Submit messages through the Contact form
- Cannot access Admin-only operations

### 3. Project Management

- Display project information from MongoDB
- Add new projects
- Edit existing projects
- Delete projects
- Admin-only modification controls

### 4. Education / Qualification Management

- Display education and qualification information
- Add new qualification records
- Edit qualification records
- Delete qualification records
- Store records in MongoDB

### 5. Contact Form

- Submit contact messages
- Store messages in MongoDB
- Admin can view submitted messages
- Admin can update or delete messages
- Form validation and success/error feedback

### 6. React State Management

React Hooks are used to manage application state:

- `useState` for forms, messages, and application data
- `useEffect` for loading records from backend APIs
- React Router for page navigation
- Conditional rendering based on authentication and user roles

## Database

The MongoDB database is named `Portfolio`.

It contains four main collections:

1. Users
2. Projects
3. Qualifications
4. Contacts

Mongoose is used to define schemas and communicate with MongoDB.

## REST API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signin` | Sign in |
| GET | `/auth/signout` | Sign out |

### Users

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users` | Register a user |
| GET | `/api/users` | List users (Admin) |

### Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | View projects |
| POST | `/api/projects` | Create project (Admin) |
| PUT | `/api/projects/:id` | Update project (Admin) |
| DELETE | `/api/projects/:id` | Delete project (Admin) |

### Qualifications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/qualifications` | View qualifications |
| POST | `/api/qualifications` | Create qualification (Admin) |
| PUT | `/api/qualifications/:id` | Update qualification (Admin) |
| DELETE | `/api/qualifications/:id` | Delete qualification (Admin) |

### Contacts

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contacts` | Submit contact message |
| GET | `/api/contacts` | View messages (Admin) |
| PUT | `/api/contacts/:id` | Update message (Admin) |
| DELETE | `/api/contacts/:id` | Delete message (Admin) |

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Emir-berke/COMP229-Assignment3-Portfolio.git
cd COMP229-Assignment3-Portfolio
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Configure environment variables

Create a `.env` file in the main project folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholders with your own configuration values.

**Important:** Never upload your actual `.env` file, database password, or JWT secret to GitHub.

### 5. Start the application

From the `client` folder, run:

```bash
npm run dev
```

The frontend and backend will start using the project's development scripts.

**Frontend:** http://localhost:5173/react-portfolio/

**Backend:** http://localhost:5000

## Testing

The application was tested using the browser, MongoDB Compass, and Talend API Tester.

Completed testing included:

- User registration and login
- User logout
- Admin and regular user authorization
- Project CRUD operations
- Education/Qualification CRUD operations
- Contact form submission
- Contact message editing and deletion
- MongoDB data persistence
- Unauthorized requests returning HTTP 401
- Regular user access to Admin routes returning HTTP 403

## GitHub Repository

https://github.com/Emir-berke/COMP229-Assignment3-Portfolio

## Course Information

**Course:** COMP229 – Web Application Development

**Assignment:** Assignment 3 – Full Stack Portfolio Application

**Student:** Emir Berke Peker

**College:** Centennial College
