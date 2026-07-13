/* ==========================================================================
   SentinelX — Sidebar Behavior
   ========================================================================== */

(function () {
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main');
  const collapseBtn = document.querySelector('.sidebar-collapse-btn');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!sidebar) return;

  // Restore collapsed state from previous session
  if (localStorage.getItem('sentinelx-sidebar-collapsed') === 'true') {
    sidebar.classList.add('collapsed');
    main?.classList.add('expanded');
  }

  collapseBtn?.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('collapsed');
    main?.classList.toggle('expanded');
    localStorage.setItem('sentinelx-sidebar-collapsed', collapsed);
  });

  mobileMenuBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    overlay?.classList.toggle('active');
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
  });

  // Highlight active nav item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach((item) => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
})();

