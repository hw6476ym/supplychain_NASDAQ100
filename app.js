const companies = [
  {name:'Apple', ticker:'AAPL', sector:'Technology', riskScore:68, supplierConcentration:72, chinaTaiwanExposure:84, criticalInputRisk:78, logisticsRisk:58, inventoryWeakness:41, inventoryBuffer:59, regional:{NorthAmerica:18,Europe:12,China:45,Taiwan:18,OtherAsia:5,Other:2}, criticalInputs:['Leading-edge semiconductors','Advanced camera modules','OLED displays','Battery cells'], suppliers:['TSMC','Foxconn','Luxshare','Samsung Display']},
  {name:'NVIDIA', ticker:'NVDA', sector:'Technology', riskScore:74, supplierConcentration:77, chinaTaiwanExposure:73, criticalInputRisk:89, logisticsRisk:52, inventoryWeakness:55, inventoryBuffer:45, regional:{NorthAmerica:22,Europe:9,China:25,Taiwan:34,OtherAsia:7,Other:3}, criticalInputs:['HBM memory','Advanced packaging (CoWoS)','Wafer capacity','Substrates'], suppliers:['TSMC','SK hynix','Samsung','ASE']},
  {name:'Tesla', ticker:'TSLA', sector:'Consumer Discretionary', riskScore:71, supplierConcentration:66, chinaTaiwanExposure:64, criticalInputRisk:82, logisticsRisk:69, inventoryWeakness:57, inventoryBuffer:43, regional:{NorthAmerica:34,Europe:15,China:30,Taiwan:8,OtherAsia:10,Other:3}, criticalInputs:['Battery-grade lithium','Power semiconductors','Graphite anodes','Rare earth magnets'], suppliers:['CATL','Panasonic','BYD','Infineon']},
  {name:'Microsoft', ticker:'MSFT', sector:'Technology', riskScore:46, supplierConcentration:49, chinaTaiwanExposure:37, criticalInputRisk:58, logisticsRisk:41, inventoryWeakness:28, inventoryBuffer:72, regional:{NorthAmerica:49,Europe:21,China:12,Taiwan:8,OtherAsia:7,Other:3}, criticalInputs:['Server GPUs','Networking ASICs','Optical modules','Power systems'], suppliers:['NVIDIA','AMD','Arista','Delta Electronics']},
  {name:'Amazon', ticker:'AMZN', sector:'Consumer Discretionary', riskScore:52, supplierConcentration:54, chinaTaiwanExposure:44, criticalInputRisk:62, logisticsRisk:63, inventoryWeakness:32, inventoryBuffer:68, regional:{NorthAmerica:51,Europe:20,China:11,Taiwan:5,OtherAsia:9,Other:4}, criticalInputs:['Warehouse robotics','Cloud servers','Freight capacity','Packaging materials'], suppliers:['KION','NVIDIA','Maersk','FedEx']},
  {name:'AMD', ticker:'AMD', sector:'Technology', riskScore:70, supplierConcentration:79, chinaTaiwanExposure:69, criticalInputRisk:86, logisticsRisk:50, inventoryWeakness:53, inventoryBuffer:47, regional:{NorthAmerica:20,Europe:10,China:21,Taiwan:39,OtherAsia:7,Other:3}, criticalInputs:['Advanced node wafers','Chiplet packaging','Substrates','HBM memory'], suppliers:['TSMC','ASE','Amkor','Micron']},
  {name:'Meta', ticker:'META', sector:'Communication Services', riskScore:49, supplierConcentration:52, chinaTaiwanExposure:35, criticalInputRisk:61, logisticsRisk:39, inventoryWeakness:29, inventoryBuffer:71, regional:{NorthAmerica:54,Europe:19,China:10,Taiwan:7,OtherAsia:7,Other:3}, criticalInputs:['AI accelerator cards','Networking fabrics','Data-center power systems','Cooling systems'], suppliers:['NVIDIA','Broadcom','Delta','Vertiv']},
  {name:'Alphabet', ticker:'GOOGL', sector:'Communication Services', riskScore:48, supplierConcentration:51, chinaTaiwanExposure:33, criticalInputRisk:59, logisticsRisk:40, inventoryWeakness:31, inventoryBuffer:69, regional:{NorthAmerica:55,Europe:20,China:9,Taiwan:7,OtherAsia:6,Other:3}, criticalInputs:['TPU components','Optical transceivers','Server memory','Power modules'], suppliers:['TSMC','Broadcom','Micron','Delta']}
];

const companySelect = document.getElementById('companySelect');
const sectorSelect = document.getElementById('sectorSelect');
const riskMetricSelect = document.getElementById('riskMetricSelect');

function riskLabel(v){ return v >= 70 ? 'High' : v >= 50 ? 'Moderate' : 'Lower'; }

function populateFilters(){
  companySelect.innerHTML = companies.map(c=>`<option value="${c.ticker}">${c.name} (${c.ticker})</option>`).join('');
  const sectors = ['All sectors', ...new Set(companies.map(c=>c.sector))];
  sectorSelect.innerHTML = sectors.map(s=>`<option value="${s}">${s}</option>`).join('');
}

