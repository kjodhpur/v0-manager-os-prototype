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
    sm:      { height: 28, iconSize: 20, fontSize: 14, subSize: 7 },
    default: { height: 36, iconSize: 24, fontSize: 17, subSize: 8 },
    lg:      { height: 44, iconSize: 30, fontSize: 22, subSize: 10 },
    xl:      { height: 52, iconSize: 36, fontSize: 26, subSize: 12 },
  };

  const s = sizeMap[size];
  const gradientId = `logo-gradient-${size}-${variant}`;

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ height: s.iconSize, width: s.iconSize }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B8A0" />
            <stop offset="50%" stopColor="#5DD67A" />
            <stop offset="100%" stopColor="#FFB347" />
          </linearGradient>
        </defs>
        {/* Heart shape */}
        <path
          d="M20 35 C10 28, 2 22, 2 14 C2 8, 7 4, 12 4 C15 4, 18 6, 20 9 C22 6, 25 4, 28 4 C33 4, 38 8, 38 14 C38 22, 30 28, 20 35Z"
          fill={`url(#${gradientId})`}
        />
        {/* Heartbeat line */}
        <path
          d="M8 18 L14 18 L16 12 L19 24 L22 14 L24 18 L32 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  // horizontal variant (default & dark)
  // Total width: icon + gap + text
  const totalWidth = s.iconSize + 8 + s.fontSize * 8;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${s.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: s.height, width: 'auto' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00B8A0" />
          <stop offset="45%" stopColor="#5DD67A" />
          <stop offset="100%" stopColor="#FFB347" />
        </linearGradient>
      </defs>

      {/* Heart icon */}
      <g transform={`translate(0, ${(s.height - s.iconSize) / 2})`}>
        <svg
          viewBox="0 0 40 40"
          width={s.iconSize}
          height={s.iconSize}
        >
          <path
            d="M20 35 C10 28, 2 22, 2 14 C2 8, 7 4, 12 4 C15 4, 18 6, 20 9 C22 6, 25 4, 28 4 C33 4, 38 8, 38 14 C38 22, 30 28, 20 35Z"
            fill={`url(#${gradientId})`}
          />
          <path
            d="M8 18 L14 18 L16 12 L19 24 L22 14 L24 18 L32 18"
            stroke={variant === "dark" ? "#111" : "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </g>

      {/* "Heart Metrics" text */}
      <text
        x={s.iconSize + 8}
        y={s.height / 2 - 2}
        fill={`url(#${gradientId})`}
        fontFamily="Georgia, 'Palatino', 'Times New Roman', serif"
        fontWeight="700"
        fontSize={s.fontSize}
        dominantBaseline="central"
      >
        Heart Metrics
      </text>

      {/* Subtitle - only for lg and xl */}
      {(size === "lg" || size === "xl") && (
        <text
          x={s.iconSize + 8}
          y={s.height / 2 + s.fontSize / 2 + 6}
          fill={variant === "dark" ? "#666" : "#A1A1AA"}
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontWeight="400"
          fontSize={s.subSize}
          letterSpacing="2"
          dominantBaseline="central"
        >
          PEOPLE INTELLIGENCE PLATFORM
        </text>
      )}
    </svg>
  );
}
