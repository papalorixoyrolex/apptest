(function() {
  // список ваших файлів в порядку навігації
  const pages = ['index.html', 'task.html', 'habits.html', 'history.html'];

  // поточний файл
  const currentFile = window.location.pathname.split('/').pop();
  const currentIndex = pages.indexOf(currentFile);

  // знайти всі кнопки і проставити active
  const buttons = document.querySelectorAll('.nav-bar button');
  buttons.forEach(btn => {
    if (btn.dataset.page === currentFile) {
      btn.classList.add('active');
    }
  });

  // якщо не мобільний — свайп не потрібен
  if (!('ontouchstart' in window)) return;

  let startX = 0;
  const threshold = 50; // мінімальна відстань для свайпу

  document.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].screenX;
    const diff = endX - startX;

    // свайп вліво → наступна сторінка
    if (diff < -threshold && currentIndex < pages.length - 1) {
      window.location.href = pages[currentIndex + 1];
    }
    // свайп вправо → попередня сторінка
    else if (diff > threshold && currentIndex > 0) {
      window.location.href = pages[currentIndex - 1];
    }
  });
})();



(function() {
  // контейнер для всіх тостів
  const container = document.createElement('div');
  container.id = 'toast-container';
  document.body.append(container);

  /**
   * Створює і показує простий тост
   * @param {string} text — текст повідомлення
   * @param {number} duration — час у мс до зникнення
   */
  window.showToast = function(text, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    container.append(toast);

    // анімація появи
    requestAnimationFrame(() => toast.classList.add('show'));

    // через duration видаляємо
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
  };

  /**
   * Створює і показує тост з кнопкою підтвердження
   * @param {string} text — текст повідомлення
   * @param {Function} onConfirm — колбек при натисканні «OK»
   */
  window.showConfirmToast = function(text, onConfirm) {
    const toast = document.createElement('div');
    toast.className = 'toast confirm';
    const msg = document.createElement('div');
    msg.textContent = text;
    const btn = document.createElement('button');
    btn.textContent = 'Так, підтвердити!';
    btn.onclick = () => {
      onConfirm && onConfirm();
      hide();
    };
    toast.append(msg, btn);
    container.append(toast);

    // показ
    requestAnimationFrame(() => toast.classList.add('show'));

    // якщо потрібно автоматично ховатись через певний час — раскоментуйте
    // setTimeout(hide, 5000);

    function hide() {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }
  };
})();

