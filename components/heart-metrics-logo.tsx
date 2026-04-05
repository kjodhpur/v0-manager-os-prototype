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

  return (
    <span className={`inline-block relative overflow-hidden ${className}`}>
      {/* Original logo */}
      <img
        src={logoSrc}
        alt="HeartMetrics"
        className={`${sizeMap[size]} w-auto ${variant === "horizontal" ? "object-contain leading-none" : ""} relative`}
      />
      {/* Gradient color overlay */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #00B8A0 0%, #5DD67A 45%, #FFB347 100%)",
          mixBlendMode: "color",
        }}
      />
    </span>
  );
}
