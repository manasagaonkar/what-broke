interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-gray-700 bg-[#161B22] p-6 text-left shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400">
            ⚠
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Clear Debug Diary?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              This will permanently remove all saved debugging
              history from this browser.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:bg-[#21262D] hover:text-white"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
          >
            CLEAR HISTORY
          </button>
        </div>
      </div>
    </div>
  );
}