"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [developerMessage, setDeveloperMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          developer_message: developerMessage,
          user_message: userMessage,
          api_key: apiKey,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Unknown error");
      }
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");
      let result = "";
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setResponse(result);
      }
    } catch (err: any) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold text-center text-foreground mb-8" style={{ letterSpacing: '-0.02em' }}>
              This is Wael&apos;s First Node.js App
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl bg-white/80 dark:bg-black/40 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8">
        <label className="font-semibold">OpenAI API Key
          <input
            type="password"
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-black text-black dark:text-white"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            required
            autoComplete="off"
            placeholder="sk-..."
          />
        </label>
        <label className="font-semibold">Developer Message
          <input
            type="text"
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-black text-black dark:text-white"
            value={developerMessage}
            onChange={e => setDeveloperMessage(e.target.value)}
            required
            placeholder="System prompt or context"
          />
        </label>
        <label className="font-semibold">User Message
          <input
            type="text"
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-black text-black dark:text-white"
            value={userMessage}
            onChange={e => setUserMessage(e.target.value)}
            required
            placeholder="User's message"
          />
        </label>
        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send to OpenAI"}
        </button>
        {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
      </form>
      {response && (
        <div className="w-full max-w-xl bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-inner text-black dark:text-white whitespace-pre-wrap">
          <strong>OpenAI Response:</strong>
          <div>{response}</div>
        </div>
      )}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
