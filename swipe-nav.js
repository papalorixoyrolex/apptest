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
