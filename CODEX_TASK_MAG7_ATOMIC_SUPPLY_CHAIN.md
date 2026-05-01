# Codex Task: Build the Mag 7 Atomic Supply Chain Intelligence Dashboard

## Mission

Turn this project into a serious, presentation-ready interactive dashboard that explains the supply chains of the Magnificent 7 companies down to the atomic/resource/input level.

The goal is not just to show charts. The goal is to make someone say: "I finally understand how Apple, Nvidia, Microsoft, Amazon, Meta, Alphabet, and Tesla depend on suppliers, regions, commodities, factories, logistics routes, chips, data centers, batteries, rare earths, energy, and geopolitical chokepoints."

This should feel like a Bloomberg Terminal + Palantir-style intelligence dashboard for supply-chain risk.

## Companies to cover

Build the dashboard around the Magnificent 7:

- Apple (AAPL)
- Microsoft (MSFT)
- Nvidia (NVDA)
- Amazon (AMZN)
- Alphabet / Google (GOOGL)
- Meta Platforms (META)
- Tesla (TSLA)

Optional later expansion:
- AMD
- Broadcom
- TSMC
- ASML
- Samsung
- Micron
- Intel
- Super Micro Computer
- Oracle
- Walmart
- Boeing
- Nike

## Core concept

For each company, the dashboard should show a full supply-chain stack:

Company → Business segment → Product/system → Component → Supplier → Facility/region → Raw material/atomic input → Logistics route/chokepoint → Risk driver → Strategic implication

Example:

Nvidia → Data center GPUs → H100/H200/B200 platform → advanced GPU die + HBM memory + CoWoS packaging → TSMC/SK Hynix/Samsung/ASE/Amkor → Taiwan/South Korea/Southeast Asia → silicon wafers, neon, photoresists, rare gases, advanced substrates, copper, gold → Taiwan Strait, South China Sea, air freight, port risk → AI capex bottleneck and geopolitical concentration risk.

## Dashboard flow

Design the app so a viewer can move from simple to deep:

### 1. Executive Overview page

Show the Mag 7 as cards with:

- Overall supply-chain risk score
- AI infrastructure dependency score
- China/Taiwan exposure score
- Semiconductor dependency score
- Energy/data-center dependency score
- Commodity/raw material exposure score
- Logistics/geopolitical chokepoint score
- Resilience score

Add a top-level summary chart:

- Which company has the highest semiconductor bottleneck risk?
- Which company has the highest China/Taiwan exposure?
- Which company has the highest data-center energy exposure?
- Which company has the highest raw-material/atomic input exposure?
- Which company is most resilient?

### 2. Company Deep Dive page

When the user selects a company, show:

- Company profile
- Main products/services driving supply-chain needs
- Key suppliers
- Key regions
- Key commodities/materials
- Major chokepoints
- Risk radar chart
- Supplier network map
- Segment-to-supplier Sankey diagram
- Region exposure map or regional bar chart
- Critical input table
- Simple plain-English interpretation box

The plain-English box should explain the story like:

"Nvidia's main vulnerability is not demand; it is advanced manufacturing concentration. Its AI chip supply chain depends heavily on TSMC fabrication, HBM memory from SK Hynix/Samsung/Micron, and advanced packaging capacity. That makes Taiwan, South Korea, advanced substrates, and CoWoS capacity the real bottlenecks."

### 3. Atomic Input Explorer

Create a section that lets users click raw inputs/materials and see which companies depend on them.

Atomic inputs should include:

- Silicon wafers
- Copper
- Aluminum
- Lithium
- Nickel
- Cobalt
- Graphite
- Rare earth magnets
- Gallium
- Germanium
- Tantalum
- Tin
- Gold
- Silver
- Palladium
- Neon gas
- Argon gas
- Helium
- Photoresists
- Fluoropolymers
- Advanced substrates
- HBM memory
- NAND memory
- DRAM
- Batteries
- Transformers
- Fiber optic components
- Power semiconductors
- Cooling systems
- Data-center power equipment

For each input show:

- Companies exposed
- Why it matters
- Key supplier/region exposure
- Substitution difficulty
- Disruption impact
- Time-to-recover estimate
- Strategic comment

### 4. Supplier Network Explorer

Create an interactive graph showing:

- Mag 7 companies as large nodes
- Tier 1 suppliers as medium nodes
- Tier 2/atomic inputs as smaller nodes
- Regions as colored clusters

Important supplier examples:

- TSMC
- Foxconn
- Pegatron
- Luxshare
- Samsung
- SK Hynix
- Micron
- ASML
- Applied Materials
- Lam Research
- Tokyo Electron
- ASE
- Amkor
- Quanta
- Wistron
- Inventec
- Dell
- Supermicro
- Broadcom
- Qualcomm
- Murata
- Sony Semiconductor
- Panasonic
- CATL
- LG Energy Solution
- BYD
- Schneider Electric
- Vertiv
- Arista
- Cisco
- Corning
- Maersk
- DHL
- UPS
- FedEx

Graph interactions:

- Click a company → highlight its suppliers and materials
- Click a supplier → show which Mag 7 companies depend on it
- Click a material → show all exposed companies
- Color nodes by risk category
- Size nodes by dependency importance

### 5. Sankey Flow View

Add a Sankey chart for each company.

Example Nvidia flow:

