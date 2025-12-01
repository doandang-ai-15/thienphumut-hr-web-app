# 🚀 Hướng dẫn Deploy PeopleHub HR lên Vercel + Railway

## 📋 Tổng quan Công nghệ

### Frontend
- **HTML5** - Cấu trúc trang web
- **Tailwind CSS** (CDN) - Framework CSS
- **Vanilla JavaScript** - Logic frontend
- **Lucide Icons** (CDN) - Thư viện icon

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **bcryptjs** - Mã hóa mật khẩu
- **jsonwebtoken** - Authentication
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing

---

## 🎯 Kiến trúc Deployment

```
┌─────────────────────┐
│   thienphumut.vn    │
│    (Vercel)         │  ← Frontend (HTML/CSS/JS)
└──────────┬──────────┘
           │ API Calls
           ↓
┌─────────────────────┐
│   Backend API       │
│   (Railway)         │  ← Express.js Server
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   PostgreSQL DB     │
│   (Railway)         │  ← Database
└─────────────────────┘
```

---

## 📝 Bước 1: Chuẩn bị Project

### 1.1 Tạo file `.gitignore` (root project)

```gitignore
# Dependencies
node_modules/
backend/node_modules/

# Environment variables
.env
backend/.env

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db
```

### 1.2 Push code lên GitHub

```bash
cd D:\Congty\thienphumut\claude-code-TPM-HR

git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Tạo repo trên GitHub: https://github.com/new
# Sau đó:
git remote add origin https://github.com/YOUR-USERNAME/tpm-hr.git
git branch -M main
git push -u origin main
```

---

## 🚂 Bước 2: Deploy Backend lên Railway

### 2.1 Tạo tài khoản Railway

1. Truy cập: https://railway.app/
2. Đăng nhập bằng GitHub
3. Click **New Project**

### 2.2 Deploy Backend

1. **Deploy from GitHub repo**
2. Chọn repository: `tpm-hr`
3. Click **Deploy Now**
4. **Settings** → **Root Directory**: `/backend`
5. **Settings** → **Start Command**: `npm start`

### 2.3 Thêm PostgreSQL Database

1. Click **New** → **Database** → **Add PostgreSQL**
2. Railway tự động tạo và kết nối database
3. **Variables** tab sẽ có `DATABASE_URL` tự động

### 2.4 Thêm Environment Variables

Vào **Variables** tab, thêm:

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-key-change-this-to-random-string
JWT_EXPIRE=7d
PORT=5000
```

**Quan trọng**: `DATABASE_URL` đã được Railway tự động tạo, không cần thêm.

### 2.5 Chạy Database Schema

#### Cách 1: Qua Railway CLI

```bash
# Cài Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Chạy schema
railway run psql $DATABASE_URL < backend/src/database/schema.sql
```

#### Cách 2: Qua Railway Dashboard

1. **Data** tab → **Query** → Paste nội dung file `backend/src/database/schema.sql`
2. Click **Run**

### 2.6 Lấy Backend URL

Sau khi deploy thành công, lấy URL từ **Settings** → **Domains**

VD: `https://tpm-hr-backend-production.up.railway.app`

---

## 🌐 Bước 3: Deploy Frontend lên Vercel

### 3.1 Cập nhật Backend URL trong Frontend

Mở file `frontend/js/config.js`, tìm dòng:

```javascript
: 'https://YOUR-BACKEND-URL.railway.app/api',  // Production
```

Thay bằng URL Backend từ Railway:

```javascript
: 'https://tpm-hr-backend-production.up.railway.app/api',
```

**Push thay đổi lên GitHub**:

```bash
git add frontend/js/config.js
git commit -m "Update backend URL for production"
git push
```

### 3.2 Deploy qua Vercel

1. Truy cập: https://vercel.com/
2. Đăng nhập bằng GitHub
3. **Add New Project** → **Import Git Repository**
4. Chọn repository `tpm-hr`

### 3.3 Configure Project Settings

**QUAN TRỌNG**:

- **Framework Preset**: `Other`
- **Root Directory**: `frontend` (Click Edit và chọn folder)
- **Build Command**: (Để trống)
- **Output Directory**: (Để trống)
- **Install Command**: (Để trống)

### 3.4 Deploy

Click **Deploy** và đợi hoàn thành (~1-2 phút)

