"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import DebugInput from "@/components/DebugInput";
import DebugResult from "@/components/DebugResult";
import type { DebugResult as DebugResultType } from "@/types/debug";
import { analyzeError } from "@/lib/errorAnalyzer";

export default function Home() {
  const [errorInput, setErrorInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DebugResultType | null>(null);

  const handleAnalyze = () => {
    if (!errorInput.trim()) {
      alert("Please paste an error first.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const analysisResult = analyzeError(errorInput);

      setResult(analysisResult);
      setIsAnalyzing(false);
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

        {result && <DebugResult result={result} />}
      </section>
    </main>
  );
}