/* ==========================================================================
   SentinelX — Chart Configurations (Chart.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = '#94A3B8';
  Chart.defaults.borderColor = 'rgba(148, 163, 184, 0.08)';

  const tooltipStyle = {
    backgroundColor: '#0E1626',
    borderColor: 'rgba(148, 163, 184, 0.22)',
    borderWidth: 1,
    titleColor: '#E5E7EB',
    bodyColor: '#94A3B8',
    padding: 10,
    boxPadding: 4,
    titleFont: { size: 12, weight: '600' },
    bodyFont: { size: 11.5 },
    displayColors: true,
    usePointStyle: true,
  };

  function makeGradient(ctx, colorFrom, colorTo) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, colorFrom);
    gradient.addColorStop(1, colorTo);
    return gradient;
  }

  /* ---------- Network Traffic (line, area) ---------- */
  const trafficEl = document.getElementById('networkTrafficChart');
  if (trafficEl) {
    const ctx = trafficEl.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        datasets: [
          {
            label: 'Inbound',
            data: [120, 190, 150, 220, 380, 520, 610, 580, 690, 640, 480, 340],
            borderColor: '#3B82F6',
            backgroundColor: makeGradient(ctx, 'rgba(59,130,246,0.35)', 'rgba(59,130,246,0)'),
            fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
          },
          {
            label: 'Outbound',
            data: [80, 110, 95, 140, 210, 290, 340, 310, 380, 360, 260, 190],
            borderColor: '#22D3EE',
            backgroundColor: makeGradient(ctx, 'rgba(34,211,238,0.25)', 'rgba(34,211,238,0)'),
            fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, padding: 16, font: { size: 11.5 } } },
          tooltip: { ...tooltipStyle, callbacks: { label: (c) => ` ${c.dataset.label}: ${c.formattedValue} Mbps` } },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10.5 } } },
          y: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { font: { size: 10.5 }, callback: (v) => v + ' Mbps' } },
        },
      },
    });
  }

  /* ---------- Threat Timeline (line, multi-severity) ---------- */
  const timelineEl = document.getElementById('threatTimelineChart');
  if (timelineEl) {
    const ctx = timelineEl.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jul 5', 'Jul 6', 'Jul 7', 'Jul 8', 'Jul 9', 'Jul 10', 'Jul 11', 'Jul 12'],
        datasets: [
          { label: 'Critical', data: [2, 1, 3, 2, 4, 3, 5, 3], borderColor: '#EF4444', backgroundColor: '#EF4444', tension: 0.4, pointRadius: 3, pointBackgroundColor: '#EF4444', borderWidth: 2 },
          { label: 'High', data: [5, 7, 4, 8, 6, 9, 7, 8], borderColor: '#F59E0B', backgroundColor: '#F59E0B', tension: 0.4, pointRadius: 3, pointBackgroundColor: '#F59E0B', borderWidth: 2 },
          { label: 'Medium', data: [12, 10, 14, 11, 15, 13, 16, 14], borderColor: '#22D3EE', backgroundColor: '#22D3EE', tension: 0.4, pointRadius: 3, pointBackgroundColor: '#22D3EE', borderWidth: 2 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', align: 'end', labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, padding: 16, font: { size: 11.5 } } },
          tooltip: tooltipStyle,
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10.5 } } },
          y: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { font: { size: 10.5 } }, beginAtZero: true },
        },
      },
    });
  }

  /* ---------- Attack Categories (doughnut) ---------- */
  const categoriesEl = document.getElementById('attackCategoriesChart');
  if (categoriesEl) {
    new Chart(categoriesEl.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Phishing', 'Malware', 'Brute Force', 'DDoS', 'Insider', 'Other'],
        datasets: [{
          data: [32, 24, 18, 12, 9, 5],
          backgroundColor: ['#3B82F6', '#22D3EE', '#F59E0B', '#EF4444', '#22C55E', '#64748B'],
          borderColor: '#111827', borderWidth: 3, hoverOffset: 6,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '68%',
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, padding: 12, font: { size: 11 } } },
          tooltip: { ...tooltipStyle, callbacks: { label: (c) => ` ${c.label}: ${c.formattedValue}%` } },
        },
      },
    });
  }

  /* ---------- Alert Trends (bar) ---------- */
  const alertTrendsEl = document.getElementById('alertTrendsChart');
  if (alertTrendsEl) {
    new Chart(alertTrendsEl.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          { label: 'Resolved', data: [18, 22, 15, 26, 20, 12, 9], backgroundColor: '#22C55E', borderRadius: 5, maxBarThickness: 22 },
          { label: 'Open', data: [6, 4, 8, 3, 5, 7, 6], backgroundColor: '#EF4444', borderRadius: 5, maxBarThickness: 22 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', align: 'end', labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, padding: 16, font: { size: 11.5 } } },
          tooltip: tooltipStyle,
        },
        scales: {
          x: { grid: { display: false }, stacked: false, ticks: { font: { size: 10.5 } } },
          y: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { font: { size: 10.5 } }, beginAtZero: true },
        },
      },
    });
  }

  /* ---------- Mini sparkline charts (used on Threat Intel / Reports pages) ---------- */
  document.querySelectorAll('[data-sparkline]').forEach((el) => {
    const color = el.getAttribute('data-color') || '#3B82F6';
    const raw = el.getAttribute('data-sparkline').split(',').map(Number);
    new Chart(el.getContext('2d'), {
      type: 'line',
      data: { labels: raw.map((_, i) => i), datasets: [{ data: raw, borderColor: color, borderWidth: 2, pointRadius: 0, tension: 0.4 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
        elements: { line: { fill: false } },
      },
    });
  });

});

