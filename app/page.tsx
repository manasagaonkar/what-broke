"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DebugInput from "@/components/DebugInput";
import DebugResult from "@/components/DebugResult";
import type {
  DebugHistoryItem,
  DebugResult as DebugResultType,
} from "@/types/debug";
import { analyzeError } from "@/lib/errorAnalyzer";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import DebugDiary from "@/components/DebugDiary";
import ExampleErrors from "@/components/ExampleErrors";
import Toast from "@/components/Toast";
import ConfirmDialog from "@/components/ConfirmDialog";

const DEBUG_HISTORY_STORAGE_KEY = "what-broke-debug-history";

export default function Home() {
  const [errorInput, setErrorInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DebugResultType | null>(null);
  const [history, setHistory] = useState<DebugHistoryItem[]>([]);
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [inputError, setInputError] = useState("");

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

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
      setInputError(
        "Please paste an error before analyzing. Try one of the examples below if you need a test."
      );
      return;
    }

    setInputError("");

    setIsAnalyzing(true);
    setResult(null);
    setIsCopied(false);

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

      setNotification({
        message: "We couldn't analyze this error right now. Please try again.",
        type: "error",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTryAnother = () => {
    setErrorInput("");
    setResult(null);
    setIsAnalyzing(false);
    setIsCopied(false);
    setInputError("");
  };

  // const handleClearHistory = () => {
  //   const shouldClear = window.confirm(
  //     "Are you sure you want to delete all debugging history?"
  //   );

  //   if (!shouldClear) {
  //     return;
  //   }

  //   setHistory([]);
  //   localStorage.removeItem(DEBUG_HISTORY_STORAGE_KEY);
  // };

  const handleClearHistory = () => {
    setIsClearDialogOpen(true);
  };

  const confirmClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(DEBUG_HISTORY_STORAGE_KEY);

    setIsClearDialogOpen(false);

    setNotification({
      message: "Debug diary cleared successfully.",
      type: "success",
    });
  };

  const handleCopyFix = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.recommendedFix);

      setNotification({
        message: "Recommended fix copied to clipboard.",
        type: "success",
      });

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy fix:", error);
      setNotification({
        message: "Could not copy the fix. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      <Navbar
        onOpenDiary={() => setIsDiaryOpen(true)}
      />

      {/* Hero */}
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-16 pt-24 text-center sm:px-8 lg:pt-28">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

          <p className="text-xs font-medium tracking-[0.3em] text-gray-500">
            DEBUG. UNDERSTAND. FIX.
          </p>

          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          SOMETHING BROKE?
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
          Good. That&apos;s where engineering gets interesting.
          <br className="hidden sm:block" />
          Paste your error and find out what broke, why it broke,
          and how to fix it.
        </p>

        {/* Error Input */}
        <div className="mt-12 w-full max-w-4xl">
          <DebugInput
            errorInput={errorInput}
            isAnalyzing={isAnalyzing}
            onErrorChange={(value) => {
              setErrorInput(value);
              setInputError("");
            }}
            onAnalyze={handleAnalyze}
          />
          {inputError && (
            <div className="mt-4 flex w-full items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-left">
              <span className="mt-0.5 text-yellow-400">⚠</span>

              <p className="text-sm leading-6 text-yellow-200">
                {inputError}
              </p>

              <button
                type="button"
                onClick={() => setInputError("")}
                className="ml-auto shrink-0 text-xs text-gray-500 transition hover:text-white"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Example Errors */}
        <div className="mt-7 w-full max-w-4xl">
          <ExampleErrors
            onSelectExample={(error) => {
              setErrorInput(error);
              setResult(null);
              setIsCopied(false);
              setInputError("");
            }}
          />
        </div>

        {/* Product highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="text-yellow-400">⚡</span>
            Fast rule-based checks
          </span>

          <span className="hidden text-gray-700 sm:inline">
            •
          </span>

          <span className="flex items-center gap-2">
            <span className="text-purple-400">✦</span>
            AI-powered fallback
          </span>

          <span className="hidden text-gray-700 sm:inline">
            •
          </span>

          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Ready-to-copy fixes
          </span>
        </div>

        {/* Loading */}
        {isAnalyzing && (
          <div className="mt-10 w-full max-w-4xl">
            <LoadingAnalysis />
          </div>
        )}

        {/* Divider before result */}
        {result && !isAnalyzing && (
          <div className="mt-14 flex w-full max-w-4xl items-center gap-4">
            <div className="h-px flex-1 bg-gray-800" />

            <span className="text-xs font-medium tracking-[0.2em] text-gray-600">
              ANALYSIS COMPLETE
            </span>

            <div className="h-px flex-1 bg-gray-800" />
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="w-full max-w-4xl">
            <DebugResult
              result={result}
              onCopyFix={handleCopyFix}
              onTryAnother={handleTryAnother}
              isCopied={isCopied}
            />
          </div>
        )}
      </section>

      {/* Debug Diary */}
      {isDiaryOpen && (
        <DebugDiary
          history={history}
          onClose={() => setIsDiaryOpen(false)}
          onClearHistory={handleClearHistory}
        />
      )}

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {isClearDialogOpen && (
        <ConfirmDialog
          onConfirm={confirmClearHistory}
          onCancel={() => setIsClearDialogOpen(false)}
        />
      )}
    </main>
  );
}