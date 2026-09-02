interface NavbarProps {
  onOpenDiary: () => void;
}

export default function Navbar({
  onOpenDiary,
}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <h1 className="text-xl font-bold tracking-tight">
        WHAT BROKE?
      </h1>

      <button
        onClick={onOpenDiary}
        className="text-sm text-gray-400 transition hover:text-white"
      >
        DEBUG DIARY
      </button>
    </nav>
  );
}