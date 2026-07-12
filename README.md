# SentinelX

A modern, premium-quality cybersecurity SOC (Security Operations Center) dashboard. Static frontend built with HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

## Preview
Open `index.html` in a browser, or serve the folder with any static server. Works great on GitHub Pages.

```bash
# quick local preview
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
SentinelX/
├── index.html                 → Dashboard (stats, charts, live logs, assets, alerts)
├── alerts.html                → Full alert list with filters
├── threat-intelligence.html   → IOC feed, threat actors, CVEs
├── logs.html                  → Searchable/filterable event log
├── assets.html                → Connected asset inventory
├── reports.html                → Generated & scheduled reports
├── settings.html              → Profile, notifications, security, appearance
├── css/
│   ├── style.css               → Design system + layout
│   └── responsive.css          → Tablet/mobile breakpoints
├── js/
│   ├── app.js                  → Navbar, counters, filters, toggles, clock
│   ├── charts.js               → Chart.js configs for all charts
│   └── sidebar.js               → Collapse/mobile nav + active link state
└── images/                     → (empty, for future assets)
```

## Design system

| Token | Value |
|---|---|
| Background | `#0B1220` |
| Card | `#111827` |
| Primary Blue | `#3B82F6` |
| Cyan | `#22D3EE` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Text | `#E5E7EB` |
| Secondary Text | `#94A3B8` |
| Font | Inter (Google Fonts) |
| Icons | Font Awesome 6 |

Signature details: a radiating "radar pulse" ring on the brand mark, a live heartbeat status dot in the sidebar footer, and animated count-up stat values — small touches that reinforce the "live monitoring" feel without leaning on the generic hacker-green-terminal look.

## Data

All log entries, alerts, assets, and chart values are realistic demo data hardcoded in the HTML/JS — there is no backend yet.

## Roadmap (Phase 2)

- Convert to a Django application
- Django REST Framework APIs
- PostgreSQL database
- Real authentication + user roles
- Live WebSocket updates
- Real threat intelligence feed integration
- AI-powered security assistant

## Credits

Built by Divine Chukwuma.
