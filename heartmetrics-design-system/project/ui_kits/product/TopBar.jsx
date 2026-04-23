const { useState } = React;

function TopBar() {
  return (
    <header style={{
      height: 56, borderBottom: '1px solid #1A1A1A', background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', position: 'sticky', top: 0, zIndex: 10
    }}>
      <div style={{display:'flex', alignItems:'center', gap:20}}>
        <img src="../../assets/hm-logo-horizontal.svg" style={{height: 28}} alt="HeartMetrics"/>
        <button style={btnOutline}><i data-lucide="users" style={ic}></i>Engineering (8)<i data-lucide="chevron-down" style={ic}></i></button>
        <button style={btnOutline}><i data-lucide="calendar" style={ic}></i>Last 4 weeks<i data-lucide="chevron-down" style={ic}></i></button>
        <span style={{
          borderRadius: 9999, background:'#00B8A0', color:'#000', padding:'4px 12px',
          fontSize:12, fontWeight:500, display:'inline-flex', alignItems:'center', gap:6
        }}>Connected <i data-lucide="check-circle" style={{width:14,height:14}}></i></span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <button style={iconBtn}><i data-lucide="moon" style={{width:18,height:18}}></i></button>
        <button style={iconBtn}><i data-lucide="bell" style={{width:18,height:18}}></i></button>
        <div style={{textAlign:'right', lineHeight:1.1}}>
          <div style={{fontSize:13, fontWeight:500}}>Alex M.</div>
          <div style={{fontSize:11, color:'#8B8B8B'}}>(Manager)</div>
        </div>
        <div style={{
          width:36, height:36, borderRadius:'50%', background:'rgba(0,184,160,0.1)',
          color:'#00B8A0', fontSize:13, fontWeight:500, display:'flex',
          alignItems:'center', justifyContent:'center'
        }}>AM</div>
      </div>
    </header>
  );
}

const btnOutline = {
  display:'inline-flex', alignItems:'center', gap:8, fontSize:13, fontWeight:500,
  background:'transparent', color:'#F8FAFC', border:'1px solid #1A1A1A',
  borderRadius:6, padding:'6px 12px', cursor:'pointer', fontFamily:'inherit'
};
const ic = {width:14, height:14, color:'#8B8B8B'};
const iconBtn = {
  all:'unset', cursor:'pointer', padding:8, borderRadius:8, color:'#8B8B8B',
  display:'inline-flex'
};

window.TopBar = TopBar;
