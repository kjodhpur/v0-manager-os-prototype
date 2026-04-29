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

// Core geometry
const cx = 200, cy = 200, r = 110, labelR = r + 48;
const angle = (i: number) => (Math.PI * 2 * i) / 5 - Math.PI / 2;
const pt = (radius: number, i: number) => ({
  x: cx + radius * Math.cos(angle(i)),
  y: cy + radius * Math.sin(angle(i)),
});

const ringPath = (pct: number) =>
  [0, 1, 2, 3, 4]
    .map((i) => { const p = pt((pct / 100) * r, i); return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`; })
    .join(' ') + ' Z';

// Compute viewBox that fits all label positions + padding
const PAD = 36; // extra room for text that extends beyond the label point
const labelPoints = [0, 1, 2, 3, 4].map((i) => pt(labelR + PAD, i));
const minX = Math.min(...labelPoints.map((p) => p.x)) - PAD;
const maxX = Math.max(...labelPoints.map((p) => p.x)) + PAD;
const minY = Math.min(...labelPoints.map((p) => p.y)) - PAD;
const maxY = Math.max(...labelPoints.map((p) => p.y)) + PAD;
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
      style={{ maxWidth: 400, display: 'block' }}
    >
      {/* Grid rings */}
      {[25, 50, 75, 100].map((pct) => (
        <path key={pct} d={ringPath(pct)} fill="none" stroke="var(--border)" strokeWidth={1} opacity={0.5} />
      ))}

      {/* Spokes */}
      {components.map((_, i) => {
        const outer = pt(r, i);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="var(--border)" strokeWidth={1} opacity={0.5} />;
      })}

      {/* Data fill */}
      <path d={dataPath} fill={fillColor} fillOpacity={0.15} stroke={fillColor} strokeWidth={2} />

      {/* Dots + labels */}
      {components.map((comp, i) => {
        const dataPt = pt((comp.value / 100) * r, i);
        const labelPt = pt(labelR, i);
        const isSelected = selected === comp.name;
        const textAnchor = labelPt.x < cx - 10 ? 'end' : labelPt.x > cx + 10 ? 'start' : 'middle';
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
              x={labelPt.x} y={labelPt.y - 10}
              textAnchor={textAnchor}
              fill="var(--fg)" fontSize={14} fontWeight={isSelected ? 700 : 400}
              className="transition-all duration-200 select-none"
            >
              {comp.shortName}
            </text>
            <text
              x={labelPt.x} y={labelPt.y + 10}
              textAnchor={textAnchor}
              fill={color} fontSize={16} fontWeight={700}
            >
              {comp.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}