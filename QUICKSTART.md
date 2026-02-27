# Household Application - Quick Start Guide

## ✅ Implementation Complete!

The full-stack Household Monthly Task Tracker application has been successfully implemented with:

### ✨ Features
- ✅ View all monthly recurring tasks
- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as paid/completed with a single click
- ✅ Set due dates for each task
- ✅ Visual indicators:
  - 🟢 Green = Paid/Completed
  - 🔴 Red = Overdue
  - 🟡 Yellow = Due within 7 days
- ✅ Filter tasks by status (All/Paid/Unpaid) and category
- ✅ Sort tasks by due date automatically
- ✅ Track payment amounts and totals
- ✅ Responsive design for mobile and desktop
- ✅ Pre-loaded with 6 sample household tasks

### 📦 Tech Stack
- **Frontend**: React 18 with TypeScript, Tailwind CSS, Vite
- **Backend**: Spring Boot 3.2.2, Java 17, H2 Database
- **Architecture**: Monorepo with REST API

---

## 🚀 Running the Application

### Backend Server (Port 8080)

**Option 1: Using Java JAR (Recommended)**
```bash
cd backend
java -jar target/household-backend-1.0.0.jar
```

**Option 2: Using Maven**
```bash
cd backend
mvn clean install -DskipTests
java -jar target/household-backend-1.0.0.jar
```

The backend will start on **http://localhost:8080**

**Verify backend is running:**
```bash
curl http://localhost:8080/api/tasks
```

### Frontend Server (Port 5173)

```bash
cd frontend
npm run dev
```

The frontend will start on **http://localhost:5173**

**Open in browser:** http://localhost:5173

---

## 🎯 Using the Application

### View Tasks
- All tasks are displayed sorted by due date
- Visual color coding shows task status:
  - Green background = Paid
  - Red background = Overdue
  - Yellow background = Due soon (within 7 days)
  - White background = Upcoming

### Add a New Task
1. Click the **"+ Add New Task"** button
2. Fill in the form:
   - Title (required)
   - Description (optional)
   - Due Date (required)
   - Category (Bills, Insurance, Housing, Education, Other)
   - Amount (optional)
   - Recurring checkbox (for monthly tasks)
3. Click **"Add Task"**

### Mark Task as Paid
- Click the **"Mark Paid"** button on any task
- The task will change to green and show a strikethrough
- Click **"Undo"** to mark as unpaid

### Edit a Task
1. Click the **"Edit"** button on any task
2. Update the fields
3. Click **"Update Task"**

### Delete a Task
1. Click the **"Delete"** button
2. Confirm the deletion

### Filter Tasks
- **Status**: Filter by All/Paid/Unpaid
- **Category**: Filter by Bills, Insurance, Housing, Education, etc.

### Dashboard Summary
The top cards show:
- Total number of tasks
- Number of completed tasks
- Amount paid / Total amount

---

## 🗄️ Database Access

### H2 Console
Access the database console at: **http://localhost:8080/h2-console**

**Connection Details:**
- JDBC URL: `jdbc:h2:mem:householddb`
- Username: `sa`
- Password: *(leave blank)*

---

## 📋 Pre-loaded Sample Tasks

The application comes with 6 household tasks:

1. **Rent Payment** - Feb 1st - $2,200 (Housing)
2. **Renters Insurance** - Feb 5th - $45 (Insurance)
3. **Car Insurance** - Feb 10th - $180 (Insurance)
4. **Credit Card** - Feb 15th - $850 (Bills)
5. **Utility Bill** - Feb 20th - $125 (Bills)
6. **Kids Classes** - Feb 25th - $300 (Education)

---

## 🔧 Development

### Project Structure
```
household/
├── frontend/                 # React + Tailwind application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── services/        # API integration
│   │   │   └── taskApi.ts
│   │   ├── types/           # TypeScript types
│   │   │   └── Task.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                  # Spring Boot application
│   ├── src/main/java/com/household/
│   │   ├── HouseholdApplication.java
│   │   ├── model/           # JPA entities
│   │   │   └── Task.java
│   │   ├── repository/      # Data access
│   │   │   └── TaskRepository.java
│   │   ├── service/         # Business logic
│   │   │   └── TaskService.java
│   │   ├── controller/      # REST endpoints
│   │   │   └── TaskController.java
│   │   └── config/          # Configuration
│   │       ├── WebConfig.java
│   │       └── DataInitializer.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── target/
│       └── household-backend-1.0.0.jar
│
├── .gitignore
└── README.md
```

### API Endpoints

**Base URL:** http://localhost:8080/api

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| GET | `/tasks/{id}` | Get task by ID |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |
| PATCH | `/tasks/{id}/complete` | Toggle task completion |
| GET | `/tasks/status/{isPaid}` | Get tasks by status |
| GET | `/tasks/category/{category}` | Get tasks by category |
| GET | `/tasks/overdue` | Get overdue tasks |

---

## 🛠️ Rebuilding from Source

### Backend
```bash
cd backend
mvn clean install -DskipTests
```

### Frontend
```bash
cd frontend
npm install
npm run build
```

---

## 📝 Notes

- **Data Persistence**: H2 is an in-memory database, so data resets when the backend restarts
- **CORS**: Configured to allow requests from http://localhost:5173
- **Port Configuration**: Backend uses 8080, Frontend uses 5173
- **Future Enhancements**: You can upgrade to PostgreSQL or MySQL for persistent storage

---

## 🎉 Success!

Both servers are currently running:
- **Backend**: http://localhost:8080 ✅
- **Frontend**: http://localhost:5173 ✅

Open http://localhost:5173 in your browser to start managing your household tasks!

---

## 🆘 Troubleshooting

### Backend won't start
- Ensure Java 17+ is installed: `java -version`
- Check if port 8080 is available: `lsof -i:8080`
- Verify JAR file exists: `ls -la backend/target/*.jar`

### Frontend won't start
- Ensure Node.js is installed: `node -v`
- Install dependencies: `cd frontend && npm install`
- Check if port 5173 is available: `lsof -i:5173`

### Frontend can't connect to backend
- Verify backend is running: `curl http://localhost:8080/api/tasks`
- Check browser console for CORS errors
- Ensure both servers are running simultaneously

---

**Enjoy managing your household tasks!** 🏠✨
