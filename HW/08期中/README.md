# 🏫 未來新一代校務資訊系統 (School Management System)

這是一個基於前後端分離架構開發的現代化校務資訊系統。系統視覺全面採用高質感藍紫色漸層主題，核心整合了完整的使用者身分驗證與安全權限分流機制，未來計畫導入高效能選課模組。

## 🚀 技術堆疊 (Tech Stack)

### 前端 (Frontend)
- **Next.js 14+ (App Router)** - 現代化 React 框架
- **Tailwind CSS** - 藍紫色漸層視覺主題與響應式 UI 設計
- **TypeScript** - 確保前端型別安全

### 後端 (Backend Core)
- **Node.js & Express** - 核心 RESTful API 伺服器
- **JWT (JSON Web Token)** - 實現無狀態、安全的身分驗證與中間件安檢機制
- **bcrypt** - 使用者密碼高強度雜湊加密存儲

### 資料庫 (Database)
- **Neon.tech (PostgreSQL)** - 雲端關聯式資料庫

---

## 🛠️ 目前已實作功能 (Features)

1. **雲端資料庫建置**：於 Neon.tech 佈署 `users` 與 `courses` 資料表，支援外鍵關聯。
2. **開發者一鍵測試工具**：首頁整合自動化測試按鈕，可直接呼叫註冊 API 於雲端產生符合 `bcrypt` 加密規範的 `admin` 帳號。
3. **安全身分驗證**：實作登入功能，驗證成功後由後端發放 JWT Token 並安全儲存於前端 `localStorage`。
4. **權限安檢中間件 (Middleware)**：後端佈署路由守衛，精準攔截未登入請求，並實作角色分流（如：僅限 `admin` 存取特定 API）。
5. **教務開課後台**：前端實作管理員專屬控制台，包含側邊欄功能分流、防闖入機制，並可透過 Bearer Token 成功發布課程至雲端資料庫。

---

## 📂 專案目錄結構 (Project Structure)

```text
school-system/
├── backend-core/             # Node.js 後端核心
│   ├── node_modules/
│   ├── authController.js     # 註冊與登入邏輯
│   ├── authMiddleware.js     # JWT 權限驗證中間件 (警衛)
│   ├── courseController.js   # 課程管理邏輯 (開課 API)
│   ├── db.js                 # Neon.tech PostgreSQL 連線設定
│   ├── server.js             # 後端主入口
│   ├── .env                  # 環境變數 (連接字串、PORT、JWT_SECRET)
│   └── package.json
│
└── frontend-client/          # Next.js 前端客戶端
    ├── src/
    │   └── app/
    │       ├── page.tsx      # 📄 檔案 A：系統首頁 (附帶管理員帳號快速建立工具)
    │       ├── login/
    │       │   └── page.tsx  # 📄 檔案 B：高質感登入頁面
    │       └── admin/
    │           └── page.tsx  # 📄 檔案 C：管理員教務管理後台 (開課表單)
    ├── tailwind.config.ts
    └── package.json