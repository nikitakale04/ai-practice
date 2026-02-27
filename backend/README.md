# Household Backend

Spring Boot backend for the Household Monthly Task Tracker application.

## Prerequisites

- Java 17 or higher
- Maven 3.6+ (or use the included Maven wrapper)

## Running the Application

### Using Maven Wrapper (Recommended)

```bash
./mvnw spring-boot:run
```

### Using System Maven

```bash
mvn spring-boot:run
```

The backend will start on http://localhost:8080

## H2 Database Console

Access the H2 console at: http://localhost:8080/h2-console

Connection details:
- **JDBC URL**: `jdbc:h2:mem:householddb`
- **Username**: `sa`
- **Password**: (leave blank)

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/{id}/complete` - Toggle task completion status

### Filtered Tasks

- `GET /api/tasks/status/{isPaid}` - Get tasks by payment status
- `GET /api/tasks/category/{category}` - Get tasks by category
- `GET /api/tasks/overdue` - Get overdue unpaid tasks

## Sample Data

The application comes with pre-populated sample tasks:
- Credit Card Bill Payment
- Kids Classes Booking
- Car Insurance Payment
- Renters Insurance Payment
- Rent Payment
- Utility Bill Payment

## Configuration

Edit `src/main/resources/application.properties` to customize:
- Server port
- Database settings
- CORS configuration
- JPA/Hibernate settings
