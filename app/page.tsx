"use client";

import { useState } from "react";

export default function Home() {
  const [errorInput, setErrorInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const debugResult = {
    category: "DEPENDENCY CONFLICT",
    severity: "HIGH",
    title: "Your dependencies cannot be resolved.",
    rootCause:
      "Your current package versions have incompatible peer dependency requirements.",
    explanation:
      "One or more packages in your application require versions that cannot exist together in the same dependency tree.",
    possibleFixes: [
      "Check the peer dependency requirements of the conflicting packages.",
      "Upgrade or downgrade the package versions so they are compatible.",
      "Remove and reinstall node_modules after changing dependency versions.",
    ],
    recommendedFix: "npm install react@19 react-dom@19",
  };

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

        {/* Debug Result */}
        {showResult && (
          <section className="mt-12 w-full rounded-xl border border-gray-700 bg-[#161B22] p-8 text-left">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
                DEBUG RESULT
              </p>

              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                {debugResult.severity}
              </span>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold tracking-wide text-red-400">
                🔴 {debugResult.category}
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight">
                {debugResult.title}
              </h3>
            </div>

            <div className="mt-10 space-y-8">
              {/* Root Cause */}
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
                  ROOT CAUSE
                </p>

                <p className="mt-3 leading-7 text-gray-300">
                  {debugResult.rootCause}
                </p>
              </div>

              {/* Why It Happened */}
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
                  WHY THIS HAPPENED
                </p>

                <p className="mt-3 leading-7 text-gray-300">
                  {debugResult.explanation}
                </p>
              </div>

              {/* Possible Fixes */}
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
                  POSSIBLE FIXES
                </p>

                <ol className="mt-4 space-y-3">
                  {debugResult.possibleFixes.map((fix, index) => (
                    <li
                      key={fix}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-600 text-xs text-gray-400">
                        {index + 1}
                      </span>

                      <span className="leading-6">{fix}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Recommended Fix */}
              <div className="rounded-lg border border-gray-700 bg-[#0D1117] p-5">
                <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
                  RECOMMENDED FIX
                </p>

                <code className="mt-4 block overflow-x-auto font-mono text-sm text-green-400">
                  {debugResult.recommendedFix}
                </code>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}