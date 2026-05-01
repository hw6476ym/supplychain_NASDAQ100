const baseCompanies = [
  ['Apple','AAPL','Technology',68,72,84,78,58,41,59],
  ['NVIDIA','NVDA','Technology',74,77,73,89,52,55,45],
  ['Tesla','TSLA','Consumer Discretionary',71,66,64,82,69,57,43],
  ['Microsoft','MSFT','Technology',46,49,37,58,41,28,72],
  ['Amazon','AMZN','Consumer Discretionary',52,54,44,62,63,32,68],
  ['AMD','AMD','Technology',70,79,69,86,50,53,47],
  ['Meta','META','Communication Services',49,52,35,61,39,29,71],
  ['Alphabet','GOOGL','Communication Services',48,51,33,59,40,31,69],
  ['Broadcom','AVGO','Technology',67,74,63,81,48,51,49],
  ['Qualcomm','QCOM','Technology',64,71,58,76,49,47,53],
  ['Intel','INTC','Technology',60,62,41,69,44,45,55],
  ['Cisco','CSCO','Technology',47,50,31,56,42,30,70],
  ['Netflix','NFLX','Communication Services',38,40,22,48,33,24,76],
  ['Costco','COST','Consumer Staples',54,57,39,63,61,34,66],
  ['PepsiCo','PEP','Consumer Staples',50,53,29,60,58,30,70],
  ['Adobe','ADBE','Technology',42,44,24,52,36,26,74],
  ['Salesforce','CRM','Technology',45,47,27,55,38,28,72],
  ['Intuit','INTU','Technology',39,43,21,49,35,23,77],
  ['Texas Instruments','TXN','Technology',58,61,43,65,46,40,60],
  ['ASML','ASML','Technology',66,73,51,84,47,50,50],
  ['Micron','MU','Technology',63,69,55,79,51,46,54],
  ['Applied Materials','AMAT','Technology',62,68,52,77,49,44,56],
  ['Booking','BKNG','Consumer Discretionary',40,42,20,50,37,22,78],
  ['Starbucks','SBUX','Consumer Discretionary',56,59,35,68,65,38,62],
  ['Palo Alto Networks','PANW','Technology',53,56,31,66,43,35,65],
];

const regionTemplate = { NorthAmerica: 32, Europe: 16, China: 20, Taiwan: 12, OtherAsia: 15, Other: 5 };
const criticalPool = ['Advanced semiconductors','Battery cells','Rare earths','Copper foil','Optical components','Network switches','Industrial gases','Specialty chemicals','High-purity silicon','Lithium hydroxide'];
const supplierPool = ['TSMC','Foxconn','CATL','SK hynix','Samsung','ASE','Amkor','Delta','Infineon','Micron'];

const companies = baseCompanies.map((d, i) => {
  const regional = Object.fromEntries(Object.entries(regionTemplate).map(([k,v]) => [k, Math.max(2, v + ((i*3 + k.length) % 9 - 4))]));
  const total = Object.values(regional).reduce((a,b)=>a+b,0);
  Object.keys(regional).forEach(k => regional[k] = Math.round((regional[k]/total)*100));
  const chinaProv = {'Guangdong': 30 + (i%4)*4, 'Jiangsu': 25 + (i%3)*5, 'Shanghai': 20 + (i%2)*4, 'Sichuan': 15 + (i%3)*3, 'Chongqing': 10 + (i%2)*2};
  const twProv = {'Hsinchu': 40 + (i%3)*4, 'Taichung': 25 + (i%2)*4, 'Tainan': 20 + (i%4)*2, 'Kaohsiung': 15 + (i%3)*2};
  return {
    name:d[0], ticker:d[1], sector:d[2], riskScore:d[3], supplierConcentration:d[4], chinaTaiwanExposure:d[5], criticalInputRisk:d[6], logisticsRisk:d[7], inventoryWeakness:d[8], inventoryBuffer:d[9],
    regional, annualTradeVolume: +(45 + i*7.5 + (d[3]-40)*1.2).toFixed(1),
    criticalInputs: [criticalPool[i%10], criticalPool[(i+2)%10], criticalPool[(i+5)%10], criticalPool[(i+7)%10]],
    suppliers: [supplierPool[i%10], supplierPool[(i+1)%10], supplierPool[(i+4)%10], supplierPool[(i+7)%10]],
    chinaBreakdown: chinaProv, taiwanBreakdown: twProv
  };
});

