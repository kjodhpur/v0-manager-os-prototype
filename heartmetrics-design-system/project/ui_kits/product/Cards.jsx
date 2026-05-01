function KPICard({ label, value, delta, deltaKind, sub, subColor }) {
  const deltaColor = deltaKind === 'up' ? '#5DD67A' : deltaKind === 'down' ? '#FF6B6B' : '#8B8B8B';
  const deltaIcon = deltaKind === 'up' ? 'trending-up' : deltaKind === 'down' ? 'trending-down' : null;
  return (
    <div style={{
      border:'1px solid #1A1A1A', borderRadius:12, padding:16, background:'#000'
    }}>
      <div style={{fontSize:13, color:'#8B8B8B', fontWeight:500}}>{label}</div>
      <div style={{
        fontSize:36, fontWeight:700, letterSpacing:'-0.02em',
        fontVariantNumeric:'tabular-nums', marginTop:4,
        display:'flex', alignItems:'baseline', gap:8
      }}>
        {value}
        {deltaIcon && (
          <span style={{color: deltaColor, fontSize:13, fontWeight:500, display:'inline-flex', alignItems:'center', gap:2}}>
            <i data-lucide={deltaIcon} style={{width:14, height:14}}></i>
            {delta}
          </span>
        )}
      </div>
      {sub && <div style={{fontSize:12, color: subColor || '#8B8B8B', marginTop:4}}>{sub}</div>}
    </div>
  );
}

function AIInsightCard() {
  return (
    <div style={{
      border:'1px solid rgba(0,184,160,0.2)', background:'rgba(0,184,160,0.05)',
      borderRadius:12, padding:16
    }}>
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
        <i data-lucide="brain" style={{width:16, height:16, color:'#00B8A0'}}></i>
        <strong style={{fontSize:14}}>Weekly Team Insight</strong>
        <span style={{
          fontSize:11, padding:'1px 8px', borderRadius:9999,
          background:'rgba(0,184,160,0.15)', color:'#00B8A0', marginLeft:4
        }}>AI-generated</span>
      </div>
      <p style={{fontSize:13, lineHeight:1.55, color:'#C5CACC', margin:0}}>
        Your team's overall wellbeing is trending upward this week. <strong style={{color:'#F8FAFC'}}>Riya</strong> and <strong style={{color:'#F8FAFC'}}>Sam</strong> need immediate attention due to workload imbalance. Consider redistributing 2–3 tasks from Riya to Olivia who has capacity.
      </p>
      <div style={{display:'flex', gap:8, marginTop:12}}>
        <button style={{
          background:'#00B8A0', color:'#000', border:'none', borderRadius:6,
          padding:'6px 14px', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'inherit'
        }}>View suggestion</button>
        <button style={{
          background:'transparent', color:'#8B8B8B', border:'1px solid #1A1A1A', borderRadius:6,
          padding:'6px 14px', fontSize:12, cursor:'pointer', fontFamily:'inherit'
        }}>Dismiss</button>
      </div>
    </div>
  );
}

function TrustMicrocopy() {
  return (
    <p style={{textAlign:'center', fontSize:12, color:'#8B8B8B', marginTop:32}}>
      This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
    </p>
  );
}

window.KPICard = KPICard;
window.AIInsightCard = AIInsightCard;
window.TrustMicrocopy = TrustMicrocopy;
