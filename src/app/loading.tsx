export default function Loading() {
  return (
    <div className="min-h-screen bg-[#08090F] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
}
