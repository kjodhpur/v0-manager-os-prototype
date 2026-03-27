export function HeartMetricsLogo({ 
  className = "",
  variant = "horizontal", // "horizontal" | "icon" | "dark"
  size = "default" // "sm" | "default" | "lg" | "xl"
}: { 
  className?: string; 
  variant?: "horizontal" | "icon" | "dark";
  size?: "sm" | "default" | "lg" | "xl";
}) {
  // The horizontal PNG has significant whitespace so we use explicit widths
  // on desktop to ensure the artwork itself is visually prominent.
  const sizeMap = {
    sm:      "h-7 md:h-8",
    default: "h-9 md:h-11",
    lg:      "h-10 md:h-14",
    xl:      "h-12 md:w-56 md:h-auto",
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
