"use client";

interface DebugInputProps {
  errorInput: string;
  isAnalyzing: boolean;
  onErrorChange: (value: string) => void;
  onAnalyze: () => void;
}

export default function DebugInput({
  errorInput,
  isAnalyzing,
  onErrorChange,
  onAnalyze,
}: DebugInputProps) {
  return (
    <>
      <textarea
        value={errorInput}
        onChange={(event) => onErrorChange(event.target.value)}
        placeholder="Paste your error or stack trace here..."
        className="mt-12 min-h-48 w-full resize-none rounded-xl border border-gray-700 bg-[#161B22] p-5 font-mono text-sm text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-gray-500"
      />

      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="mt-6 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAnalyzing ? "ANALYZING..." : "🔍 WHAT BROKE?"}
      </button>
    </>
  );
}