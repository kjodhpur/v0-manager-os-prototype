# ManagerOS — Product UI kit

High-fidelity recreation of the HeartMetrics in-product dashboard.

Screens covered in `index.html`:
- **Overview** — KPI row, AI insight, attention table, recommended actions
- **Work Distribution** — stacked bars per employee, color legend
- **Sidebar nav** — full 17-item list with active state

Components (JSX, loaded in `index.html` via Babel):
- `TopBar.jsx` — logo, team selector, time range, Connected chip, user avatar
- `Sidebar.jsx` — sticky left nav
- `KPICard.jsx` — number + trend delta + subtitle
- `AIInsightCard.jsx` — Brain-glyph insight with "View suggestion" action
- `AttentionTable.jsx` — employees needing attention
- `WorkDistributionTable.jsx` — stacked-bar breakdown per employee
- `ActionCard.jsx` — recommended action tile (effort + impact)
- `TrustMicrocopy.jsx` — footer disclaimer

Recreation notes:
- Pure-black background, 1px `#1A1A1A` borders, teal-tinted shadows.
- Lucide icons via CDN. System-sans UI font.
- Tokens imported from `../../colors_and_type.css`.
