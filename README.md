# PeopleHub HR Management System

Full-stack HR Management System với PostgreSQL backend và responsive frontend.

## 📋 Features

### Backend (Node.js + Express + PostgreSQL)
- ✅ JWT Authentication & Authorization
- ✅ Role-based access control (Admin, Manager, Employee)
- ✅ Employee Management (CRUD)
- ✅ Department Management
- ✅ Leave Application System
- ✅ Contract Management
- ✅ Dashboard Analytics
- ✅ Activity Logging
- ✅ File Upload Support

### Frontend (HTML + TailwindCSS + Vanilla JS)
- ✅ Modern responsive UI
- ✅ Real-time API integration
- ✅ Dashboard with charts
- ✅ Employee management
- ✅ Authentication pages
- ✅ Beautiful animations

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- PostgreSQL 14+
- npm or yarn

### 1. Database Setup

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE peoplehub_hr;
\q

# Run schema
cd backend
psql -U postgres -d peoplehub_hr -f src/database/schema.sql

# Seed initial data
npm install
npm run seed
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Start server
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open frontend in a web server
# Option 1: Using Python
cd frontend
python -m http.server 8000

# Option 2: Using Node's http-server
npx http-server frontend -p 8000

# Option 3: Using VS Code Live Server extension
```

Frontend will run on `http://localhost:8000`

## 🔐 Default Login

```
Email: john.doe@peoplehub.com
Password: password123
Role: Admin
```

## 📁 Project Structure

```
claude-code-TPM-HR/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── multer.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── employeeController.js
│   │   │   ├── departmentController.js
│   │   │   ├── leaveController.js
│   │   │   └── contractController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── employeeRoutes.js
│   │   │   ├── departmentRoutes.js
│   │   │   ├── leaveRoutes.js
│   │   │   └── contractRoutes.js
│   │   ├── utils/
│   │   │   ├── asyncHandler.js
│   │   │   └── generateToken.js
│   │   └── database/
│   │       ├── schema.sql
│   │       └── seed.js
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── js/
    │   ├── config.js
    │   ├── api.js
    │   ├── auth.js
    │   ├── dashboard.js
    │   ├── employees.js
    │   └── navigation.js
    ├── index.html
    ├── login.html
    ├── employees.html
    ├── departments.html
    ├── leaveApplications.html
    ├── contracts.html
    └── settings.html
```

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/login          - Login
POST   /api/auth/register       - Register
GET    /api/auth/me             - Get current user
POST   /api/auth/logout         - Logout
PUT    /api/auth/updatepassword - Update password
```

### Dashboard
```
GET    /api/dashboard/stats     - Get dashboard stats
GET    /api/dashboard/trends    - Get monthly trends
```

### Employees
```
GET    /api/employees                - Get all employees
GET    /api/employees/:id            - Get employee by ID
POST   /api/employees                - Create employee (Admin/Manager)
PUT    /api/employees/:id            - Update employee (Admin/Manager)
DELETE /api/employees/:id            - Delete employee (Admin)
GET    /api/employees/top/performers - Get top performers
GET    /api/employees/statistics     - Get statistics
```

### Departments
```
GET    /api/departments     - Get all departments
GET    /api/departments/:id - Get department by ID
POST   /api/departments     - Create department (Admin)
PUT    /api/departments/:id - Update department (Admin)
DELETE /api/departments/:id - Delete department (Admin)
```

### Leaves
```
GET    /api/leaves               - Get all leaves
GET    /api/leaves/:id           - Get leave by ID
POST   /api/leaves               - Create leave
PUT    /api/leaves/:id           - Approve/Reject (Manager/Admin)
DELETE /api/leaves/:id           - Delete leave
GET    /api/leaves/stats/summary - Get leave statistics
```

### Contracts
```
GET    /api/contracts               - Get all contracts
GET    /api/contracts/:id           - Get contract by ID
POST   /api/contracts               - Create contract (Manager/Admin)
PUT    /api/contracts/:id           - Update contract (Manager/Admin)
POST   /api/contracts/:id/sign      - Sign contract (Manager/Admin)
DELETE /api/contracts/:id           - Delete contract (Admin)
GET    /api/contracts/stats/summary - Get contract stats
```

## 🎨 Tech Stack

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcryptjs
- Multer (File Upload)

**Frontend:**
- HTML5
- TailwindCSS
- Vanilla JavaScript
- Chart.js
- Lucide Icons

## 📝 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database (PostgreSQL)
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=15012002
DB_NAME=peoplehub_hr
DB_PORT=5432

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
```

## 🧪 Testing

```bash
# Test backend API
cd backend
npm run dev

# Open browser and test
http://localhost:5000

# Test frontend
Open http://localhost:8000
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- SQL injection prevention (parameterized queries)
- CORS protection
- Input validation
- Activity logging

## 📊 Database Schema

- **departments** - Company departments
- **employees** - Employee information
- **leave_applications** - Leave requests
- **contracts** - Employment contracts
- **activity_logs** - System activity tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Thiên Phú Mut

## 🙏 Acknowledgments

- TailwindCSS for beautiful UI
- Chart.js for data visualization
- Lucide for icons
- PostgreSQL for robust database
