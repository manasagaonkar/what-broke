"use client";

import { useState } from "react";

export default function Home() {
  const [errorInput, setErrorInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = () => {
    if (!errorInput.trim()) {
      alert("Please paste an error first.");
      return;
    }

    setIsAnalyzing(true);
    setShowResult(false);

    // Temporary fake analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-bold tracking-tight">
          WHAT BROKE?
        </h1>

        <button className="text-sm text-gray-400 transition hover:text-white">
          DEBUG DIARY
        </button>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-24 text-center">
        <p className="mb-4 text-sm tracking-[0.3em] text-gray-500">
          DEBUG. UNDERSTAND. FIX.
        </p>

        <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
          SOMETHING BROKE?
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
          Good. That&apos;s where engineering gets interesting.
        </p>

        {/* Error Input */}
        <textarea
          value={errorInput}
          onChange={(event) => setErrorInput(event.target.value)}
          placeholder="Paste your error or stack trace here..."
          className="mt-12 min-h-48 w-full resize-none rounded-xl border border-gray-700 bg-[#161B22] p-5 font-mono text-sm text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-gray-500"
        />

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="mt-6 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAnalyzing ? "ANALYZING..." : "🔍 WHAT BROKE?"}
        </button>

        {/* Temporary Result */}
        {showResult && (
          <section className="mt-12 w-full rounded-xl border border-gray-700 bg-[#161B22] p-6 text-left">
            <p className="text-sm tracking-[0.2em] text-gray-500">
              DEBUG RESULT
            </p>

            <h3 className="mt-4 text-2xl font-bold">
              Something in your application needs attention.
            </h3>

            <p className="mt-4 leading-7 text-gray-400">
              AI analysis will appear here. For now, this confirms that our
              frontend state and analysis flow are working correctly.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}