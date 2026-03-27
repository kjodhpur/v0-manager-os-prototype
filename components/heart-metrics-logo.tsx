export function HeartMetricsLogo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/hm-logo.png"
        alt="HeartMetrics Logo"
        className="h-10 w-auto"
      />
      {showText && <span className="text-xl font-semibold text-primary">HeartMetrics</span>}
    </div>
  )
}
