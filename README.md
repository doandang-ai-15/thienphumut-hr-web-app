# PeopleHub HR Management System

Hệ thống quản lý nhân sự hiện đại với giao diện thân thiện và đầy đủ tính năng.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Tính năng

### 👥 Quản lý Nhân viên
- Thêm, sửa, xóa thông tin nhân viên
- Upload và quản lý ảnh đại diện
- Tìm kiếm và lọc nhân viên
- Quản lý phân quyền (Admin, Manager, Employee)
- Thống kê hiệu suất

### 🏢 Quản lý Phòng ban
- Tạo và quản lý các phòng ban
- Gán quản lý cho từng phòng ban
- Theo dõi số lượng nhân viên và ngân sách
- Hiển thị danh sách thành viên

### 📅 Quản lý Nghỉ phép
- Tạo đơn xin nghỉ phép
- Duyệt/Từ chối đơn nghỉ phép
- Thống kê đơn nghỉ phép (Chờ duyệt, Đã duyệt, Từ chối)
- Lọc theo loại nghỉ phép (Du lịch, Bệnh, Cá nhân, Thai sản...)
- Tính toán số ngày nghỉ tự động

### 📄 Quản lý Hợp đồng
- Tạo và quản lý hợp đồng lao động
- Theo dõi trạng thái hợp đồng (Còn hạn, Hết hạn, Chấm dứt)
- Cảnh báo hợp đồng sắp hết hạn
- Ký hợp đồng điện tử
- Lọc theo loại hợp đồng (Vĩnh viễn, Có thời hạn, Freelance, Thực tập sinh)

### 📊 Dashboard & Báo cáo
- Tổng quan thống kê toàn hệ thống
- Biểu đồ tăng trưởng nhân viên
- Top performers
- Thống kê theo phòng ban
- Xu hướng nghỉ phép

### 🔐 Xác thực & Phân quyền
- Đăng nhập/Đăng ký
- JWT Authentication
- Phân quyền 3 cấp: Admin, Manager, Employee
- Bảo mật mật khẩu với bcrypt

## 🛠️ Công nghệ sử dụng

### Frontend
- **HTML5** - Cấu trúc website
- **Tailwind CSS** - Styling framework
- **Vanilla JavaScript** - Logic xử lý
- **Lucide Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Cấu trúc Project

```
claude-code-TPM-HR/
├── frontend/                # Frontend files
│   ├── index.html          # Dashboard
│   ├── employees.html      # Quản lý nhân viên
│   ├── departments.html    # Quản lý phòng ban
│   ├── leaveApplications.html # Quản lý nghỉ phép
│   ├── contracts.html      # Quản lý hợp đồng
│   ├── settings.html       # Cài đặt
│   ├── login.html          # Đăng nhập
│   ├── js/                 # JavaScript files
│   │   ├── api.js          # API client
│   │   ├── config.js       # Configuration
│   │   ├── dashboard.js    # Dashboard logic
│   │   ├── employees.js    # Employees logic
│   │   ├── departments.js  # Departments logic
│   │   ├── leaveApplications.js # Leave logic
│   │   ├── contracts.js    # Contracts logic
│   │   ├── navigation.js   # Navigation & auth
│   │   └── statusMapping.js # Vietnamese mapping
│   └── vercel.json         # Vercel config
│
├── backend/                # Backend files
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, error handling
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities
│   │   └── database/       # Schema & seed
│   ├── server.js           # Entry point
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
│
├── DEPLOYMENT_GUIDE.md     # Hướng dẫn deploy chi tiết
└── README.md               # File này
```

## 🚀 Cài đặt Local Development

### Yêu cầu
- Node.js >= 14.x
- PostgreSQL >= 12.x
- npm hoặc yarn

### Bước 1: Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/tpm-hr.git
cd tpm-hr
```

### Bước 2: Cài đặt Backend

```bash
cd backend
npm install
```

### Bước 3: Cấu hình Database

**Tạo PostgreSQL database**:

```bash
psql -U postgres
CREATE DATABASE peoplehub_hr;
\q
```

**Tạo file `.env`** trong folder `backend/`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/peoplehub_hr

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
```

**Chạy schema**:

```bash
psql -U postgres -d peoplehub_hr < src/database/schema.sql
```

**Seed data mẫu**:

```bash
node src/database/seed.js
```

### Bước 4: Chạy Backend

```bash
npm start
# hoặc để auto-reload:
npm run dev
```

Backend chạy tại: `http://localhost:5000`

### Bước 5: Chạy Frontend

Mở file `frontend/index.html` bằng:
- **Live Server** (VS Code extension) - Khuyến nghị
- Hoặc HTTP server: `npx http-server frontend -p 3000`

Frontend chạy tại: `http://localhost:3000`

### Bước 6: Đăng nhập

Sử dụng tài khoản mẫu:

```
Admin:
Email: admin@example.com
Password: password123

Manager:
Email: hr@example.com
Password: password123

Employee:
Email: engineer@example.com
Password: password123
```

## 🌐 Deployment lên Production

Xem hướng dẫn chi tiết trong file **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

