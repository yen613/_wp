"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [status, setStatus] = useState<string>('正在嘗試連線到 Node.js 後端... ⏳');
  const [regMessage, setRegMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5001/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setStatus(data.message);
        }
      })
      .catch(() => {
        setStatus('無法連線到後端服務，請檢查 Port 5001 是否有啟動！ ❌');
      });
  }, []);

  // 測試用：一鍵快速註冊管理員帳號
  const createTestAdmin = async () => {
    setRegMessage("正在建立...");
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "admin99",      // 你的測試登入帳號
          password: "superadmin123",  // 你的測試登入密碼
          real_name: "林校長",
          role: "admin"
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegMessage("🎉 測試管理員帳號建立成功！帳號: admin99 / 密碼: superadmin123");
      } else {
        setRegMessage(`⚠️ 提示：${data.message}`);
      }
    } catch (err) {
      setRegMessage("❌ 連線後端失敗");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 text-white space-y-6">
      <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-xl">
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          未來新一代校務系統
        </h1>
        <div className="px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 mb-6">
          <p className="text-md font-mono text-emerald-400">
            後端連線狀態：<span className="text-white font-sans">{status}</span>
          </p>
        </div>

        {/* 測試輔助區塊 */}
        <div className="p-4 bg-purple-950/40 border border-purple-800/50 rounded-xl text-left space-y-3">
          <h3 className="font-bold text-purple-300">🛠️ 開發人員測試工具</h3>
          <p className="text-sm text-slate-300">點擊下方按鈕，會在你的 Neon 雲端資料庫直接註冊一組經過 bcrypt 加密的真實管理員帳號：</p>
          <button 
            onClick={createTestAdmin}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold rounded-lg text-sm transition"
          >
            一鍵建立真實 Admin 帳號
          </button>
          {regMessage && <p className="text-xs font-mono text-yellow-300 mt-2">{regMessage}</p>}
        </div>

        <button 
          onClick={() => router.push('/login')}
          className="mt-6 w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition"
        >
          前往登入頁面 ➡️
        </button>
      </div>
    </main>
  );
}