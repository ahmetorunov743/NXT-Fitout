// Общая логика для публичных страниц: мобильное меню и переключение языка шапки.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  const langBtn = document.querySelector('.lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      langBtn.textContent = langBtn.textContent === 'RU' ? 'EN' : 'RU';
      // Полноценная локализация всего сайта здесь не реализована —
      // подключите свою систему переводов (см. README).
    });
  }

  // Плавный скролл к калькулятору с любой страницы, если есть #calculator
  document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
