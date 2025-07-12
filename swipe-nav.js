(function() {
  // ======= NAVIGATION BY SWIPE & ACTIVE BUTTON =======
  const pages = ['index.html', 'task.html', 'habits.html', 'history.html'];
  const currentFile = window.location.pathname.split('/').pop();
  const currentIndex = pages.indexOf(currentFile);

  // Активна кнопка
  document.querySelectorAll('.nav-bar button').forEach(btn => {
    if (btn.dataset.page === currentFile) {
      btn.classList.add('active');
    }
  });

  // Swipe only on touch devices
  if ('ontouchstart' in window) {
    let startX = 0;
    const threshold = 50;
    document.addEventListener('touchstart', e => {
      startX = e.changedTouches[0].screenX;
    });
    document.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].screenX - startX;
      if (diff < -threshold && currentIndex < pages.length - 1) {
        window.location.href = pages[currentIndex + 1];
      } else if (diff > threshold && currentIndex > 0) {
        window.location.href = pages[currentIndex - 1];
      }
    });
  }
})();

// ======= TOASTS =======
(() => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.append(container);
  }

  window.showToast = function (text, duration = 2000) {
    container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = text;
    container.append(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
  };

  window.showConfirmToast = function (text, onConfirm) {
    container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'toast confirm';

    const msg = document.createElement('div');
    msg.textContent = text;

    const btn = document.createElement('button');
    btn.textContent = 'Так, підтвердити!';
    btn.className = 'confirm-btn';
    btn.onclick = () => {
      onConfirm && onConfirm();
      hide();
      clearTimeout(autoHide);
    };

    toast.append(msg, btn);
    container.append(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    const autoHide = setTimeout(hide, 5000);

    function hide() {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }
  };
})();


