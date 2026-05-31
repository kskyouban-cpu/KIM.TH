# KIM.TH - Custom Donation Overlay System

ระบบการโดเนทขึ้นจอแบบเรียลไทม์สำหรับสตรีมเมอร์ในประเทศไทย

## 📦 โครงสร้างโปรเจกต์

```
kim-th/
├── backend/                    # Server หลังบ้าน (Node.js + Express)
│   ├── server.js               # Main Server
│   ├── qr-generator.js         # ฟังก์ชันสร้าง QR PromptPay
│   ├── webhook-handler.js      # Endpoint รับ webhook จาก Gateway
│   └── db.js                   # การเชื่อมต่อ Database
│
├── frontend/
│   ├── donation/               # หน้าเว็บกรอกข้อมูลผู้โดเนท
│   │   ├── index.html
│   │   ├── donation.js
│   │   └── style.css
│   │
│   └── overlay/                # Overlay สำหรับสตรีม (OBS/Streamlabs)
│       ├── index.html
│       ├── overlay.js
│       └── style.css
│
├── package.json
└── .env                        # คีย์ลับและคอนฟิก
```

## 🚀 เริ่มต้นใช้งาน

### Prerequisites
- Node.js v14+
- npm หรือ yarn
- ความเข้าใจพื้นฐาน JavaScript, HTML, CSS

### Installation

```bash
# Clone repository
git clone https://github.com/kskyouban-cpu/KIM.TH.git
cd KIM.TH

# Install dependencies
npm install

# สร้าง .env file
cp .env.example .env

# เติมข้อมูล Payment Gateway API keys ใน .env
```

## 🎯 Features

- ✅ ฟอร์มโดเนทแบบ Real-time
- ✅ สร้าง QR Code PromptPay อัตโนมัติ
- ✅ รับ Webhook จากธนาคาร/Payment Gateway
- ✅ Overlay animation สำหรับสตรีม
- ✅ WebSocket เพื่อ Real-time notification
- ✅ Profanity Filter เพื่อความปลอดภัย

## 🔒 Security

- Webhook Signature Verification
- XSS Protection (textContent แทน innerHTML)
- Input Validation & Sanitization

## 📚 Documentation

- [Backend Setup](./docs/BACKEND.md)
- [Frontend Setup](./docs/FRONTEND.md)
- [API Reference](./docs/API.md)

## 📝 License

MIT License