**Tóm tắt**:
1. Frontend → Deploy lên **Vercel**
2. Backend + Database → Deploy lên **Railway**
3. Trỏ domain `thienphumut.vn` về Vercel

## 📖 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/login` | Đăng nhập |
| POST | `/api/auth/logout` | Đăng xuất |
| GET | `/api/auth/me` | Lấy thông tin user |
| PUT | `/api/auth/updatepassword` | Đổi mật khẩu |

### Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Lấy danh sách nhân viên |
| GET | `/api/employees/:id` | Lấy chi tiết nhân viên |
| POST | `/api/employees` | Tạo nhân viên mới |
| PUT | `/api/employees/:id` | Cập nhật nhân viên |
| DELETE | `/api/employees/:id` | Xóa nhân viên |
| GET | `/api/employees/top/performers` | Top performers |
| GET | `/api/employees/statistics` | Thống kê nhân viên |

### Departments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/departments` | Lấy danh sách phòng ban |
| GET | `/api/departments/:id` | Lấy chi tiết phòng ban |
| POST | `/api/departments` | Tạo phòng ban |
| PUT | `/api/departments/:id` | Cập nhật phòng ban |
| DELETE | `/api/departments/:id` | Xóa phòng ban |

### Leave Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leaves` | Lấy danh sách đơn nghỉ |
| GET | `/api/leaves/:id` | Lấy chi tiết đơn nghỉ |
| POST | `/api/leaves` | Tạo đơn nghỉ |
| PUT | `/api/leaves/:id` | Cập nhật đơn nghỉ |
| DELETE | `/api/leaves/:id` | Xóa đơn nghỉ |
| GET | `/api/leaves/stats/summary` | Thống kê đơn nghỉ |

### Contracts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contracts` | Lấy danh sách hợp đồng |
| GET | `/api/contracts/:id` | Lấy chi tiết hợp đồng |
| POST | `/api/contracts` | Tạo hợp đồng |
| PUT | `/api/contracts/:id` | Cập nhật hợp đồng |
| DELETE | `/api/contracts/:id` | Xóa hợp đồng |
| POST | `/api/contracts/:id/sign` | Ký hợp đồng |
| GET | `/api/contracts/stats/summary` | Thống kê hợp đồng |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Thống kê tổng quan |
| GET | `/api/dashboard/trends` | Xu hướng theo tháng |

## 🔑 Phân quyền

### Admin
- Toàn quyền truy cập
- Quản lý tất cả nhân viên, phòng ban, hợp đồng
- Duyệt/Từ chối đơn nghỉ phép
- Xem tất cả báo cáo

### Manager
- Quản lý nhân viên trong phòng ban
- Duyệt đơn nghỉ phép của nhân viên
- Tạo và quản lý hợp đồng
- Xem báo cáo phòng ban

### Employee
- Xem thông tin cá nhân
- Tạo đơn xin nghỉ phép
- Xem lịch sử đơn nghỉ phép
- Xem hợp đồng của mình

## 🎨 Design System

### Colors
- **Primary Pink**: `#F875AA` - Nút chính, highlights
- **Primary Blue**: `#AEDEFC` - Gradient, accents
- **Success**: `#10B981` - Trạng thái thành công
- **Warning**: `#F59E0B` - Cảnh báo
- **Danger**: `#EF4444` - Lỗi, xóa
- **Gray Scale**: `#111827` → `#F9FAFB` - Text & backgrounds

### Typography
- Font: System fonts (San Francisco, Segoe UI, Roboto...)
- Sizes: 12px - 48px
- Weights: 400 (Normal), 500 (Medium), 600 (Semibold), 700 (Bold)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Đăng nhập với 3 loại user (Admin, Manager, Employee)
- [ ] Tạo/Sửa/Xóa nhân viên
- [ ] Upload ảnh đại diện
- [ ] Tạo phòng ban và gán quản lý
- [ ] Tạo đơn nghỉ phép
- [ ] Duyệt/Từ chối đơn nghỉ phép
- [ ] Tạo hợp đồng
- [ ] Ký hợp đồng
- [ ] Kiểm tra filter và search
- [ ] Kiểm tra responsive trên mobile
- [ ] Kiểm tra logout

## 🐛 Known Issues

Không có issue được báo cáo.

Nếu gặp bug, vui lòng tạo issue trên GitHub.

## 📝 Changelog

### Version 1.0.0 (2024-12-02)
- ✅ Hoàn thành tất cả tính năng chính
- ✅ Migration database sang tiếng Việt
- ✅ Fix logout button trên tất cả trang
- ✅ Cấu hình sẵn cho deployment
- ✅ Tài liệu đầy đủ

## 🤝 Contributing

Contributions are welcome! Vui lòng:

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Tạo Pull Request

## 📄 License

Dự án này được cấp phép theo giấy phép MIT - xem file [LICENSE](LICENSE) để biết chi tiết.

## 👨‍💻 Author

**Thiên Phú Mút Team**

- Website: https://thienphumut.vn
- Email: admin@thienphumut.vn

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Railway](https://railway.app/) - Backend hosting
- [Vercel](https://vercel.com/) - Frontend hosting
- [PostgreSQL](https://www.postgresql.org/) - Database

---

**Made with ❤️ by Thiên Phú Mút Team**
