import type { DebugResult as DebugResultType } from "@/types/debug";

interface DebugResultProps {
  result: DebugResultType;
  onCopyFix: () => void;
  onTryAnother: () => void;
  isCopied: boolean;
}

export default function DebugResult({
  result,
  onCopyFix,
  onTryAnother,
  isCopied,
}: DebugResultProps) {
  // Remove numbering if AI returns things like:
  // "1. Identify the process..."
  // "1Identify the process..."
  const cleanFix = (fix: string) => {
    return fix.replace(/^\s*\d+[\.\)\-\s]*/, "").trim();
  };

  return (
    <section className="mt-12 w-full overflow-hidden rounded-xl border border-gray-700 bg-[#161B22] text-left shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 px-8 py-5">
        <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
          DEBUG RESULT
        </p>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${result.severity === "HIGH"
            ? "border-red-500/30 bg-red-500/10 text-red-400"
            : result.severity === "MEDIUM"
              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
              : "border-green-500/30 bg-green-500/10 text-green-400"
            }`}
        >
          {result.severity}
        </span>
      </div>

      <div className="p-8">
        {/* Category + Title */}
        <div>
          <p className="text-sm font-semibold tracking-wide text-red-400">
            🔴 {result.category}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {result.title}
          </h3>
        </div>

        <div className="mt-10 space-y-8">
          {/* Root Cause */}
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
              ROOT CAUSE
            </p>

            <p className="mt-3 leading-7 text-gray-300">
              {result.rootCause}
            </p>
          </div>

          {/* Explanation */}
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
              WHY THIS HAPPENED
            </p>

            <p className="mt-3 leading-7 text-gray-300">
              {result.explanation}
            </p>
          </div>

          {/* Possible Fixes */}
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
              POSSIBLE FIXES
            </p>

            <ol className="mt-5 space-y-4">
              {result.possibleFixes.map((fix, index) => (
                <li
                  key={`${index}-${fix}`}
                  className="flex items-start gap-4 text-gray-300"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-600 bg-[#0D1117] text-xs font-semibold text-gray-300">
                    {index + 1}
                  </span>

                  <span className="pt-0.5 leading-6">
                    {cleanFix(fix)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Recommended Fix */}
          <div className="rounded-xl border border-green-500/20 bg-[#0D1117] p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
                RECOMMENDED FIX
              </p>

              <span className="text-xs text-green-400">
                BEST NEXT STEP
              </span>
            </div>

            <code className="mt-5 block whitespace-pre-wrap break-words font-mono text-sm leading-7 text-green-400">
              {result.recommendedFix}
            </code>

            <button
              type="button"
              onClick={onCopyFix}
              className="mt-6 rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
              {isCopied ? "✓ COPIED!" : "📋 COPY FIX"}
            </button>
          </div>

          {/* Try Another */}
          <div className="flex justify-end border-t border-gray-700 pt-6">
            <button
              onClick={onTryAnother}
              className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-400 hover:bg-[#21262D] hover:text-white"
            >
              ↻ TRY ANOTHER ERROR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}