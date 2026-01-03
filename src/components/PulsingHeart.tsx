'use client';

export function PulsingHeart() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <svg
          className="w-20 h-20 text-red-600 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-300 border-t-red-600 rounded-full animate-spin" />
        </div>
      </div>
      <p className="mt-4 text-slate-600 font-medium">Searching for donors...</p>
    </div>
  );
}
