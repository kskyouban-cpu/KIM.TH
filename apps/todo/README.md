# 📝 KIM.TH Todo List Application

แอปพลิเคชันบันทึกสิ่งที่ต้องทำแบบเรียลไทม์ ด้วยฟีเจอร์ Local Storage ที่ปลอดภัย

## ✨ ฟีเจอร์หลัก

✅ **เพิ่มรายการ** - เพิ่มสิ่งที่ต้องทำใหม่ได้อย่างรวดเร็ว  
✅ **ทำเครื่องหมายเสร็จสิ้น** - ติดตามความก้าวหน้า  
✅ **ทำเครื่องหมายสำคัญ** - เน้นรายการที่สำคัญด้วยดาวสีทอง  
✅ **กรองรายการ** - ดูรายการตามสถานะ (ทั้งหมด, กำลังทำ, เสร็จแล้ว, สำคัญ)  
✅ **สถิติแบบเรียลไทม์** - แสดงจำนวนรายการทั้งหมด, เสร็จแล้ว, กำลังทำ  
✅ **Local Storage** - ข้อมูลของคุณอยู่ปลอดภัยในเบราว์เซอร์  
✅ **ลบรายการ** - ลบรายการเดี่ยวหรือทั้งหมด  
✅ **ส่งออก** - ดาวน์โหลดรายการเป็น JSON  
✅ **Responsive Design** - ใช้งานได้ทั้งบนเดสก์ท็อป และมือถือ  

## 🚀 วิธีใช้งาน

1. **เปิดแอปพลิเคชัน**
   ```
   http://localhost:3000/apps/todo/
   ```

2. **เพิ่มสิ่งที่ต้องทำ**
   - พิมพ์ข้อความในช่องกรอก
   - กด "➕ เพิ่ม" หรือกด Enter

3. **จัดการรายการ**
   - ✓ ทำเครื่องหมายว่าเสร็จแล้ว
   - ⭐ ทำเครื่องหมายว่าสำคัญ
   - 🗑️ ลบรายการ

4. **กรองรายการ**
   - "ทั้งหมด" - แสดงรายการทั้งหมด
   - "กำลังทำ" - แสดงเฉพาะรายการที่ยังไม่เสร็จ
   - "เสร็จแล้ว" - แสดงเฉพาะรายการที่เสร็จแล้ว
   - "⭐ สำคัญ" - แสดงเฉพาะรายการสำคัญ

5. **จัดการข้อมูล**
   - "🗑️ ลบรายการที่เสร็จแล้ว" - ลบรายการที่เสร็จแล้วทั้งหมด
   - "⚠️ ลบทั้งหมด" - ลบรายการทั้งหมด
   - "📥 ส่งออก" - ดาวน์โหลดรายการเป็น JSON

## 💾 Local Storage

แอปพลิเคชันใช้ Browser Local Storage เพื่อบันทึกข้อมูล:
- **Key**: `kim_th_todos`
- **Format**: JSON Array
- **ข้อมูลที่เก็บ**:
  - `id` - ID ของรายการ (Timestamp)
  - `text` - เนื้อหาของรายการ
  - `completed` - สถานะเสร็จสิ้น (true/false)
  - `important` - สถานะสำคัญ (true/false)
  - `createdAt` - วันที่สร้าง

## 🔒 ความปลอดภัย

- ✅ HTML Escaping - ป้องกัน XSS Attacks
- ✅ No External Dependencies - ไม่ต้องเสี่ยง
- ✅ Local Storage Only - ข้อมูลไม่ส่งไปที่เซิร์ฟเวอร์

## 📁 โครงสร้างไฟล์

```
apps/todo/
├── index.html        # HTML หลัก
├── style.css         # Styling
├── todo.js           # Logic หลัก (Class-based)
└── README.md         # เอกสารนี้
```

## 🛠️ การทำงานของ JavaScript

### TodoApp Class
```javascript
class TodoApp {
  - constructor()        // เริ่มต้นแอป
  - addTodo()           // เพิ่มรายการใหม่
  - toggleComplete()    // ทำเครื่องหมายเสร็จสิ้น
  - toggleImportant()   // ทำเครื่องหมายสำคัญ
  - deleteTodo()        // ลบรายการ
  - saveTodos()         // บันทึกลง Local Storage
  - loadTodos()         // โหลดจาก Local Storage
  - render()            // อัปเดต UI
  - exportTodos()       // ส่งออกเป็น JSON
}
```

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 🎨 UI/UX Features

- 🌈 Gradient Background
- 💫 Smooth Animations
- 🎯 Interactive Buttons
- 📊 Real-time Stats
- 🎉 Empty State Message
- ⚠️ Confirmation Modals

## 🐛 Troubleshooting

**โปรแกรมไม่แสดงรายการเดิม**
- ตรวจสอบว่า Local Storage ถูกเปิดใช้งาน
- ล้าง Browser Cache และลองใหม่
- ตรวจสอบ DevTools > Application > Local Storage

**ข้อมูลหายไป**
- Local Storage จะถูกล้างถ้า:
  - ล้าง Browser History และ Cache
  - ปิดใช้งาน Cookies
  - ใช้ Incognito/Private Mode

## 📝 License

MIT License - ใช้ได้อย่างอิสระ
