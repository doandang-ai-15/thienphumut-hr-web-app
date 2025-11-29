# 🚀 Setup Guide - PeopleHub HR Management System

Hướng dẫn chi tiết cài đặt và chạy hệ thống HR Management.

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: v16.0.0 trở lên
- **PostgreSQL**: v14.0 trở lên
- **npm** hoặc **yarn**
- **Git** (optional)
- Web browser hiện đại (Chrome, Firefox, Edge)

## 🔧 Bước 1: Cài Đặt PostgreSQL

### Windows:
1. Download PostgreSQL từ https://www.postgresql.org/download/windows/
2. Chạy installer và làm theo hướng dẫn
3. Nhớ password cho user `postgres`
4. Mặc định port: 5432

### macOS (với Homebrew):
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## 💾 Bước 2: Tạo Database

```bash
# Mở PostgreSQL command line
psql -U postgres
# Nhập password: 15012002 (hoặc password bạn đã set)

# Tạo database
CREATE DATABASE peoplehub_hr;

# Kiểm tra database đã tạo
\l

# Thoát psql
\q
```

## 🗂️ Bước 3: Setup Backend

### 3.1. Di chuyển vào thư mục backend
```bash
cd backend
```

### 3.2. Cài đặt dependencies
```bash
npm install
```

### 3.3. Cấu hình môi trường
File `.env` đã được cấu hình sẵn với:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=15012002
DB_NAME=peoplehub_hr
DB_PORT=5432

JWT_SECRET=peoplehub_secret_key_2024_change_in_production
JWT_EXPIRE=7d

MAX_FILE_SIZE=5242880
```

**Lưu ý:** Nếu PostgreSQL của bạn có password khác, hãy sửa `DB_PASSWORD` trong file `.env`

### 3.4. Chạy Database Schema
```bash
# Từ thư mục backend, chạy:
psql -U postgres -d peoplehub_hr -f src/database/schema.sql
```

Bạn sẽ thấy output:
```
CREATE EXTENSION
DROP TABLE
...
NOTICE:  Database schema created successfully!
```

### 3.5. Seed Data (dữ liệu mẫu)
```bash
npm run seed
```

Output thành công:
```
🌱 Starting database seeding...
✅ Cleared existing data
✅ Departments seeded
✅ Employees seeded
✅ Leave applications seeded
✅ Contracts seeded
✅ Database seeding completed successfully!
```

### 3.6. Khởi động Backend Server
```bash
npm run dev
```

Thấy message này là thành công:
```
✅ PostgreSQL Database connected successfully
🚀 Server running in development mode on port 5000
```

## 🌐 Bước 4: Setup Frontend

### Option 1: Using Python (Đơn giản nhất)
```bash
# Mở terminal mới
cd frontend
python -m http.server 8000
```

### Option 2: Using npx http-server
```bash
cd frontend
npx http-server -p 8000
```

### Option 3: Using VS Code Live Server
1. Cài extension "Live Server" trong VS Code
2. Right-click vào `frontend/index.html`
3. Chọn "Open with Live Server"

## ✅ Bước 5: Kiểm Tra Hoạt Động

### 5.1. Test Backend API
Mở browser và truy cập:
```
http://localhost:5000
```

Bạn sẽ thấy JSON response:
```json
{
  "success": true,
  "message": "PeopleHub HR API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "dashboard": "/api/dashboard",
    ...
  }
}
```

### 5.2. Test Frontend
Mở browser và truy cập:
```
http://localhost:8000/login.html
```

### 5.3. Login với tài khoản mẫu
```
Email: john.doe@peoplehub.com
Password: password123
```

## 🎯 Các Tài Khoản Mẫu

### Admin Account
```
Email: john.doe@peoplehub.com
Password: password123
Role: Admin
```

### Manager Account
```
Email: alex.kim@peoplehub.com
Password: password123
Role: Manager
```

### Employee Account
```
Email: alice.smith@peoplehub.com
Password: password123
Role: Employee
```

## 🔍 Troubleshooting

### Lỗi: Database connection failed
**Nguyên nhân:** PostgreSQL chưa chạy hoặc sai credentials

**Giải pháp:**
```bash
# Kiểm tra PostgreSQL đang chạy
# Windows
pg_ctl status -D "C:\Program Files\PostgreSQL\14\data"

# macOS/Linux
sudo systemctl status postgresql

# Kiểm tra có kết nối được không
psql -U postgres -d peoplehub_hr
```

### Lỗi: Port 5000 already in use
**Nguyên nhân:** Port đã được sử dụng

**Giải pháp:** Sửa PORT trong `.env` file
```env
PORT=5001
```

### Lỗi: CORS error
**Nguyên nhân:** Frontend và Backend chạy khác port

**Giải pháp:** Kiểm tra `frontend/js/config.js`:
```javascript
const API_CONFIG = {
    BASE_URL: 'http://localhost:5000/api',
};
```

### Lỗi: Cannot find module
**Nguyên nhân:** Dependencies chưa được cài

**Giải pháp:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

## 📱 Các Trang Có Sẵn

- ✅ `/login.html` - Login & Register
- ✅ `/index.html` - Dashboard (cần login)
- ✅ `/employees.html` - Quản lý nhân viên (cần login)
- 🔨 `/departments.html` - Quản lý phòng ban (chưa tích hợp)
- 🔨 `/leaveApplications.html` - Đơn nghỉ phép (chưa tích hợp)
- 🔨 `/contracts.html` - Hợp đồng (chưa tích hợp)
- 🔨 `/settings.html` - Cài đặt (chưa tích hợp)

## 🔐 Security Notes

- **PRODUCTION:** Đổi `JWT_SECRET` trong `.env`
- **PRODUCTION:** Đổi database password
- **PRODUCTION:** Enable HTTPS
- **PRODUCTION:** Set `NODE_ENV=production`

## 📝 Development Tips

### Backend Development
```bash
# Watch mode (auto restart on file changes)
npm run dev

# Run seeding again
npm run seed
```

### Database Commands
```bash
# Connect to database
psql -U postgres -d peoplehub_hr

# Useful commands trong psql:
\dt              # List all tables
\d employees     # Describe employees table
\q               # Quit

# View data
SELECT * FROM employees LIMIT 5;
SELECT * FROM departments;
```

### Reset Database
```bash
# Xóa tất cả data và seed lại
cd backend
psql -U postgres -d peoplehub_hr -f src/database/schema.sql
npm run seed
```

## 🎓 Next Steps

1. ✅ Hoàn thành Login & Dashboard integration
2. ✅ Hoàn thành Employee Management integration
3. 🔨 Tích hợp Department Management page
4. 🔨 Tích hợp Leave Applications page
5. 🔨 Tích hợp Contracts page
6. 🔨 Tích hợp Settings page
7. 🔨 Deploy lên production server

## 📞 Support

Nếu gặp vấn đề, hãy:
1. Kiểm tra lại các bước trong guide này
2. Check console log (F12 trong browser)
3. Check backend terminal log
4. Tạo issue trên GitHub repository

---

**Happy Coding! 🚀**
