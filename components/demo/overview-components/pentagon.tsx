import '@/styles/globals.css';

interface WWIComponent {
  name: string;
  shortName: string;
  value: number;
}

const getColor = (value: number) => {
  if (value >= 75) return 'var(--primary)';
  if (value >= 50) return 'var(--healthy)';
  if (value >= 25) return 'var(--warning)';
  return 'var(--accent)';
};

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
  const dataPath =
    components
      .map((c, i) => { const p = pt((c.value / 100) * r, i); return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`; })
      .join(' ') + ' Z';

  const avg = components.reduce((sum, c) => sum + c.value, 0) / components.length;
  const fillColor = getColor(avg);

  return (
    <svg
      viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
      width="100%"
      style={{ maxWidth: 480, display: 'block', margin: '0 auto' }}
    >
      {[25, 50, 75, 100].map((pct) => (
        <path key={pct} d={ringPath(pct)} fill="none" stroke="var(--border)" strokeWidth={1} opacity={0.5} />
      ))}

      {components.map((_, i) => {
        const outer = pt(r, i);
        return <line key={i} x1={0} y1={0} x2={outer.x} y2={outer.y} stroke="var(--border)" strokeWidth={1} opacity={0.5} />;
      })}

      <path d={dataPath} fill={fillColor} fillOpacity={0.15} stroke={fillColor} strokeWidth={2} />

      {components.map((comp, i) => {
        const dataPt = pt((comp.value / 100) * r, i);
        const labelPt = pt(labelR, i);
        const isSelected = selected === comp.name;
        const textAnchor = labelPt.x < -10 ? 'end' : labelPt.x > 10 ? 'start' : 'middle';
        const color = getColor(comp.value);

        return (
          <g key={comp.name} onClick={() => onSelect(isSelected ? null : comp.name)} className="cursor-pointer">
            <circle cx={dataPt.x} cy={dataPt.y} r={18} fill="transparent" />
            <circle
              cx={dataPt.x} cy={dataPt.y}
              r={isSelected ? 7 : 5}
              fill={isSelected ? fillColor : color}
              stroke="var(--neutral)"
              strokeWidth={2}
              className="transition-all duration-200"
            />
            <text
              x={labelPt.x}
              y={labelPt.y - VALUE_FONT_SIZE * 0.4}
              textAnchor={textAnchor}
              fill="var(--fg)"
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