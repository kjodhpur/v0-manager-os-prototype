export function HeartMetricsLogo({ 
  className = "",
  variant = "horizontal", // "horizontal" | "icon" | "dark"
  size = "default" // "sm" | "default" | "lg" | "xl"
}: { 
  className?: string; 
  variant?: "horizontal" | "icon" | "dark";
  size?: "sm" | "default" | "lg" | "xl";
}) {
  const sizeMap = {
    sm: "h-7",
    default: "h-10",
    lg: "h-14",
    xl: "h-20"
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
