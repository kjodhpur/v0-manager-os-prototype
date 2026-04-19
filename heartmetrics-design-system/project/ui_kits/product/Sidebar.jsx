const navItems = [
  { id:"overview", label:"Overview", icon:"layout-dashboard" },
  { id:"ai-coach", label:"AI Coach", icon:"brain" },
  { id:"team-health", label:"Team Health", icon:"heart-pulse" },
  { id:"burnout-risk", label:"Burnout Risk", icon:"flame" },
  { id:"work-distribution", label:"Work Distribution", icon:"bar-chart-3" },
  { id:"meetings", label:"1:1 Meetings", icon:"calendar" },
  { id:"surveys", label:"Pulse Surveys", icon:"clipboard-list" },
  { id:"goals", label:"Goals & OKRs", icon:"target" },
  { id:"recognition", label:"Recognition", icon:"award" },
  { id:"feedback", label:"Feedback Wall", icon:"message-square" },
  { id:"timeline", label:"Timeline", icon:"clock" },
  { id:"benchmarking", label:"Benchmarking", icon:"scale" },
  { id:"reports", label:"Reports", icon:"file-text" },
  { id:"actions", label:"Actions", icon:"list-checks" },
  { id:"integrations", label:"Integrations", icon:"link-2" },
  { id:"settings", label:"Settings", icon:"settings" },
];

function Sidebar({ active, onChange }) {
  return (
    <aside style={{
      width: 224, flexShrink: 0, borderRight:'1px solid #1A1A1A',
      background:'#000', padding:16, height:'calc(100vh - 56px)',
      overflowY:'auto', position:'sticky', top:56
    }}>
      <nav style={{display:'flex', flexDirection:'column', gap:2}}>
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={()=>onChange(item.id)} style={{
              all:'unset', cursor:'pointer', display:'flex', alignItems:'center', gap:12,
              padding:'8px 12px', borderRadius:8, fontSize:13, fontWeight:500,
              background: isActive ? 'rgba(0,184,160,0.1)' : 'transparent',
              color: isActive ? '#00B8A0' : '#8B8B8B',
              transition:'all .15s'
            }}
            onMouseEnter={(e)=>{ if(!isActive){e.currentTarget.style.background='#1A1A1A';e.currentTarget.style.color='#F8FAFC';}}}
            onMouseLeave={(e)=>{ if(!isActive){e.currentTarget.style.background='transparent';e.currentTarget.style.color='#8B8B8B';}}}
            >
              <i data-lucide={item.icon} style={{width:16, height:16, strokeWidth:2}}></i>
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

window.Sidebar = Sidebar;