const el = id => document.getElementById(id);
const companySelect = el('companySelect'); const sectorSelect = el('sectorSelect'); const riskMetricSelect = el('riskMetricSelect'); const flowViewSelect = el('flowViewSelect');
let geoMode = 'country';

function populateFilters(){
  companySelect.innerHTML = companies.map(c=>`<option value="${c.ticker}">${c.name} (${c.ticker})</option>`).join('');
  sectorSelect.innerHTML = ['All sectors', ...new Set(companies.map(c=>c.sector))].map(s=>`<option value="${s}">${s}</option>`).join('');
}
const filteredCompanies = () => sectorSelect.value === 'All sectors' ? companies : companies.filter(c=>c.sector===sectorSelect.value);
const selectedCompany = () => companies.find(c=>c.ticker===companySelect.value) || companies[0];
const riskLabel = v => v >= 70 ? 'High' : v >= 50 ? 'Moderate' : 'Lower';

function renderKPIs(c){
  el('kpiRisk').textContent = c.riskScore; el('kpiRiskLabel').textContent = `${riskLabel(c.riskScore)} risk profile`;
  el('kpiSupplier').textContent = c.supplierConcentration; el('kpiRegion').textContent = c.chinaTaiwanExposure; el('kpiInventory').textContent = c.inventoryBuffer;
  el('companyTitle').textContent = `${c.name} profile`; el('companyMeta').textContent = `${c.ticker} • ${c.sector} • Trade volume: $${c.annualTradeVolume}B`;
}
function renderRadar(c){
  Plotly.newPlot('riskRadar', [{type:'scatterpolar', r:[c.supplierConcentration,c.chinaTaiwanExposure,c.criticalInputRisk,c.logisticsRisk,c.inventoryWeakness], theta:['Supplier concentration','China/Taiwan','Critical inputs','Logistics','Inventory weakness'], fill:'toself', line:{color:'#5ea1ff'}}], {paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, polar:{radialaxis:{range:[0,100],gridcolor:'#2a3a5f'}}, margin:{t:10,b:10,l:25,r:25}}, {displayModeBar:false});
}
function renderRanking(){
  const m = riskMetricSelect.value; const data = filteredCompanies().slice().sort((a,b)=>b[m]-a[m]);
  Plotly.newPlot('rankingChart', [{type:'bar', x:data.map(c=>c.name), y:data.map(c=>c[m]), marker:{color:data.map(c=>c.ticker===companySelect.value?'#ffb648':'#5ea1ff')}}], {paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, yaxis:{range:[0,100],gridcolor:'#2a3a5f'}, xaxis:{tickangle:-30}, margin:{t:15,b:90,l:40,r:10}}, {displayModeBar:false});
}
function renderRegion(c){
  const labels = Object.keys(c.regional);
  Plotly.newPlot('regionChart', [{type:'bar', x:labels, y:labels.map(k=>+((c.regional[k]*c.annualTradeVolume)/100).toFixed(1)), marker:{color:['#5ea1ff','#84b6ff','#ffb648','#ff8b9f','#55d6a7','#8f9bb5']}}], {paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, yaxis:{title:'$B',gridcolor:'#2a3a5f'}, margin:{t:10,b:45,l:50,r:10}}, {displayModeBar:false});
}
function renderInputs(c){ el('inputsList').innerHTML = c.criticalInputs.map(i=>`<span class="pill">${i}</span>`).join(''); }

