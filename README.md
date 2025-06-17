# Task Management System

A robust task management application built with Spring Boot and React, designed to help teams organize, track, and manage their work efficiently.

## Features

- **Task Management**
  - Create, edit, and delete tasks
  - Assign tasks to team members
  - Set task priorities and deadlines
  - Track task status and progress
  - Add comments and attachments

- **User Management**
  - User authentication and authorization
  - Role-based access control (Admin, User)
  - User profile management
  - Email notifications

- **Project Organization**
  - Group tasks by projects
  - Set project deadlines and milestones
  - Track project progress
  - Generate project reports

- **Real-time Updates**
  - WebSocket integration for live updates
  - Instant notifications for task changes
  - Real-time collaboration features

## Tech Stack

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- WebSocket
- MySQL/PostgreSQL
- Maven

### Frontend
- React.js
- Material-UI
- Redux for state management
- WebSocket for real-time features

## Prerequisites

- Java 11 or higher
- Node.js (v14 or higher)
- Maven
- MySQL/PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
```

2. Set up the database:
```bash
# Create a new database
# Update application.properties with your database credentials
```

3. Build and run the backend:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

4. Install and run the frontend:
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/{id}` - Get project by ID
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── taskmanager/
│   │           ├── config/
│   │           ├── controller/
│   │           ├── model/
│   │           ├── repository/
│   │           ├── service/
│   │           └── TaskManagementApplication.java
│   └── resources/
│       └── application.properties
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Spring Boot and React
- Inspired by modern task management tools
- Open source community contributions 
