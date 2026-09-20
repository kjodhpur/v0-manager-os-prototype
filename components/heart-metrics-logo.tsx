// The horizontal wordmark's viewBox carries padding so a wide serif can't be
// clipped, so these run slightly larger than the ink alone would need.
const SIZES = {
  sm: 'h-6 md:h-7',
  default: 'h-7 md:h-8',
  lg: 'h-9 md:h-11',
  xl: 'h-11 md:h-14',
  xxl: 'h-14 md:h-20',
} as const;

const SOURCES = {
  horizontal: '/hm-logo-horizontal.svg',
  icon: '/hm-logo-icon.svg',
  dark: '/hm-logo-dark.svg',
} as const;

/** Intrinsic ratios, used to reserve space so the logo never shifts layout. */
const RATIOS = {
  horizontal: { width: 1560, height: 250 },
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
