export function HeartMetricsLogo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/hm-logo.png"
        alt="HeartMetrics Logo"
        className="h-8 w-auto"
      />
      {showText && <span className="text-lg font-semibold text-primary">HeartMetrics</span>}
    </div>
  )
}