Lấy URL: `https://tpm-hr.vercel.app` (hoặc tên bạn đặt)

---

## 🔗 Bước 4: Cập nhật CORS Backend

Sau khi có URL Vercel, cập nhật file `backend/server.js`:

```javascript
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [
            'https://thienphumut.vn',
            'https://www.thienphumut.vn',
            'https://tpm-hr.vercel.app'  // ← Thay URL Vercel của bạn
          ]
        : '*',
    credentials: true,
    optionsSuccessStatus: 200
};
```

**Push và Railway sẽ tự động redeploy**:

```bash
git add backend/server.js
git commit -m "Update CORS for Vercel domain"
git push
```

---

## 🌍 Bước 5: Trỏ Domain thienphumut.vn về Vercel

### 5.1 Thêm Domain vào Vercel

1. **Vercel Dashboard** → Project của bạn
2. **Settings** → **Domains**
3. **Add Domain**:
   - Nhập: `thienphumut.vn`
   - Click **Add**
4. **Add Domain** lần nữa:
   - Nhập: `www.thienphumut.vn`
   - Click **Add**

### 5.2 Lấy DNS Records từ Vercel

Vercel sẽ hiển thị hướng dẫn cấu hình DNS. Thường sẽ là:

**Cho domain chính (thienphumut.vn)**:
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**Cho www subdomain**:
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

### 5.3 Cấu hình DNS tại Nhà cung cấp Domain

Truy cập trang quản lý DNS của `thienphumut.vn` (VD: CloudFlare, GoDaddy, Namecheap...)

**Thêm bản ghi DNS**:

| Type | Name/Host | Value/Points to | TTL |
|------|-----------|-----------------|-----|
| A | @ | `76.76.21.21` | 3600 |
| CNAME | www | `cname.vercel-dns.com` | 3600 |

**Lưu ý**:
- Xóa các A record hoặc CNAME cũ trỏ đến `@` nếu có
- Có thể cần tắt "Proxy" (CloudFlare) để Vercel verify domain

### 5.4 Chờ DNS Propagation

- DNS cập nhật mất từ **5 phút đến 48 giờ**
- Kiểm tra tại: https://dnschecker.org/
- Nhập: `thienphumut.vn` để xem đã trỏ đúng IP chưa

### 5.5 Vercel tự động cấp SSL