Nvidia → AI GPUs → TSMC fabrication → Taiwan → silicon wafers / EUV / photoresists
Nvidia → AI GPUs → HBM memory → SK Hynix/Samsung/Micron → Korea/US/Japan
Nvidia → AI GPUs → Advanced packaging → TSMC/ASE/Amkor → Taiwan/SE Asia
Nvidia → Data centers → Cloud customers → Microsoft/Amazon/Google/Meta → power/cooling/network equipment

Example Apple flow:

Apple → iPhone/Mac/iPad → Foxconn/Pegatron/Luxshare assembly → China/India/Vietnam
Apple → processors → TSMC → Taiwan
Apple → displays → Samsung/LG/BOE → Korea/China
Apple → batteries/cameras/magnets → Asia supplier network → lithium/cobalt/rare earths

Example Tesla flow:

Tesla → EVs → batteries → Panasonic/CATL/LG → lithium/nickel/graphite/cobalt
Tesla → vehicles → power electronics/semiconductors → STMicroelectronics/Infineon/TSMC-related ecosystem
Tesla → factories → US/China/Germany → regional policy and logistics exposure

### 6. Risk Heatmap

Create a matrix:

Rows = companies
Columns = risk factors

Risk factors:

- Taiwan semiconductor exposure
- China manufacturing exposure
- Advanced packaging exposure
- Memory/HBM exposure
- Battery minerals exposure
- Rare earth exposure
- Data-center power exposure
- Logistics chokepoint exposure
- Single-supplier concentration
- Regulation/export control exposure
- Energy price sensitivity
- Inventory buffer weakness

Use color intensity to show high/medium/low risk.

Clicking a heatmap cell should update an explanation panel.

### 7. Scenario Simulator

Add a simple scenario selector that shows how the Mag 7 would be affected.

Scenarios:

- Taiwan Strait disruption
- China export restrictions
- Advanced packaging shortage
- HBM memory shortage
- Lithium price shock
- Copper price shock
- Red Sea/Suez shipping disruption
- Data-center power shortage
- AI chip export control tightening
- Global semiconductor cycle downturn

For each scenario show:

- Companies most affected
- Risk channel
- Estimated severity
- Short explanation
- Potential winners/relative beneficiaries

This can be simulated with static data for now.

### 8. Strategic Insights Page

Add a page/section called "What this means" with clear analyst-style takeaways:

- Nvidia and AMD-type AI chip companies are exposed to semiconductor fabrication, advanced packaging, and HBM memory capacity.
- Apple is exposed to Asian assembly concentration, TSMC, displays, batteries, camera modules, and rare earth magnets.
- Tesla has the clearest raw-material chain exposure through lithium, nickel, graphite, copper, power electronics, and battery suppliers.
- Microsoft, Amazon, Google, and Meta are less exposed through consumer hardware but increasingly exposed through AI servers, GPUs, data-center power, cooling, networking gear, and electrical equipment.
- The AI boom is not just a software story; it depends on physical infrastructure: chips, copper, power equipment, cooling, memory, substrates, logistics, and geopolitics.

## Data approach

Use a structured simulated dataset for now. Do not block the project waiting for live APIs.

Create clear JavaScript data objects such as:

- companies
- suppliers
- materials
- regions
- scenarios
- edges / relationships
- riskFactors

Each company should have:

- ticker
- name
- sector
- businessSegments
- products
- suppliers
- materials
- regions
- riskScores
- resilienceScore
- explanation

Each supplier should have:

- name
- tier
- category
- region
- materials/components supplied
- dependent companies
- risk score

Each material/input should have:

- name
- category
- importance
- substitution difficulty
- regions
- companies exposed
- explanation

Each scenario should have:

- name
- description
- affectedCompanies
- severity scores
- explanation

## Technical implementation

Keep it static and simple:

- index.html
- styles.css
- app.js
- README.md
- .nojekyll
- .github/workflows/deploy-pages.yml

Use Plotly from CDN for charts.

Use vanilla JavaScript. No backend required.

Recommended charts:

- Radar chart for company risk profile
- Heatmap for company-risk matrix
- Sankey chart for supply-chain flows
- Bar charts for ranking and regional exposure
- Scatter/network-like chart for supplier map
- Table for materials and suppliers
- Scenario impact cards

## UI/UX style

Make it look serious and premium:

- Dark terminal-style theme
- Executive dashboard layout
- Clear section hierarchy
- Big KPI cards
- Analyst-style explanation boxes
- Clickable drilldowns
- No clutter
- Professional colors: dark navy, cyan, amber, red, green
- Mobile responsive if possible, but desktop dashboard quality matters most

## Must-have interactions

- Select company
- Select scenario
- Select material/input
- Filter by sector/risk type
- Click supplier/material if practical
- Update explanation panels based on selection

## README update

Update README with:

- Project purpose
- How it differs from the old global trade dashboard
- What each dashboard section explains
- How to run locally
- How to deploy to GitHub Pages
- Data disclaimer: simulated educational/prototype data, not investment advice

## Final output

When complete:

1. Commit all files.
2. Create or update a pull request.
3. Make sure GitHub Pages can deploy.
4. Make the dashboard accessible at:

https://hw6476ym.github.io/supplychain_NASDAQ100/

## Important rule

Do not turn this back into a country trade dashboard. This is a company-level Mag 7 supply-chain intelligence dashboard, going from business segment to supplier to component to raw material/atomic input to region/chokepoint to strategic risk.
