function highlightActiveNav() {
  const path = window.location.pathname;
  console.log('Current path:', path);

  document.querySelectorAll('.nav-bar button').forEach(btn => btn.classList.remove('active'));

  if (path.endsWith('/') || path.endsWith('/index.html')) {
    document.getElementById('nav-home')?.classList.add('active');
  } else if (path.includes('habits')) {
    document.getElementById('nav-habits')?.classList.add('active');
  } else if (path.includes('history')) {
    document.getElementById('nav-history')?.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNav();
});
