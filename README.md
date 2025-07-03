# Task Management API

A modern, production-ready RESTful API for managing users and tasks, built with Node.js, Express, TypeScript, Prisma, PostgreSQL, and Zod. Includes robust validation, error handling, pagination, and automated API documentation.

---

## Features

- User and Task management (CRUD)
- TypeScript-first, strict typing
- Prisma ORM with PostgreSQL
- Zod validation for all inputs
- Pagination and filtering for tasks
- Centralized error handling
- Jest & Supertest integration tests
- Swagger (OpenAPI) documentation
- Best-practice project structure

---

## Getting Started

### 1. **Clone the repository**

```bash
git clone <your-repo-url>
cd TaskManagment.API
```

### 2. **Install dependencies**

```bash
yarn install
```

### 3. **Configure the database**

Edit the `.env` file with your PostgreSQL connection string:

```
DATABASE_URL=postgresql://postgres:7175@localhost:5432/taskManagmentDB
```

### 4. **Run migrations and generate Prisma client**

```bash
yarn prisma migrate dev --name init
yarn prisma generate
```

### 5. **Start the development server**

```bash
yarn dev
```

The API will be running at:  
`http://localhost:3000/api`

---

## API Documentation (Swagger)

Interactive API docs are available at:

```
http://localhost:3000/api-docs
```

- Explore all endpoints
- Try requests directly from the browser
- See request/response schemas and error messages

---

## Example API Endpoints

### **Users**

- **Create User:**
  - `POST /api/users`
  - Body: `{ "name": "John Doe", "email": "john@example.com" }`

### **Tasks**

- **Create Task:**
  - `POST /api/tasks`
  - Body: `{ "title": "Task 1", "description": "Details", "dueDate": "2024-07-01T12:00:00Z", "status": "pending", "userId": "<user-uuid>" }`
- **List Tasks (with pagination & filters):**
  - `GET /api/tasks?status=pending&userId=<user-uuid>&limit=10&offset=0`
- **Update Task Status:**
  - `PATCH /api/tasks/:id/status`
  - Body: `{ "status": "completed" }`
- **Delete Task:**
  - `DELETE /api/tasks/:id`

---

## Running Tests

```bash
yarn test
```

---

## Project Structure

```
prisma/           # Prisma schema and migrations
prisma/client.ts  # Singleton Prisma client
routes/           # Express route definitions
controllers/      # Request handlers
services/         # Business logic and DB access
validators/       # Zod validation schemas
tests/            # Jest & Supertest integration tests
index.ts          # App entry point
```

---

## License

5asul
