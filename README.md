# Household - Monthly Task Tracker

A full-stack application to manage household monthly recurring tasks like bill payments, insurance renewals, and class bookings.

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Axios** for API communication

### Backend
- **Spring Boot** (Java)
- **Spring Data JPA** for data persistence
- **PostgreSQL** database
- **Maven** for dependency management

## Project Structure

```
household/
├── frontend/          # React + Tailwind CSS application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── README.md
└── README.md
```

## Features

- ✅ View all monthly recurring tasks
- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as paid/completed
- ✅ Set due dates for each task
- ✅ Visual indicators for overdue and upcoming tasks
- ✅ Filter and sort tasks by status and due date
- ✅ Responsive design for mobile and desktop

## Getting Started

### Prerequisites
- Java 21 or higher
- Node.js 18 or higher
- Maven 3.6+

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

The backend server will start on http://localhost:8080

Default PostgreSQL settings:
- JDBC URL: `jdbc:postgresql://localhost:5432/householddb`
- Username: `household`
- Password: `household`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on http://localhost:5173

## Docker

Build Docker images for the full application:

```bash
docker compose build
```

Run the application with Docker:

```bash
docker compose up -d
```

Application URLs:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api/tasks

Stop containers:

```bash
docker compose down
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/{id}/complete` - Toggle task completion status

## Default Tasks

The application comes pre-populated with common household tasks:
- Credit Card Bill Payment
- Kids Classes Booking
- Car Insurance Payment
- Renters Insurance Payment
- Rent Payment
- Utility Bill Payment

## Development

### Backend Development
- The application uses PostgreSQL database
- Data persists across application restarts
- JPA entities are auto-created via DDL
- Sample data is loaded on startup

### Frontend Development
- Hot module replacement enabled via Vite
- Tailwind CSS with JIT compiler
- TypeScript for type safety
- Responsive mobile-first design

## License

MIT
