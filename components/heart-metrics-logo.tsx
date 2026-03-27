export function HeartMetricsLogo({ 
  className = "",
  variant = "horizontal", // "horizontal" | "icon" | "dark"
  size = "default" // "default" | "sm" | "lg"
}: { 
  className?: string; 
  variant?: "horizontal" | "icon" | "dark";
  size?: "default" | "sm" | "lg";
}) {
  const sizeMap = {
    sm: "h-6",
    default: "h-8",
    lg: "h-10"
  };

  const logoSrc = {
    horizontal: "/hm-logo-horizontal.png",
    icon: "/hm-logo-icon.png",
    dark: "/hm-logo-dark.png"
  }[variant];

  if (variant === "icon") {
    return (
      <img
        src={logoSrc}
        alt="HeartMetrics"
        className={`${sizeMap[size]} w-auto ${className}`}
      />
    );
  }

  if (variant === "dark") {
    return (
      <img
        src={logoSrc}
        alt="HeartMetrics"
        className={`${sizeMap[size]} w-auto ${className}`}
      />
    );
  }

  // horizontal variant (default)
  return (
    <img
      src={logoSrc}
      alt="HeartMetrics"
      className={`${sizeMap[size]} w-auto ${className}`}
    />
  );
}
