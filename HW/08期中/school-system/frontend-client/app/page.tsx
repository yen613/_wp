
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
'use client';
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