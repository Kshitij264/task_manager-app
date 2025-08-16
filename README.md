# Task Management System

A full-stack web application for managing tasks, built with React, Node.js, Express, and MongoDB. This project is fully containerized with Docker for easy setup and deployment.

## Features

-   **Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Authorization**: Two user roles (user and admin) with different permissions. Regular users can only manage their own tasks.
-   **Task Management**: Full CRUD (Create, Read, Update, Delete) functionality for tasks.
-   **File Uploads**: Ability to attach up to 3 PDF documents to tasks.
-   **Advanced Filtering**: Filter tasks by status or priority, sort by due date, and paginate results.
-   **Admin Panel**: Admins can perform CRUD operations on any user in the system.

## Tech Stack

-   **Frontend**: React, Vite, Redux Toolkit, React Router, Material-UI (MUI), Axios
-   **Backend**: Node.js, Express.js, Mongoose
-   **Database**: MongoDB
-   **Containerization**: Docker, Docker Compose
-   **Testing**: Jest, Supertest

## Setup and Installation

To run this project locally, you must have **Docker** and **Docker Compose** installed.

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repo-url>
    cd task-manager-app
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

## API Documentation

The full API documentation is provided as a Postman collection in this repository. You can import the `Task_Manager_API.postman_collection.json` file into Postman to test all endpoints.