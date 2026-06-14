"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<string>('正在嘗試連線到 Node.js 後端... ⏳');

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 text-white">
      <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-xl">
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          未來新一代校務系統
        </h1>
        <p className="text-lg text-slate-300 mb-4">前端環境：Next.js + Tailwind CSS</p>
        <div className="mt-6 px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800">
          <p className="text-md font-mono text-emerald-400">
            後端連線狀態：<span className="text-white font-sans">{status}</span>
          </p>
        </div>
      </div>
    </main>
  );
}