interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({
  message,
  type,
  onClose,
}: ToastProps) {
  return (
    <div
      className={`fixed right-6 top-6 z-[100] flex max-w-sm items-start gap-3 rounded-xl border px-5 py-4 shadow-2xl backdrop-blur ${
        type === "success"
          ? "border-green-500/20 bg-[#0D1117]/95"
          : "border-red-500/20 bg-[#0D1117]/95"
      }`}
    >
      <span
        className={
          type === "success"
            ? "text-green-400"
            : "text-red-400"
        }
      >
        {type === "success" ? "✓" : "⚠"}
      </span>

      <p
        className={`flex-1 text-sm leading-6 ${
          type === "success"
            ? "text-green-200"
            : "text-red-200"
        }`}
      >
        {message}
      </p>

      <button
        type="button"
        onClick={onClose}
        className="text-xs text-gray-500 transition hover:text-white"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}