import type { DebugResult as DebugResultType } from "@/types/debug";

interface DebugResultProps {
  result: DebugResultType;
}

export default function DebugResult({
  result,
}: DebugResultProps) {
  return (
    <section className="mt-12 w-full rounded-xl border border-gray-700 bg-[#161B22] p-8 text-left">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
          DEBUG RESULT
        </p>

        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
          {result.severity}
        </span>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold tracking-wide text-red-400">
          🔴 {result.category}
        </p>

        <h3 className="mt-3 text-3xl font-bold tracking-tight">
          {result.title}
        </h3>
      </div>

      <div className="mt-10 space-y-8">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
            ROOT CAUSE
          </p>

          <p className="mt-3 leading-7 text-gray-300">
            {result.rootCause}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
            WHY THIS HAPPENED
          </p>

          <p className="mt-3 leading-7 text-gray-300">
            {result.explanation}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
            POSSIBLE FIXES
          </p>

          <ol className="mt-4 space-y-3">
            {result.possibleFixes.map((fix, index) => (
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

        <div className="rounded-lg border border-gray-700 bg-[#0D1117] p-5">
          <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
            RECOMMENDED FIX
          </p>

          <code className="mt-4 block overflow-x-auto font-mono text-sm text-green-400">
            {result.recommendedFix}
          </code>
        </div>
      </div>
    </section>
  );
}