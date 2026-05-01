const wdEmployees = [
  { name:"Riya Sharma", role:"Staff Eng", wip:18, hrs:22, blocked:4, status:"Overloaded", mix:[15,35,40,10] },
  { name:"Sam Patel", role:"Senior Eng", wip:12, hrs:14, blocked:2, status:"High", mix:[25,30,35,10] },
  { name:"Olivia Chen", role:"Eng", wip:7, hrs:10, blocked:0, status:"Balanced", mix:[45,30,10,15] },
  { name:"Jordan Lee", role:"Eng", wip:9, hrs:11, blocked:1, status:"Balanced", mix:[35,35,15,15] },
  { name:"Priya Desai", role:"Eng", wip:10, hrs:13, blocked:1, status:"High", mix:[30,30,25,15] },
  { name:"Diego Ortiz", role:"Eng", wip:6, hrs:8, blocked:0, status:"Under", mix:[55,25,5,15] },
];

const statusStyle = {
  Overloaded: {bg:'rgba(255,107,107,0.12)', fg:'#FF8A8A', bd:'rgba(255,107,107,0.2)'},
  High: {bg:'rgba(255,179,71,0.12)', fg:'#FFB347', bd:'rgba(255,179,71,0.25)'},
  Balanced: {bg:'rgba(93,214,122,0.12)', fg:'#5DD67A', bd:'rgba(93,214,122,0.25)'},
  Under: {bg:'#1A1A1A', fg:'#8B8B8B', bd:'#1A1A1A'},
};

function WorkDistributionTable() {
  return (
    <div style={{border:'1px solid #1A1A1A', borderRadius:12, background:'#000', overflow:'hidden'}}>
      <div style={{padding:'14px 20px', borderBottom:'1px solid #1A1A1A', display:'flex', alignItems:'center', gap:8}}>
        <i data-lucide="bar-chart-3" style={{width:16,height:16,color:'#00B8A0'}}></i>
        <strong style={{fontSize:14}}>Work Distribution</strong>
        <span style={{fontSize:12, color:'#8B8B8B'}}>Workload balance across team</span>
      </div>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            {['Employee','Role','WIP','Mtg hrs','Blocked','Status','Work type mix'].map((h,i)=>(
              <th key={h} style={{
                textAlign: i>=2 && i<=4 ? 'center' : 'left',
                padding:'10px 14px', fontSize:11, color:'#8B8B8B', fontWeight:500,
                borderBottom:'1px solid #1A1A1A', textTransform:'uppercase', letterSpacing:'0.04em'
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {wdEmployees.map(e => {
            const s = statusStyle[e.status];
            return (
              <tr key={e.name}>
                <td style={tdc}><span style={{fontWeight:500}}>{e.name}</span></td>
                <td style={{...tdc, color:'#8B8B8B'}}>{e.role}</td>
                <td style={{...tdc, textAlign:'center', fontWeight:500}}>{e.wip}</td>
                <td style={{...tdc, textAlign:'center', color:'#8B8B8B'}}>{e.hrs}h</td>
                <td style={{...tdc, textAlign:'center'}}>
                  {e.blocked > 0 ? (
                    <span style={{
                      display:'inline-flex', width:20, height:20, borderRadius:'50%',
                      background:'#FF6B6B', color:'#fff', fontSize:10, fontWeight:600,
                      alignItems:'center', justifyContent:'center'
                    }}>{e.blocked}</span>
                  ) : <span style={{color:'#8B8B8B'}}>0</span>}
                </td>
                <td style={tdc}>
                  <span style={{
                    display:'inline-block', padding:'2px 10px', borderRadius:6,
                    fontSize:11, fontWeight:500, border:`1px solid ${s.bd}`,
                    background:s.bg, color:s.fg
                  }}>{e.status}</span>
                </td>
                <td style={tdc}>
                  <div style={{display:'flex', height:16, borderRadius:4, overflow:'hidden', minWidth:160}}>
                    <div style={{width:`${e.mix[0]}%`, background:'#0C2C55'}}/>
                    <div style={{width:`${e.mix[1]}%`, background:'#296374'}}/>
                    <div style={{width:`${e.mix[2]}%`, background:'#629FAD'}}/>
                    <div style={{width:`${e.mix[3]}%`, background:'#EDEDCE'}}/>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{
        display:'flex', gap:16, padding:'12px 20px', borderTop:'1px solid #1A1A1A',
        flexWrap:'wrap', fontSize:11, color:'#8B8B8B'
      }}>
        {[['#0C2C55','Strategic / Visible'],['#296374','Operational'],['#629FAD','Firefighting'],['#EDEDCE','Admin']].map(([c,l])=>(
          <div key={l} style={{display:'flex', alignItems:'center', gap:6}}>
            <div style={{width:10, height:10, borderRadius:2, background:c}}/>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const tdc = {padding:'10px 14px', borderBottom:'1px solid #1A1A1A', fontSize:13};

window.WorkDistributionTable = WorkDistributionTable;
