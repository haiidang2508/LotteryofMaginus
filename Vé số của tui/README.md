# Ứng Dụng Bán Vé Số Online

## 📋 Hướng Dẫn Cài Đặt và Chạy

### 1️⃣ **Yêu Cầu Hệ Thống**
- Node.js (phiên bản 12 trở lên)
- NPM hoặc Yarn

### 2️⃣ **Cài Đặt Dependencies**
```bash
npm install
```

### 3️⃣ **Chạy Server**
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

### 4️⃣ **Truy Cập Ứng Dụng**
Mở trình duyệt và vào: `http://localhost:3000`

---

## 📁 Cấu Trúc File

```
📦 Vé số của tui
├── 📄 index.html              # Trang chính bán vé
├── 📄 database.html           # Trang lịch sử mua vé
├── 📄 buy-form.html           # Form mua vé riêng
├── 📄 style.css               # CSS trang chính
├── 📄 database-style.css      # CSS trang lịch sử
├── 📄 form-style.css          # CSS form
├── 📄 server.js               # Server Node.js
├── 📄 package.json            # Dependencies
└── 📄 purchases.json          # 🔒 DATABASE (Chỉ dev thấy)
```

---

## 🎯 Tính Năng

### 🎟️ Trang Chính (index.html)
- Hiển thị 10 vé số ngẫu nhiên
- Click "Mua vé" để mua vé
- Modal form nhập tên người mua
- Dữ liệu lưu vào localStorage (trình duyệt)

### 📝 Trang Lịch Sử (database.html)
- Xem danh sách tất cả người đã mua vé
- Thống kê tổng số vé bán
- **Xuất Dữ Liệu (CSV)** - Download file CSV
- **Lưu Vào Database** - Lưu dữ liệu vào file `purchases.json`
- **Xóa Lịch Sử** - Xóa tất cả dữ liệu

---

## 💾 Hệ Thống Database

### localStorage (Tạm Thời)
- Dữ liệu lưu trong trình duyệt
- Hiển thị trên trang lịch sử ngay lập tức
- Tự động cập nhật mỗi 3 giây

### purchases.json (Vĩnh Viễn) 🔒
- File cơ sở dữ liệu chỉ dev thấy được
- Được cập nhật khi click **"Lưu Vào Database"**
- Lưu trữ vĩnh viễn trên server
- Format JSON dễ đọc

---

## 🔗 API Endpoints

Nếu server chạy, có thể dùng các API này:

### 1. Lấy danh sách mua vé
```
GET /api/purchases
```

### 2. Lưu tất cả dữ liệu
```
POST /api/save-purchases
```
Body: Array của các bản ghi

### 3. Thêm một bản ghi mới
```
POST /api/add-purchase
```
Body:
```json
{
  "ticketNumber": "001",
  "name": "Tên Người Mua",
  "date": "2026-01-28T10:30:00.000Z"
}
```

---

## 📊 Cấu Trúc Dữ Liệu Mua Vé

```json
[
  {
    "ticketNumber": "042",
    "name": "Nguyễn Văn A",
    "date": "2026-01-28T10:30:45.123Z"
  },
  {
    "ticketNumber": "089",
    "name": "Trần Thị B",
    "date": "2026-01-28T10:35:12.456Z"
  }
]
```

---

## 🚀 Quy Trình Mua Vé

1. **Bấm nút "Mua vé"** trên vé
2. **Nhập tên** người mua trong modal
3. **Bấm "Xác Nhận Mua"**
4. Dữ liệu được lưu vào `localStorage` (tạm thời)
5. Vào trang "Lịch Sử Mua Vé" để xem
6. Bấm **"Lưu Vào Database"** để lưu vĩnh viễn vào `purchases.json`

---

## ⚠️ Lưu Ý Quan Trọng

- **Để chạy được**, phải cài Node.js và chạy server (`npm start`)
- **purchases.json** là file database chỉ dev thấy được
- **localStorage** là dữ liệu tạm thời trong trình duyệt
- Click **"Lưu Vào Database"** để đồng bộ dữ liệu từ localStorage sang file JSON

---

## 📝 Thêm Bản Ghi Thủ Công

Mở file `purchases.json` và thêm bản ghi (format JSON):

```json
[
  {
    "ticketNumber": "050",
    "name": "Phạm Anh C",
    "date": "2026-01-28T14:20:00.000Z"
  }
]
```

---

## 🔧 Troubleshooting

**❌ Lỗi: Cannot find module 'express'**
- Chạy: `npm install`

**❌ Port 3000 đang sử dụng**
- Đổi PORT trong `server.js`

**❌ Không lưu được vào database**
- Kiểm tra server có chạy không
- Kiểm tra console của trình duyệt (F12)

---

## 📞 Hỗ Trợ

Để cần giúp đỡ, vui lòng kiểm tra:
1. Server có chạy không? (`npm start`)
2. URL đúng? (`http://localhost:3000`)
3. Console trình duyệt (F12) có lỗi gì không?

Chúc bạn sử dụng vui vẻ! 🎉
