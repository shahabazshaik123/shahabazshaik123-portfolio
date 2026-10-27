import Link from "next/link";
import { BackgroundGlow } from "@/components/ui/BackgroundGlow";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08090F] text-[#F5F5F7] flex flex-col items-center justify-center p-4 relative selection:bg-purple-600/30 selection:text-white">
      <BackgroundGlow />
      <div className="text-center max-w-md mx-auto space-y-4">
        <span className="text-6xl font-extrabold gradient-text-purple font-mono">
          404
        </span>
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-neutral-400">
          The page or resource you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-purple-900/25 hover:from-purple-500 hover:to-indigo-500 transition-all"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
