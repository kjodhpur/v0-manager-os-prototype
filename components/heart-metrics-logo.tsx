export function HeartMetricsLogo({
  className = "",
  variant = "horizontal", // "horizontal" | "icon" | "dark"
  size = "default" // "sm" | "default" | "lg" | "xl" | "xxl"
}: {
  className?: string;
  variant?: "horizontal" | "icon" | "dark";
  size?: "sm" | "default" | "lg" | "xl" | "xxl";
}) {
  const sizeMap = {
    sm:      "h-7 md:h-8",
    default: "h-9 md:h-11",
    lg:      "h-10 md:h-14",
    xl:      "h-12 md:w-56 md:h-auto",
    xxl:     "h-20 md:h-28",
  };

  const logoSrc = {
    horizontal: "/hm-logo-horizontal.svg",
    icon: "/hm-logo-icon.svg",
    dark: "/hm-logo-dark.svg"
  }[variant];

  return (
    <img
      src={logoSrc}
      alt="HeartMetrics"
      className={`${sizeMap[size]} w-auto ${variant === "horizontal" ? "object-contain leading-none" : ""} ${className}`}
    />
  );
}