function renderSankey(c){
  const flow = flowViewSelect.value;
  const nodes = ['Company', ...c.suppliers, 'China', 'Taiwan', 'North America', 'Europe', 'Assembly', 'Packaging', 'Refining', 'Smelting', 'Lithium Ore', 'Copper Ore', 'Rare Earth Ore', 'Silica Sand'];
  const idx = Object.fromEntries(nodes.map((n,i)=>[n,i]));
  const link = (s,t,v) => ({source:idx[s],target:idx[t],value:v});
  let links = [];
  c.suppliers.forEach((s, i) => links.push(link('Company', s, 12 + i*4)));
  c.suppliers.forEach((s, i) => { links.push(link(s, 'China', 6+i)); links.push(link(s, 'Taiwan', 5+i)); });
  links.push(link('China','Assembly',30), link('Taiwan','Packaging',24), link('North America','Assembly',16), link('Europe','Packaging',12));
  links.push(link('Assembly','Refining',25), link('Packaging','Smelting',20), link('Refining','Lithium Ore',16), link('Refining','Copper Ore',15), link('Smelting','Rare Earth Ore',14), link('Smelting','Silica Sand',13));
  if (flow === 'manufacturing') links = links.filter(l => l.source <= idx['Europe'] && l.target <= idx['Smelting']);
  if (flow === 'materials') links = links.filter(l => l.source >= idx['Assembly'] || ['China','Taiwan','North America','Europe'].includes(nodes[l.source]));
  Plotly.newPlot('sankeyChart', [{type:'sankey', orientation:'h', node:{label:nodes, pad:14, thickness:15, color:nodes.map(n=>n==='Company'?'#ffb648':(n.includes('Ore')?'#55d6a7':'#5ea1ff'))}, link:{source:links.map(l=>l.source),target:links.map(l=>l.target),value:links.map(l=>l.value)}}], {paper_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}}, {displayModeBar:false});
}

function renderGeoDrill(c){
  const countryData = {'China': c.regional.China, 'Taiwan': c.regional.Taiwan, 'United States': c.regional.NorthAmerica, 'Europe': c.regional.Europe, 'Other Asia': c.regional.OtherAsia};
  let labels = Object.keys(countryData), vals = Object.values(countryData), title = 'Country-level exposure (%)';
  if (geoMode === 'china') { labels = Object.keys(c.chinaBreakdown); vals = Object.values(c.chinaBreakdown); title = 'China province split'; }
  if (geoMode === 'taiwan') { labels = Object.keys(c.taiwanBreakdown); vals = Object.values(c.taiwanBreakdown); title = 'Taiwan city split'; }
  Plotly.newPlot('geoDrillChart', [{type:'bar', x:labels, y:vals, marker:{color:'#5ea1ff'}}], {title:{text:title,font:{color:'#eaf1ff',size:14}}, paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, yaxis:{gridcolor:'#2a3a5f'}, margin:{t:45,b:45,l:40,r:10}}, {displayModeBar:false});
  const chart = el('geoDrillChart');
  chart.on('plotly_click', ev => {
    const clicked = ev.points?.[0]?.x;
    geoMode = clicked === 'China' ? 'china' : clicked === 'Taiwan' ? 'taiwan' : 'country';
    renderGeoDrill(c);
  });
}

function renderCorridors(c){
  const routes = ['China→US West Coast','Taiwan→US West Coast','China→EU North Sea','Korea/Japan→US Gulf','LatAm Minerals→Asia Refining'];
  const weights = [0.28,0.22,0.18,0.14,0.18].map((w,i)=> +((c.annualTradeVolume*w) + (i*1.6)).toFixed(1));
  Plotly.newPlot('corridorChart', [{type:'scatter', mode:'lines+markers', x:routes, y:weights, line:{color:'#ffb648', width:3}, marker:{size:9}}], {paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, yaxis:{title:'$B',gridcolor:'#2a3a5f'}, xaxis:{tickangle:-20}, margin:{t:10,b:80,l:50,r:10}}, {displayModeBar:false});
}

function renderTable(){
  const rows = filteredCompanies().slice().sort((a,b)=>b.riskScore-a.riskScore);
  el('companyTable').innerHTML = `<div class="table-wrap"><table><thead><tr><th>Company</th><th>Sector</th><th>Risk</th><th>Trade Volume ($B)</th><th>Supplier</th><th>China/TW</th><th>Critical Input</th><th>Logistics</th><th>Inventory</th></tr></thead><tbody>${rows.map(c=>`<tr><td>${c.name}</td><td>${c.sector}</td><td>${c.riskScore}</td><td>${c.annualTradeVolume}</td><td>${c.supplierConcentration}</td><td>${c.chinaTaiwanExposure}</td><td>${c.criticalInputRisk}</td><td>${c.logisticsRisk}</td><td>${c.inventoryBuffer}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderAll(){
  const c = selectedCompany(); geoMode = 'country';
  renderKPIs(c); renderRadar(c); renderRanking(); renderRegion(c); renderInputs(c); renderSankey(c); renderGeoDrill(c); renderCorridors(c); renderTable();
}

populateFilters(); companySelect.value = 'AAPL';
[companySelect, sectorSelect, riskMetricSelect, flowViewSelect].forEach(e => e.addEventListener('change', renderAll));
renderAll();
