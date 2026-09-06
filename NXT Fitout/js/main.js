// Общая логика для публичных страниц: мобильное меню и переключение языка шапки.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  // Переключение языка теперь полностью реализовано в js/i18n.js
  // (словарь + применение к data-i18n элементам).

  // Плавный скролл к калькулятору с любой страницы, если есть #calculator
  document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
