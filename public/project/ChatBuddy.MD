ChatBuddy AI — ระบบผู้ช่วยแม่ค้าออนไลน์อัจฉริยะ
AI-Powered LINE Chatbot สำหรับธุรกิจ SME ไทย
รับออเดอร์ · วิเคราะห์ลูกค้า · บันทึกข้อมูล · แสดง Dashboard อัตโนมัติ
ภาพรวมระบบ
ChatBuddy คือระบบ AI Chatbot สำหรับ LINE ที่ออกแบบมาเพื่อช่วยแม่ค้าออนไลน์ไทย (SME) จัดการการสนทนากับลูกค้าแบบอัตโนมัติ ตั้งแต่รับออเดอร์ ตอบคำถามสินค้า ไปจนถึงแจ้งสถานะการจัดส่ง

### ฟีเจอร์หลัก

| ฟีเจอร์ | รายละเอียด |
|---|---|
| **รับออเดอร์อัตโนมัติ** | AI เข้าใจและบันทึกออเดอร์จากการสนทนาลงชีทได้เลย |
| **ตอบคำถามสินค้า** | ดึงข้อมูลสินค้า ราคา สต็อก จาก Database แบบ Real-time |
| **เช็คสถานะออเดอร์** | ลูกค้าถามสถานะพัสดุได้ทันทีผ่านชื่อหรือเบอร์โทร |
| **เช็คสลิปโอนเงิน** | ตรวจสอบสลิปธนาคารจากลูกค้า |
| **จัดการ Complaint** | ตรวจจับลูกค้าไม่พอใจ แจ้งเตือน Admin ทันที |
| **Dashboard วิเคราะห์** | สรุป Intent, Sentiment, ยอดขาย แบบ Real-time |
| **จำบริบทการสนทนา** | Memory Buffer เก็บบริบทแยกตาม userId |


## Tech Stack

```
LINE Messaging API    →  รับส่งข้อความกับลูกค้า
n8n (Self-hosted)     →  Workflow Automation Engine
OpenRouter API        →  LLM (arcee-ai/trinity-large-preview)
Google Sheets API     →  Database (Orders, Products, Complaints)
Docker + Nginx        →  Deploy n8n + Dashboard
ngrok                 →  Expose localhost เป็น Public URL
EasySlip,ThunderSlip  →  เช็ค Slip จากธนาคารประเทศไทย
```

git repo:https://github.com/GiftNuttamon/ProjectAI-Business/tree/main
demo link : coming soon