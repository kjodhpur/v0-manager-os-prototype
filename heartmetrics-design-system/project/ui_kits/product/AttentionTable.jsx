const attentionPeople = [
  { name:"Riya Sharma", role:"Staff Eng", whi:41, trend:"down", issue:"Blocked + Overloaded", issueKind:"risk" },
  { name:"Sam Patel", role:"Senior Eng", whi:48, trend:"down", issue:"High firefighting", issueKind:"warn" },
  { name:"Olivia Chen", role:"Eng", whi:55, trend:"neutral", issue:"Recognition gap", issueKind:"warn" },
  { name:"Jordan Lee", role:"Eng", whi:58, trend:"neutral", issue:"Declining", issueKind:"muted" },
  { name:"Priya Desai", role:"Eng", whi:60, trend:"down", issue:"Medium risk", issueKind:"warn" },
];

const badgeStyles = {
  risk: {background:'rgba(255,107,107,0.12)', color:'#FF8A8A'},
  warn: {background:'rgba(255,179,71,0.12)', color:'#FFB347'},
  muted: {background:'#1A1A1A', color:'#8B8B8B'},
};

function AttentionTable({ onView }) {
  return (
    <div style={{border:'1px solid #1A1A1A', borderRadius:12, background:'#000'}}>
      <div style={{padding:'16px 20px 12px', borderBottom:'1px solid #1A1A1A'}}>
        <h3 style={{margin:0, fontSize:16, fontWeight:600}}>Attention Needed — Top 5 Employees</h3>
      </div>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            {['Name','WHI','Issue','Action'].map(h => (
              <th key={h} style={{
                textAlign:'left', padding:'12px 20px', fontSize:11,
                color:'#8B8B8B', fontWeight:500, borderBottom:'1px solid #1A1A1A',
                textTransform:'uppercase', letterSpacing:'0.04em'
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attentionPeople.map(p => (
            <tr key={p.name}>
              <td style={td}>
                <span style={{fontWeight:500}}>{p.name}</span>
                <span style={{color:'#8B8B8B', fontSize:12, marginLeft:6}}>({p.role})</span>
              </td>
              <td style={td}>
                <span style={{fontWeight:600, display:'inline-flex', alignItems:'center', gap:4}}>
                  {p.whi}
                  {p.trend === 'down' && <i data-lucide="trending-down" style={{width:14, height:14, color:'#FF6B6B'}}></i>}
                </span>
              </td>
              <td style={td}>
                <span style={{
                  display:'inline-block', padding:'2px 10px', borderRadius:6,
                  fontSize:11, fontWeight:500, ...badgeStyles[p.issueKind]
                }}>{p.issue}</span>
              </td>
              <td style={td}>
                <button onClick={()=>onView?.(p)} style={{
                  background:'#00B8A0', color:'#000', border:'none', borderRadius:6,
                  padding:'4px 14px', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'inherit'
                }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const td = {padding:'12px 20px', borderBottom:'1px solid #1A1A1A', fontSize:13};

window.AttentionTable = AttentionTable;
