# supplychain_NASDAQ100

A separate company-level supply-chain intelligence dashboard for NASDAQ-100 style companies.

This project is different from the earlier country/global trade dashboard. The earlier project tracks countries, imports, exports, and trade turnover. This project tracks companies, suppliers, regional exposure, critical input risk, logistics risk, and supply-chain fragility.

## What it does

The dashboard lets you compare major companies by:

- Overall supply-chain risk score
- Supplier concentration
- China/Taiwan exposure
- Critical input dependency
- Logistics risk
- Inventory buffer strength
- Company-to-supplier network relationships
- Regional supply-chain exposure

## Current version

This is a static HTML/CSS/JavaScript prototype that runs directly in the browser. It now includes a simulated top-25 company dataset, end-to-end Sankey flow mapping down to natural resources, China/Taiwan geographic drilldowns, and trade-volume corridor views without requiring a backend.

## Files

- `index.html` — dashboard layout
- `styles.css` — dashboard styling
- `app.js` — company data, charts, filtering, and scoring logic
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment workflow
- `.nojekyll` — makes GitHub Pages serve static files directly

## Run locally

Open `index.html` in your browser.

## Deploy to GitHub Pages

1. Open this repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, select **Source: GitHub Actions**.
4. Go to **Actions**.
5. Open **Deploy static NASDAQ supply-chain dashboard**.
6. Click **Run workflow**.
7. When the workflow turns green, open the Pages URL shown by GitHub.

## Codex instructions

This project is intentionally simple for Codex to edit. Ask Codex to modify:

- `app.js` for company data, scoring model, and charts
- `index.html` for layout or dashboard sections
- `styles.css` for visual design

Good next Codex task:

> Upgrade this static NASDAQ-100 supply-chain dashboard by expanding the dataset to more companies, adding filters for sector and risk type, improving the supplier network view, and preparing it for GitHub Pages deployment.
