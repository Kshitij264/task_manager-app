# Task Management System

A full-stack web application for managing tasks, built with the MERN stack (MongoDB, Express.js, React, Node.js) and fully containerized with Docker for easy setup. This project was developed as a full-stack assignment for PanScience Innovations.

**Live Demo: [https://task-manager-app-pearl-three.vercel.app/](https://task-manager-app-pearl-three.vercel.app/)**

---


## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Local Setup and Installation](#local-setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

---

## Features

-   **Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Authorization**: Two user roles (user and admin) with role-based access control. Regular users can only manage their own tasks.
-   **Task Management**: Full CRUD (Create, Read, Update, Delete) functionality for tasks.
-   **File Uploads**: Ability to attach up to 3 PDF documents to tasks during creation or updates.
-   **Advanced API**: Backend features filtering by status/priority, sorting by due date, and pagination for task lists.
-   **Admin Panel**: Admins can perform full CRUD operations on any user in the system.
-   **Testing**: Includes a comprehensive backend test suite with over 80% test coverage.

---

## Tech Stack

-   **Frontend**: React, Vite, Redux Toolkit, React Router, Material-UI (MUI), Axios
-   **Backend**: Node.js, Express.js, Mongoose
-   **Database**: MongoDB Atlas
-   **Containerization**: Docker, Docker Compose
-   **Testing**: Jest, Supertest
-   **Deployment**: Render (Backend), Vercel (Frontend)

---

## Local Setup and Installation

To run this project locally, you must have **Docker** and **Docker Compose** installed.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Kshitij264/task_manager-app.git](https://github.com/Kshitij264/task_manager-app.git)
    cd task_manager-app
    ```

2.  **Create the environment file:**
    Create a `.env` file in the root of the project and add your own unique `JWT_SECRET`:
    ```env
    JWT_SECRET=your_super_secret_and_long_key_here
    ```

3.  **Build and run the application:**
    Use Docker Compose to build the images and start all the services.
    ```bash
    docker-compose up --build
    ```

4.  **Access the application:**
    -   The frontend will be available at `http://localhost:5173`
    -   The backend API will be available at `http://localhost:5000`

5.  **Run Backend Tests:**
    To run the backend test suite, make sure your Docker containers are running. Then, in a new terminal, navigate to the backend directory and run the test command:
    ```bash
    cd backend
    npm test
    ```

---

## API Documentation

The full API documentation is provided as a Postman collection (`Task_Manager_API.postman_collection.json`) in this repository.

### Auth Routes
| Method | Endpoint             | Description         | Access  |
| ------ | -------------------- | ------------------- | ------- |
| `POST` | `/api/auth/register` | Register a new user | Public  |
| `POST` | `/api/auth/login`    | Login a user        | Public  |

### Task Routes
| Method   | Endpoint          | Description                        | Access   |
| -------- | ----------------- | ---------------------------------- | -------- |
| `GET`    | `/api/tasks`      | Get all tasks (with query params)  | Private  |
| `POST`   | `/api/tasks`      | Create a new task                  | Private  |
| `GET`    | `/api/tasks/:id`  | Get a single task by ID            | Private  |
| `PUT`    | `/api/tasks/:id`  | Update a task                      | Private  |
| `DELETE` | `/api/tasks/:id`  | Delete a task                      | Private  |

### User Routes
| Method   | Endpoint          | Description                | Access       |
| -------- | ----------------- | -------------------------- | ------------ |
| `GET`    | `/api/users`      | Get all users              | Private/Admin |
| `GET`    | `/api/users/:id`  | Get a single user by ID    | Private/Admin |
| `PUT`    | `/api/users/:id`  | Update a user              | Private/Admin |
| `DELETE` | `/api/users/:id`  | Delete a user              | Private/Admin |

---

## Project Structure
```
/
├── backend/
│   ├── __tests__/      # Jest test files
│   ├── controllers/    # Route logic
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── uploads/        # Folder for uploaded files
│   └── Dockerfile      # Instructions for the backend image
│
├── frontend/
│   ├── src/
│   │   ├── app/        # Redux store
│   │   ├── components/ # Reusable React components
│   │   ├── features/   # Redux slices and services
│   │   └── pages/      # Page-level components
│   └── Dockerfile      # Instructions for the frontend image
│
├── .env                # Environment variables for Docker Compose
├── .gitignore          # Files to be ignored by Git
├── docker-compose.yml  # Master file for running all services locally
└── README.md           # This file
```