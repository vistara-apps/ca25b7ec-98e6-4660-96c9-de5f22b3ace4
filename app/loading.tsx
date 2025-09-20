export default function Loading() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="animate-pulse space-y-4 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full mx-auto animate-bounce"></div>
        <div className="h-4 bg-white/20 rounded w-32 mx-auto"></div>
        <div className="h-3 bg-white/10 rounded w-24 mx-auto"></div>
      </div>
    </div>
  );
}
