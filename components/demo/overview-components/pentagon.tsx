import { getColor } from '@/lib/team-data';

interface WWIComponent {
  name: string;
  shortName: string;
  value: number;
}

// ── Tweak these to adjust text size ──
const LABEL_FONT_SIZE = 14;
const VALUE_FONT_SIZE = 16;
// ─────────────────────────────────────

const r = 110;
const labelGap = VALUE_FONT_SIZE * 3;
const labelR = r + labelGap;

const angle = (i: number) => (Math.PI * 2 * i) / 5 - Math.PI / 2;
const pt = (radius: number, i: number) => ({
  x: radius * Math.cos(angle(i)),
  y: radius * Math.sin(angle(i)),
});

const ringPath = (pct: number) =>
  [0, 1, 2, 3, 4]
    .map((i) => { const p = pt((pct / 100) * r, i); return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`; })
    .join(' ') + ' Z';

// ViewBox computed symmetrically from origin
// Compute raw bounds from label points
const outerPoints = [0, 1, 2, 3, 4].map((i) => pt(labelR, i));
const minX = Math.min(...outerPoints.map((p) => p.x)) - VALUE_FONT_SIZE * 5;
const maxX = Math.max(...outerPoints.map((p) => p.x)) + VALUE_FONT_SIZE * 5;
const minY = Math.min(...outerPoints.map((p) => p.y)) - VALUE_FONT_SIZE * 2;
const maxY = Math.max(...outerPoints.map((p) => p.y)) + VALUE_FONT_SIZE * 5; // extra bottom padding
const vbW = maxX - minX;
const vbH = maxY - minY;

export default function Pentagon({
  components,
  selected,
  onSelect,
}: {
  components: WWIComponent[];
  selected: string | null;
  onSelect: (name: string | null) => void;
}) {
  // The geometry assumes five axes; anything else would produce NaN coordinates.
  const points = components.slice(0, 5);
  if (points.length === 0) {
    return <p className="py-8 text-sm text-muted-foreground">No component data available.</p>;
  }

  const dataPath =
    points
      .map((c, i) => { const p = pt((c.value / 100) * r, i); return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`; })
      .join(' ') + ' Z';

  const avg = points.reduce((sum, c) => sum + c.value, 0) / points.length;
  const fillColor = getColor(avg);
  const summary = points.map((c) => `${c.shortName} ${c.value}`).join(', ');

  return (
    <svg
      viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
      width="100%"
      role="img"
      aria-label={`Five-component wellbeing signal: ${summary}`}
      style={{ maxWidth: 480, display: 'block', margin: '0 auto' }}
    >
      {[25, 50, 75, 100].map((pct) => (
        <path key={pct} d={ringPath(pct)} fill="none" stroke="var(--border)" strokeWidth={1} opacity={0.5} />
      ))}

      {points.map((_, i) => {
        const outer = pt(r, i);
        return <line key={i} x1={0} y1={0} x2={outer.x} y2={outer.y} stroke="var(--border)" strokeWidth={1} opacity={0.5} />;
      })}

      <path d={dataPath} fill={fillColor} fillOpacity={0.15} stroke={fillColor} strokeWidth={2} />

      {points.map((comp, i) => {
        const dataPt = pt((comp.value / 100) * r, i);
        const labelPt = pt(labelR, i);
        const isSelected = selected === comp.name;
        const textAnchor = labelPt.x < -10 ? 'end' : labelPt.x > 10 ? 'start' : 'middle';
        const color = getColor(comp.value);

        return (
          <g
            key={comp.name}
            onClick={() => onSelect(isSelected ? null : comp.name)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${comp.name}: ${comp.value}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(isSelected ? null : comp.name);
              }
            }}
          >
            <circle cx={dataPt.x} cy={dataPt.y} r={18} fill="transparent" />
            <circle
              cx={dataPt.x} cy={dataPt.y}
              r={isSelected ? 7 : 5}
              fill={isSelected ? fillColor : color}
              stroke="var(--card)"
              strokeWidth={2}
              className="transition-all duration-200"
            />
            <text
              x={labelPt.x}
              y={labelPt.y - VALUE_FONT_SIZE * 0.4}
              textAnchor={textAnchor}
              fill="currentColor"
              fontSize={LABEL_FONT_SIZE}
              fontWeight={isSelected ? 700 : 400}
              className="transition-all duration-200 select-none"
            >
              {comp.shortName}
            </text>
            <text
              x={labelPt.x}
              y={labelPt.y + VALUE_FONT_SIZE * 1.1}
              textAnchor={textAnchor}
              fill={color}
              fontSize={VALUE_FONT_SIZE}
              fontWeight={700}
            >
              {comp.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}