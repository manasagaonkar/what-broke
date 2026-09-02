import type { DebugHistoryItem } from "@/types/debug";

interface DebugDiaryProps {
  history: DebugHistoryItem[];
  onClose: () => void;
}

export default function DebugDiary({
  history,
  onClose,
}: DebugDiaryProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-700 bg-[#161B22] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
              YOUR DEBUGGING HISTORY
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              DEBUG DIARY
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-400 hover:text-white"
          >
            ✕ CLOSE
          </button>
        </div>

        {history.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold">
              No debugging history yet.
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Analyze your first error and it will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {history
              .slice()
              .reverse()
              .map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-700 bg-[#0D1117] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-red-400">
                        {item.result.category}
                      </p>

                      <p className="mt-2 line-clamp-2 font-mono text-sm text-gray-400">
                        {item.error}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-gray-500">
                      {item.createdAt.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}