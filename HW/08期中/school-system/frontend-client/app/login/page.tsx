"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 呼叫我們在 Node.js 寫好的登入 API
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`🎉 登入成功！歡迎回來，${data.user.real_name} (${data.user.role})`);
        // 將後端發放的 JWT Token 存在瀏覽器中，之後身分驗證會用到
        localStorage.setItem("token", data.token);
      } else {
        setMessage(`❌ 登入失敗：${data.message}`);
      }
    } catch (error) {
      setMessage("❌ 無法連線到後端伺服器，請確保 Port 5001 正常運作。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 p-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            校務資訊系統
          </h1>
          <p className="text-sm text-slate-400 mt-2">請輸入您的帳號密碼以登入後台</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">使用者帳號</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
              placeholder="請輸入帳號"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">密碼</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="請輸入密碼"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90 focus:outline-none active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "驗證身分中..." : "安全登入"}
          </button>
        </form>

        {message && (
          <div className="mt-6 text-center rounded-xl p-3 bg-slate-900/60 border border-slate-800 text-sm font-medium">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}