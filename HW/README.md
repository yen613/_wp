# 金門大學 資訊工程學系 — 課程作業總覽

> 學生：李芷妍 (Yen Lee)

---

## 目錄結構與各作業簡介

### `01/` — HW1：個人網站 (HTML/CSS)
- **`HW1`** — 單頁 HTML 個人履歷網站，使用藍紫色漸層主題，包含自我介紹、教育背景、專業技能、專案經歷等區塊。響應式設計，支援手機排版。

### `02/` — HW2：課程滿意度問卷表單 (HTML)
- **`HW2`** — HTML 表單練習，實作下拉選單、單選題、複選題、文字區域、提交/重設按鈕等表單元件。

### `03/` — HW3：JavaScript 環境入門
- **`hello.js`** — 經典 `console.log("Hello, World!")`，驗證 Node.js 環境。
- **`README.md`** — 作業說明與執行方式。

### `04/` — HW4：JavaScript 基礎語法練習 (10 題)
| 檔案 | 主題 |
|------|------|
| `1-if.js` | 奇偶數判斷 (`if-else`) |
| `2-while.js` | 倒數計時器 (`while` 迴圈) |
| `3-array,for.js` | 陣列總和與平均 (`for` 迴圈) |
| `4-array, for, if.js` | 尋找最大值 |
| `5-array, function, if.js` | 正數過濾器 |
| `6-object.js` | 個人檔案物件 (`object`) |
| `7-object, for...in.js` | 購物車金額計算 (`for...in`) |
| `8-json, object.js` | JSON 解析與轉換 |
| `9-array, object, for, if.js` | 學生陣列篩選 (及格名單) |
| `10-while, array.js` | 費氏數列產生器 |
- **`README.md`** — 題目說明、參考解答、執行結果、AI 輔助參考連結。

### `05/` — HW5：Node.js 部落格系統 (Express + SQLite)
三個版本的部落格系統，逐步增加功能：

| 版本 | 說明 |
|------|------|
| **`blog/`** | 完整版：使用者註冊/登入、session 管理、bcrypt 密碼加密、文章 CRUD、EJS 模板、CSS 樣式 |
| **`blog1/`** | 精簡版：無使用者驗證，開放所有人新增/編輯/刪除文章 |
| **`blog2/`** | 與 `blog/` 同為完整版（含驗證功能） |

**共同技術棧：** Node.js、Express 4、EJS 模板引擎、SQL.js (SQLite)、express-session  
**`blog` 與 `blog2` 額外引入：** bcryptjs 密碼雜湊、使用者註冊/登入/登出、路由守衛 (`requireAuth`)

**目錄結構 (以 `blog` 為例)：**
```
blog/
├── index.js           # 主入口，路由定義
├── database.js        # SQLite 資料庫初始化與操作
├── package.json
├── blog.db            # SQLite 資料庫檔案
├── server.log         # 執行日誌
├── public/style.css   # 樣式表
└── views/             # EJS 模板
    ├── index.ejs      # 文章列表首頁
    ├── show.ejs       # 文章詳細頁
    ├── new.ejs        # 新增文章
    ├── edit.ejs       # 編輯文章
    ├── login.ejs      # 登入頁
    └── register.ejs   # 註冊頁
```

### `06/` — HW6：JavaScript 進階概念
| 檔案 | 主題 |
|------|------|
| `1.js` | 高階函數 — 將函數作為參數傳遞 (`mathTool`) |
| `2.js` | IIFE (立即呼叫函數表達式) |
| `3.js` | `Array.map()` 搭配箭頭函數 — 折扣計算 |
| `4.js` | 破壞性陣列操作 (`pop`, `unshift`) |
| `5.js` | 閉包 (Closure) — `multiplier` 回傳函數 |
| `6.js` | 手寫 `myFilter` — 自製陣列篩選函數 |
| `7.js` | `Array.filter()` 篩選物件陣列 |
| `8-README.md` | **觀念探討**：JS 傳參考 vs 傳值、`push` 修改 vs `=` 重新賦值 |
| `9.js` | `setTimeout` 非同步延遲執行 |
| `10.js` | `reduce` 加總 + callback 折扣函數 |

### `07/` — HW7：JavaScript 實務模式
| 檔案 | 主題 |
|------|------|
| `1.js` | 物件屬性存取：點符號 vs 中括號 |
| `2.js` | 解構賦值 (`const { title, content } = req.body`) |
| `3.js` | `forEach` 遍歷陣列 + 樣板字串拼接 HTML |
| `4.js` | 動態新增物件屬性 |
| `5.js` | Callback 模式 — 錯誤優先回呼 |
| `6.js` | `JSON.parse` + 巢狀物件存取 |
| `7.js` | 模擬資料庫查詢 (`fakeGet` + callback) |
| `8.js` | 三元運算子條件渲染 |
| `9.js` | (空白檔案) |
| `10.js` | 權限驗證 callback — `checkAdmin` 角色檢查 |

### `08期中/` — 期中專題：未來新一代校務資訊系統
前後端分離架構，藍紫色漸層主題的校務管理系統。

**後端 (`backend-core/`)**
| 檔案 | 說明 |
|------|------|
| `server.js` | Express 主入口，CORS、路由掛載 |
| `db.js` | Neon.tech PostgreSQL 雲端連線 |
| `authController.js` | 使用者註冊 (`bcrypt` 加密)、登入 (`JWT` 簽發) |
| `authMiddleware.js` | JWT 驗證中間件 (`protect`) + 角色授權 (`authorize`) |
| `courseController.js` | 課程建立 API (僅限 admin) |
| `.env` | 環境變數 (連接字串、JWT_SECRET) |

**前端 (`frontend-client/`) — Next.js 16 (App Router)**
| 頁面 | 說明 |
|------|------|
| `page.tsx` | 首頁 — 後端健康檢查 + 一鍵建立 Admin 帳號工具 |
| `login/page.tsx` | 登入頁 — 呼叫後端 JWT 登入 API，Token 存 `localStorage` |
| `admin/page.tsx` | 管理員後台 — 側邊欄 + 開課表單，夾帶 Bearer Token |

**技術棧：** Next.js 16、React 19、Tailwind CSS 4、TypeScript、Express 5、JWT、bcryptjs、Neon.tech PostgreSQL

### `09期末/` — 期末專題
- **`README.md`** — 目前為空白，待補。

---

## 學習曲線總覽

```
HTML/CSS 靜態頁面 → JavaScript 語法基礎 → Node.js 後端開發
  (HW1, HW2)          (HW3, HW4)           (HW5)
          
JavaScript 進階概念 → 實務設計模式 → 前後端分離全端專案
  (HW6)               (HW7)            (HW8 期中, HW9 期末)
```

## 執行方式

```bash
# Node.js 檔案
node HW/04/1-if.js

# 啟動部落格 (需先安裝相依套件)
cd HW/05/blog
npm install
npm start

# 啟動校務系統後端
cd HW/08期中/school-system/backend-core
npm install
npm run dev

# 啟動校務系統前端
cd HW/08期中/school-system/frontend-client
npm install
npm run dev
```
