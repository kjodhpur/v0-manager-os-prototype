const actions = [
  { id:1, icon:"alert-triangle", iconColor:"#FF6B6B", title:"Unblock Riya's 4 blocked tasks", desc:"Schedule a 30-min unblock session with tech leads.", effort:"Medium", impact:"High" },
  { id:2, icon:"star", iconColor:"#FFB347", title:"Recognize Olivia's platform work", desc:"Post a public shoutout for three quiet wins this sprint.", effort:"Low", impact:"Medium" },
  { id:3, icon:"refresh-cw", iconColor:"#00B8A0", title:"Rotate stretch project opportunity", desc:"Give Jordan next quarter's design-review lead role.", effort:"Low", impact:"High" },
  { id:4, icon:"calendar", iconColor:"#00B8A0", title:"Schedule 1:1 with Sam", desc:"Check in on firefighting load — no 1:1 in 3 weeks.", effort:"Low", impact:"Medium" },
  { id:5, icon:"unlock", iconColor:"#00B8A0", title:"Clear Priya's meeting load", desc:"Reassign 2 recurring meetings to free 3 hrs/week.", effort:"Medium", impact:"Medium" },
];

const effortColor = {Low:'#5DD67A', Medium:'#FFB347', High:'#FF6B6B'};
const impactColor = {Low:'#8B8B8B', Medium:'#FFB347', High:'#FF6B6B'};

function ActionsGrid({ onAction }) {
  return (
    <div style={{border:'1px solid #1A1A1A', borderRadius:12, background:'#000', padding:20}}>
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
        <h3 style={{margin:0, fontSize:16, fontWeight:600}}>This Week's Recommended Actions</h3>
        <span style={{
          background:'#00B8A0', color:'#000', fontSize:11, fontWeight:500,
          padding:'2px 8px', borderRadius:6
        }}>{actions.length} actions</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:12}}>
        {actions.map(a => (
          <div key={a.id} onClick={()=>onAction?.(a)}
               style={{
                 border:'1px solid #1A1A1A', borderRadius:10, padding:12, cursor:'pointer',
                 transition:'all .2s'
               }}
               onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 20px rgba(0,184,160,0.15)'}
               onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
            <div style={{display:'flex', gap:10, marginBottom:10}}>
              <i data-lucide={a.icon} style={{width:18, height:18, color:a.iconColor, flexShrink:0, marginTop:1}}></i>
              <div>
                <div style={{fontSize:13, fontWeight:500, lineHeight:1.3}}>{a.title}</div>
                <div style={{fontSize:11, color:'#8B8B8B', marginTop:2, lineHeight:1.4}}>{a.desc}</div>
              </div>
            </div>
            <div style={{display:'flex', gap:8, alignItems:'center', fontSize:11, color:'#8B8B8B'}}>
              <span>Effort:</span>
              <span style={{
                padding:'1px 8px', borderRadius:4, fontWeight:500,
                background:`${effortColor[a.effort]}20`, color:effortColor[a.effort]
              }}>{a.effort}</span>
              <span style={{marginLeft:4}}>Impact:</span>
              <span style={{color:impactColor[a.impact], fontWeight:500}}>{a.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.ActionsGrid = ActionsGrid;
