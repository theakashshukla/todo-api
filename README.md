# TODO API

A simple TODO API built with Node.js, Express, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [TODO Routes](#todo-routes)
- [Docker Compose](#docker-compose)

## Features

- User registration and authentication.
- Create, update, delete, and list TODO items.
- Persistent data storage using PostgreSQL.
- Docker Compose setup for local development.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- Docker and Docker Compose installed if you plan to use the provided Docker setup.
- PostgreSQL or a Dockerized PostgreSQL instance.

### Installation

1. Clone the repository:

```shell
git clone https://github.com/theakashshukla/todo-api.git
``` 

2. Change to the project directory:
```shell
cd todo-api
```

3. Install project dependencies:

```shell
npm install
```

5. Create a `.env` file in the project root and configure your environment variables. Here's an example:
```shell
PORT=3000
POSTGRES_URL=postgres://postgres:your_password@db:5432/your_database
JWT_SECRET=your_secret_key
```

6. Start the application:
```shell
npm start
```

## Usage

- Access the application at `http://localhost:3000`.

### Authentication

- Register a new user by sending a POST request to `/api/auth/register`.
- Obtain a JWT token by sending a POST request to `/api/auth/login` with your user credentials.
- Use the JWT token in the `Authorization` header of your requests to protected routes.

## API Endpoints

### User Routes

- **POST /api/auth/register**: Register a new user.

```json
{
 "username": "newuser",
 "email": "newuser@example.com",
 "password": "password"
}
```
POST /api/auth/login: Authenticate a user and get a JWT token.
```json
{
  "email": "newuser@example.com",
  "password": "password"
}
```
## TODO Routes
### POST /api/todos: Create a new TODO item.
```json
{
  "title": "New Task",
  "description": "A description of the task",
  "completed": false
}
```
### GET /api/todos: Get all TODO items.

### GET /api/todos/:id: Get a specific TODO item.

### PUT /api/todos/:id: Update a TODO item.

```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```
#### DELETE /api/todos/:id: Delete a TODO item.

### Docker Compose
You can run this application using Docker Compose. Make sure you have Docker and Docker Compose installed, then use the provided docker-compose.yml to set up the application and PostgreSQL database.

Save the docker-compose.yml file to your project directory.

Update the .env file with the PostgreSQL configuration.

Run the application:

```shell
docker-compose up
```
The application should be accessible at http://localhost:3000.
