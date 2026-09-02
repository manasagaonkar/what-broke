"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DebugInput from "@/components/DebugInput";
import DebugResult from "@/components/DebugResult";
import type { DebugHistoryItem, DebugResult as DebugResultType } from "@/types/debug";
import { analyzeError } from "@/lib/errorAnalyzer";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import DebugDiary from "@/components/DebugDiary";

const DEBUG_HISTORY_STORAGE_KEY = "what-broke-debug-history";

export default function Home() {
  const [errorInput, setErrorInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DebugResultType | null>(null);
  const [history, setHistory] = useState<DebugHistoryItem[]>([]);
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      DEBUG_HISTORY_STORAGE_KEY,
      JSON.stringify(history)
    );
  }, [history]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(
      DEBUG_HISTORY_STORAGE_KEY
    );

    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);

      setHistory(
        parsedHistory.map(
          (item: DebugHistoryItem) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          })
        )
      );
    }
  }, []);

  const handleAnalyze = async () => {
    if (!errorInput.trim()) {
      alert("Please paste an error first.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      // First, try the fast rule-based analyzer
      const ruleBasedResult = analyzeError(errorInput);

      let finalResult = ruleBasedResult;

      // If our rules don't recognize the error, ask AI
      if (ruleBasedResult.category === "UNKNOWN ERROR") {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            error: errorInput,
          }),
        });

        if (!response.ok) {
          throw new Error("AI analysis failed.");
        }

        finalResult = await response.json();
      }

      // Keep the loading experience visible
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResult(finalResult);

      setHistory((previousHistory) => [
        ...previousHistory,
        {
          id: crypto.randomUUID(),
          error: errorInput,
          result: finalResult,
          createdAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Analysis failed:", error);

      alert(
        "We couldn't analyze this error right now. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };
  const handleCopyFix = () => {
    if (!result) return;

    navigator.clipboard.writeText(result.recommendedFix);
  };
  const handleTryAnother = () => {
    setErrorInput("");
    setResult(null);
  };
  const handleClearHistory = () => {
    const shouldClear = window.confirm(
      "Are you sure you want to delete all debugging history?"
    );

    if (!shouldClear) {
      return;
    }

    setHistory([]);
    localStorage.removeItem(DEBUG_HISTORY_STORAGE_KEY);
  };

  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      <Navbar
        onOpenDiary={() => setIsDiaryOpen(true)}
      />

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

        <DebugInput
          errorInput={errorInput}
          isAnalyzing={isAnalyzing}
          onErrorChange={setErrorInput}
          onAnalyze={handleAnalyze}
        />
        {isAnalyzing && <LoadingAnalysis />}

        {result && (
          <DebugResult
            result={result}
            onCopyFix={handleCopyFix}
            onTryAnother={handleTryAnother}
          />
        )}
      </section>
      {isDiaryOpen && (
        <DebugDiary
          history={history}
          onClose={() => setIsDiaryOpen(false)}
          onClearHistory={handleClearHistory}
        />
      )}
    </main>
  );
}