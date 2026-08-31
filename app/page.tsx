export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-bold tracking-tight">
          WHAT BROKE?
        </h1>

        <button className="text-sm text-gray-400 transition hover:text-white">
          DEBUG DIARY
        </button>
      </nav>

      {/* Hero Section */}
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

        {/* Error Input */}
        <textarea
          placeholder="Paste your error or stack trace here..."
          className="mt-12 min-h-48 w-full resize-none rounded-xl border border-gray-700 bg-[#161B22] p-5 font-mono text-sm text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-gray-500"
        />

        {/* Button */}
        <button className="mt-6 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-105">
          🔍 WHAT BROKE?
        </button>
      </section>
    </main>
  );
}