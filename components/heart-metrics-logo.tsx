export function HeartMetricsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/heartmetrics-logo.jpg"
        alt="HeartMetrics Logo"
        className="h-8 w-8 rounded object-contain"
      />
      <span className="text-xl font-semibold text-primary">HeartMetrics</span>
    </div>
  )
}
