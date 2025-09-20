'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-white/80 mb-6">We encountered an error while loading EchoSphere.</p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
