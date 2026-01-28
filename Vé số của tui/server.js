const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Đường dẫn file database
const dbFile = path.join(__dirname, 'purchases.json');

// Khởi tạo file database nếu chưa tồn tại
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify([], null, 2));
}

// API: Lấy danh sách mua vé
app.get('/api/purchases', (req, res) => {
  try {
    const data = fs.readFileSync(dbFile, 'utf8');
    const purchases = JSON.parse(data);
    res.json(purchases);
  } catch (error) {
    console.error('Error reading database:', error);
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// API: Lưu dữ liệu mua vé
app.post('/api/save-purchases', (req, res) => {
  try {
    const purchases = req.body;
    
    // Xóa dữ liệu cũ và ghi dữ liệu mới
    fs.writeFileSync(dbFile, JSON.stringify(purchases, null, 2));
    
    console.log(`✓ Saved ${purchases.length} purchases to database`);
    res.json({ 
      success: true, 
      message: `Đã lưu ${purchases.length} bản ghi vào database`,
      timestamp: new Date().toLocaleString('vi-VN')
    });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to save to database' 
    });
  }
});

// API: Thêm một bản ghi mới
app.post('/api/add-purchase', (req, res) => {
  try {
    const newPurchase = req.body;
    const data = fs.readFileSync(dbFile, 'utf8');
    const purchases = JSON.parse(data);
    
    purchases.push({
      ...newPurchase,
      savedAt: new Date().toISOString()
    });
    
    fs.writeFileSync(dbFile, JSON.stringify(purchases, null, 2));
    
    console.log(`✓ Added new purchase: ${newPurchase.name} - Vé ${newPurchase.ticketNumber}`);
    res.json({ 
      success: true, 
      message: 'Đã thêm bản ghi vào database'
    });
  } catch (error) {
    console.error('Error adding purchase:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to add purchase' 
    });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Server Vé Số Chạy Thành Công!       ║
╚════════════════════════════════════════╝

📍 Server Address: http://localhost:${PORT}
📁 Database File: ${dbFile}

🔗 Truy cập: http://localhost:${PORT}/index.html

📊 API Endpoints:
  - GET  /api/purchases          → Lấy danh sách mua vé
  - POST /api/save-purchases     → Lưu tất cả dữ liệu
  - POST /api/add-purchase       → Thêm một bản ghi

⚠️  Nhấn Ctrl+C để dừng server
  `);
});
