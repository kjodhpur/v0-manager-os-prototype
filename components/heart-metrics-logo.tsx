const SIZES = {
  sm: 'h-5 md:h-6',
  default: 'h-6 md:h-7',
  lg: 'h-8 md:h-9',
  xl: 'h-10 md:h-12',
  xxl: 'h-12 md:h-16',
} as const;

const SOURCES = {
  horizontal: '/hm-logo-horizontal.svg',
  icon: '/hm-logo-icon.svg',
  dark: '/hm-logo-dark.svg',
} as const;

/** Intrinsic ratios, used to reserve space so the logo never shifts layout. */
const RATIOS = {
  horizontal: { width: 1000, height: 215 },
  icon: { width: 512, height: 512 },
  dark: { width: 512, height: 512 },
} as const;

export function HeartMetricsLogo({
  className = '',
  variant = 'horizontal',
  size = 'default',
}: {
  className?: string;
  variant?: keyof typeof SOURCES;
  size?: keyof typeof SIZES;
}) {
  const { width, height } = RATIOS[variant];

  return (
    <img
      src={SOURCES[variant]}
      alt="HeartMetrics"
      width={width}
      height={height}
      className={`${SIZES[size]} w-auto object-contain ${className}`}
    />
  );
}