function filteredCompanies(){
  const sector = sectorSelect.value;
  return sector === 'All sectors' ? companies : companies.filter(c=>c.sector===sector);
}

function selectedCompany(){ return companies.find(c=>c.ticker===companySelect.value) || companies[0]; }

function renderKPIs(c){
  document.getElementById('kpiRisk').textContent = c.riskScore;
  document.getElementById('kpiRiskLabel').textContent = `${riskLabel(c.riskScore)} risk profile`;
  document.getElementById('kpiSupplier').textContent = c.supplierConcentration;
  document.getElementById('kpiRegion').textContent = c.chinaTaiwanExposure;
  document.getElementById('kpiInventory').textContent = c.inventoryBuffer;
  document.getElementById('companyTitle').textContent = `${c.name} profile`;
  document.getElementById('companyMeta').textContent = `${c.ticker} • ${c.sector}`;
}

function renderRadar(c){
  const metrics = ['supplierConcentration','chinaTaiwanExposure','criticalInputRisk','logisticsRisk','inventoryWeakness'];
  const labels = ['Supplier concentration','China/Taiwan exposure','Critical inputs','Logistics','Inventory weakness'];
  Plotly.newPlot('riskRadar', [{type:'scatterpolar', r: metrics.map(m=>c[m]), theta: labels, fill:'toself', name:c.name, line:{color:'#5ea1ff'}}], {paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, polar:{radialaxis:{visible:true, range:[0,100], gridcolor:'#2a3a5f'}, angularaxis:{gridcolor:'#2a3a5f'}}, margin:{t:10,b:10,l:30,r:30}} , {displayModeBar:false});
}

function renderRanking(){
  const metric = riskMetricSelect.value;
  const set = filteredCompanies().slice().sort((a,b)=>b[metric]-a[metric]);
  Plotly.newPlot('rankingChart', [{type:'bar', x:set.map(c=>c.name), y:set.map(c=>c[metric]), marker:{color:set.map(c=>c.ticker===companySelect.value?'#ffb648':'#5ea1ff')}}], {paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, yaxis:{range:[0,100], gridcolor:'#2a3a5f'}, xaxis:{tickangle:-25}, margin:{t:20,b:90,l:45,r:10}}, {displayModeBar:false});
}

function renderRegion(c){
  const labels = Object.keys(c.regional);
  Plotly.newPlot('regionChart', [{type:'pie', labels, values: labels.map(k=>c.regional[k]), hole:0.5, marker:{colors:['#5ea1ff','#84b6ff','#ffb648','#ff8b9f','#55d6a7','#8f9bb5']}}], {paper_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, margin:{t:10,b:10,l:10,r:10}}, {displayModeBar:false});
}

function renderInputs(c){
  document.getElementById('inputsList').innerHTML = c.criticalInputs.map(i=>`<span class="pill">${i}</span>`).join('');
}

function renderNetwork(c){
  const nodes = [c.name, ...c.suppliers];
  const x = [0.5, 0.1, 0.3, 0.7, 0.9];
  const y = [0.5, 0.15, 0.85, 0.2, 0.8];
  const edgesX=[]; const edgesY=[];
  for(let i=1;i<nodes.length;i++){ edgesX.push(x[0],x[i],null); edgesY.push(y[0],y[i],null); }
  Plotly.newPlot('networkChart', [
    {type:'scatter', mode:'lines', x:edgesX, y:edgesY, line:{color:'#2a8df7', width:2}, hoverinfo:'skip'},
    {type:'scatter', mode:'markers+text', x, y, text:nodes, textposition:'top center', marker:{size:[30,18,18,18,18], color:['#ffb648','#5ea1ff','#5ea1ff','#5ea1ff','#5ea1ff']}, hovertemplate:'%{text}<extra></extra>'}
  ], {paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{color:'#eaf1ff'}, xaxis:{visible:false}, yaxis:{visible:false}, margin:{t:10,b:10,l:10,r:10}}, {displayModeBar:false});
}

function renderTable(){
  const rows = filteredCompanies().slice().sort((a,b)=>b.riskScore-a.riskScore);
  document.getElementById('companyTable').innerHTML = `<div class="table-wrap"><table><thead><tr><th>Company</th><th>Sector</th><th>Risk</th><th>Supplier</th><th>China/TW</th><th>Critical Input</th><th>Logistics</th><th>Inventory Buffer</th></tr></thead><tbody>${rows.map(c=>`<tr><td>${c.name}</td><td>${c.sector}</td><td>${c.riskScore}</td><td>${c.supplierConcentration}</td><td>${c.chinaTaiwanExposure}</td><td>${c.criticalInputRisk}</td><td>${c.logisticsRisk}</td><td>${c.inventoryBuffer}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderAll(){
  const c = selectedCompany();
  renderKPIs(c); renderRadar(c); renderRanking(); renderRegion(c); renderInputs(c); renderNetwork(c); renderTable();
}

populateFilters();
companySelect.value = 'AAPL';
[companySelect, sectorSelect, riskMetricSelect].forEach(el=>el.addEventListener('change', renderAll));
renderAll();
