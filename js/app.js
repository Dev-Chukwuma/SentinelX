/* ==========================================================================
   SentinelX — App Behaviors
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Live clock in footer ---------- */
  const clockEl = document.querySelector('[data-live-clock]');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      clockEl.textContent = now.toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }) + ' UTC' + (-now.getTimezoneOffset() / 60 >= 0 ? '+' : '') + (-now.getTimezoneOffset() / 60);
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ---------- Notification dropdown (simple toggle demo) ---------- */
  const notifBtn = document.querySelector('[data-notif-btn]');
  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifBtn.querySelector('.dot')?.remove();
  });

  /* ---------- Animated stat counters on load ---------- */
  document.querySelectorAll('[data-count-to]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1000;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  /* ---------- Stagger animation delays for cards / table rows ---------- */
  document.querySelectorAll('.stat-grid .stat-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 60}ms`;
  });
  document.querySelectorAll('.alert-list .alert-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 70}ms`;
  });
  document.querySelectorAll('tbody tr').forEach((row, i) => {
    row.style.animationDelay = `${Math.min(i * 40, 400)}ms`;
  });
  document.querySelectorAll('.panel').forEach((panel, i) => {
    panel.style.animationDelay = `${i * 80}ms`;
  });

  /* ---------- Chip toggle groups (e.g. chart range switchers) ---------- */
  document.querySelectorAll('.chip-toggle').forEach((group) => {
    group.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        group.dispatchEvent(new CustomEvent('range-change', { detail: btn.textContent.trim() }));
      });
    });
  });

  /* ---------- Settings toggles ---------- */
  document.querySelectorAll('.toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => toggle.classList.toggle('on'));
  });

  /* ---------- Search shortcut: press "/" to focus search ---------- */
  const searchInput = document.querySelector('.search-box input');
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput?.focus();
    }
    if (e.key === 'Escape') searchInput?.blur();
  });

  /* ---------- Simple client-side table filter (search box on table pages) ---------- */
  const tableFilterInput = document.querySelector('[data-table-filter]');
  const filterableTable = document.querySelector('[data-filterable-table]');
  tableFilterInput?.addEventListener('input', () => {
    const query = tableFilterInput.value.toLowerCase();
    filterableTable?.querySelectorAll('tbody tr').forEach((row) => {
      row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });

  /* ---------- Severity / status select filters ---------- */
  document.querySelectorAll('[data-filter-select]').forEach((select) => {
    select.addEventListener('change', () => {
      const key = select.getAttribute('data-filter-select');
      const value = select.value;
      const table = document.querySelector('[data-filterable-table]');
      table?.querySelectorAll('tbody tr').forEach((row) => {
        if (value === 'all') { row.style.display = ''; return; }
        row.style.display = row.getAttribute(`data-${key}`) === value ? '' : 'none';
      });
    });
  });

});

