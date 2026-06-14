"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [courseName, setCourseName] = useState("");
  const [capacity, setCapacity] = useState("60");
  const [message, setMessage] = useState("");
  const [adminName, setAdminName] = useState("");
  const router = useRouter();

  // 一進到這頁，先檢查有沒有登入 Token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("偵測到未登入，請先登入！");
      router.push("/login"); // 沒登入就踢回登入頁
    }
    // 這裡先簡單模擬拿名字，後續可以做一個 /api/auth/me 機制
    setAdminName("系統管理員");
  }, [router]);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");

    try {
      // 呼叫後端開課 API，並在 Headers 夾帶 Bearer Token
      const res = await fetch("http://localhost:5001/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          course_name: courseName,
          capacity: parseInt(capacity)
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.message} 課程ID: ${data.course.id}`);
        setCourseName("");
      } else {
        setMessage(`❌ 建立失敗：${data.message}`);
      }
    } catch (error) {
      setMessage("❌ 伺服器連線失敗");
    }
  };

  return (
    <main className="flex min-h-screen bg-slate-950 text-white font-sans">
      {/* 左側側邊欄 */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-6">
        <h2 className="text-xl font-bold text-purple-400 tracking-wider">校務管理後台</h2>
        <div className="text-sm text-slate-400">目前登入：<span className="text-white font-medium">{adminName}</span></div>
        <hr className="border-slate-800" />
        <nav className="space-y-2">
          <a href="#" className="block px-4 py-2.5 rounded-xl bg-purple-600 font-medium">🏫 課程管理</a>
          <a href="#" className="block px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 transition">🎓 學生學籍</a>
          <button 
            onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}
            className="w-full text-left px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-950/30 transition mt-10"
          >
            登出系統
          </button>
        </nav>
      </div>

      {/* 右側主內容區 */}
      <div className="flex-1 p-10 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100">課程教務管理</h1>
          <p className="text-sm text-slate-400 mt-1">行政人員專用開課系統</p>
        </div>

        {/* 開課表單 */}
        <div className="max-w-xl bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
          <h3 className="text-lg font-bold mb-6 text-slate-200">➕ 開設新學期課程</h3>
          <form onSubmit={handleCreateCourse} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-400 mb-2">課程名稱</label>
              <input
                type="text"
                required
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="例如：線性代數、微積分"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">選課人數上限</label>
              <input
                type="number"
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white focus:border-purple-500 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700 transition active:scale-[0.99]"
            >
              確認發布課程
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-center">
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}