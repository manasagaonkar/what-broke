"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import DebugInput from "@/components/DebugInput";
import DebugResult from "@/components/DebugResult";
import type { DebugResult as DebugResultType } from "@/types/debug";

export default function Home() {
  const [errorInput, setErrorInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const debugResult: DebugResultType = {
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

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      <Navbar />

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

        {showResult && <DebugResult result={debugResult} />}
      </section>
    </main>
  );
}