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
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();

      if (!isAnalyzing) {
        onAnalyze();
      }
    }
  };

  const handleClear = () => {
    onErrorChange("");
  };

  return (
    <div className="w-full">
      {/* Input Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />

          <p className="text-xs font-semibold tracking-[0.2em] text-gray-400">
            ERROR INPUT
          </p>
        </div>

        <span className="text-xs text-gray-600">
          {errorInput.length} characters
        </span>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={errorInput}
          onChange={(event) => onErrorChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Paste your error, stack trace, or build failure here...

Example:
Error: listen EADDRINUSE: address already in use :::3000`}
          disabled={isAnalyzing}
          spellCheck={false}
          aria-label="Error input"
          className="min-h-56 w-full resize-none rounded-xl border border-gray-700 bg-[#161B22] p-5 pr-12 font-mono text-sm leading-7 text-gray-200 outline-none transition duration-200 placeholder:text-gray-600 hover:border-gray-600 focus:border-gray-500 focus:ring-1 focus:ring-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
        />

        {/* Clear button */}
        {errorInput && !isAnalyzing && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear error input"
            className="absolute right-4 top-4 rounded-md px-2 py-1 text-xs text-gray-600 transition hover:bg-gray-800 hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {/* Helper text */}
      <div className="mt-3 flex flex-col items-center justify-between gap-2 text-xs text-gray-600 sm:flex-row">
        <p>
          Paste the full error message for a more accurate analysis.
        </p>

        <p className="hidden sm:block">
          <span className="text-gray-500">Ctrl</span>
          {" + "}
          <span className="text-gray-500">Enter</span>
          {" to analyze"}
        </p>
      </div>

      {/* Analyze Button */}
      <button
        type="button"
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-black shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isAnalyzing ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-400 border-t-black" />
            ANALYZING...
          </>
        ) : (
          <>
            ⚡ WHAT BROKE?
          </>
        )}
      </button>
    </div>
  );
}