Sau khi Vercel verify domain thành công:
- SSL Certificate (Let's Encrypt) được tự động cấp
- Website chạy trên HTTPS: `https://thienphumut.vn`

---

## 🌱 Bước 6: Seed Database Production

### Cách 1: Qua API Endpoint (Khuyến nghị cho lần đầu)

**Lưu ý**: Endpoint `/api/seed/init` đã được tạo sẵn.

Sau khi Backend Railway đã chạy, dùng Postman hoặc curl:

```bash
curl -X POST https://tpm-hr-backend-production.up.railway.app/api/seed/init
```

**Response sẽ trả về các tài khoản test**:

```json
{
  "success": true,
  "message": "Database seeded successfully!",
  "credentials": {
    "admin": {
      "email": "admin@thienphumut.vn",
      "password": "password123"
    },
    "manager": {
      "email": "hr@thienphumut.vn",
      "password": "password123"
    },
    "employee": {
      "email": "engineer@thienphumut.vn",
      "password": "password123"
    }
  }
}
```

### Cách 2: Qua Railway CLI

```bash
railway link
railway run node backend/src/database/seed.js
```

### Cách 3: Xóa Endpoint Seed sau khi hoàn thành (Bảo mật)

Sau khi seed xong, xóa hoặc comment route trong `backend/server.js`:

```javascript
// app.use('/api/seed', require('./src/routes/seedRoutes')); // Disabled after seeding
```

---

## ✅ Bước 7: Kiểm tra Deployment

### 7.1 Test Frontend

1. Truy cập: `https://thienphumut.vn`
2. Kiểm tra trang load bình thường
3. Mở DevTools (F12) → Console, không có lỗi

### 7.2 Test Login

1. Vào trang Login
2. Đăng nhập với tài khoản:
   - Email: `admin@thienphumut.vn`
   - Password: `password123`
3. Kiểm tra redirect về Dashboard

### 7.3 Test CORS

1. Mở DevTools → Network tab
2. Thực hiện login
3. Kiểm tra request gọi đến Backend Railway
4. Status code 200 = thành công

### 7.4 Test các trang

- Dashboard: Hiển thị stats
- Employees: Danh sách nhân viên
- Departments: Danh sách phòng ban
- Leave Applications: Đơn nghỉ phép
- Contracts: Hợp đồng

---

## 🔒 Bước 8: Bảo mật Production (Quan trọng!)

### 8.1 Thay đổi mật khẩu mặc định

Sau khi login, đổi ngay password của tài khoản admin.

### 8.2 Xóa hoặc bảo vệ Seed Endpoint

**Cách 1: Xóa hoàn toàn**

```javascript
// backend/server.js
// app.use('/api/seed', require('./src/routes/seedRoutes')); // REMOVED
```

**Cách 2: Thêm Authentication**

Sửa `backend/src/routes/seedRoutes.js`:

```javascript
const { protect, authorize } = require('../middleware/auth');

router.post('/init', protect, authorize('admin'), async (req, res) => {
    // ... existing code
});
```

### 8.3 Environment Variables quan trọng

Đảm bảo Railway có các biến sau:

```env
NODE_ENV=production
JWT_SECRET=<random-string-at-least-32-characters>
```

Generate JWT_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 8.4 Giới hạn CORS chỉ domain chính thức

```javascript
// backend/server.js
const corsOptions = {
    origin: [
        'https://thienphumut.vn',
        'https://www.thienphumut.vn'
    ], // Xóa URL Vercel test
    credentials: true,
    optionsSuccessStatus: 200
};
```

---

## 🐛 Troubleshooting

### Vấn đề 1: CORS Error

**Triệu chứng**: Console hiện lỗi `blocked by CORS policy`

**Giải pháp**:
1. Kiểm tra `backend/server.js` có đúng Vercel URL không
2. Kiểm tra Railway environment `NODE_ENV=production`
3. Redeploy Backend trên Railway

### Vấn đề 2: Database Connection Failed

**Triệu chứng**: Backend logs hiện `Connection refused`

**Giải pháp**:
1. Kiểm tra Railway đã add PostgreSQL chưa
2. Variable `DATABASE_URL` đã có chưa
3. Chạy lại schema.sql nếu bảng chưa tồn tại

### Vấn đề 3: 404 Not Found trên Vercel

**Triệu chứng**: Trang không load, báo 404

**Giải pháp**:
1. Kiểm tra Root Directory = `frontend` trong Vercel Settings
2. Kiểm tra file `index.html` có trong folder `frontend/`
3. Redeploy Vercel

### Vấn đề 4: Domain không trỏ về Vercel

**Triệu chứng**: Nhập `thienphumut.vn` không mở website

**Giải pháp**:
1. Kiểm tra DNS records đã đúng chưa (https://dnschecker.org/)
2. Chờ DNS propagation (tối đa 48h)
3. Tắt Proxy trên CloudFlare nếu dùng
4. Xóa cache trình duyệt: Ctrl+Shift+Delete

### Vấn đề 5: Login không thành công

**Triệu chứng**: Nhập đúng email/password nhưng báo lỗi

**Giải pháp**:
1. Kiểm tra đã seed database chưa
2. Kiểm tra Network tab xem API trả về gì
3. Kiểm tra Backend logs trên Railway
4. Reset password qua database nếu cần

---

## 📊 Monitoring

### Railway Logs

Xem logs Backend:
1. Railway Dashboard → Project
2. **Deployments** → Click deployment mới nhất
3. **View Logs**

### Vercel Logs

Xem logs Frontend:
1. Vercel Dashboard → Project
2. **Deployments** → Click deployment mới nhất
3. **Functions** (nếu có) hoặc **Build Logs**

---

## 🎉 Hoàn thành!

Website của bạn đã live tại:
- **Production**: https://thienphumut.vn
- **Backend API**: https://your-backend.railway.app

**Tài khoản mặc định**:
- Admin: admin@thienphumut.vn / password123
- HR Manager: hr@thienphumut.vn / password123
- Employee: engineer@thienphumut.vn / password123

**🔐 Nhớ đổi mật khẩu ngay sau khi đăng nhập lần đầu!**

---

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra phần Troubleshooting
2. Xem logs trên Railway/Vercel
3. Kiểm tra Network tab (F12) để debug API calls
4. Xem lại từng bước cấu hình

---

**Good luck! 🚀**
