(function () {
  'use strict';

  const burger = document.querySelector('.burger');
  const menu = document.getElementById('mobile-menu');

  if (!burger || !menu) return;

  const body = document.body;

  function openMenu() {
    menu.classList.add('is-open');
    burger.classList.add('is-active');
    body.classList.add('menu-open');

    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    menu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    burger.classList.remove('is-active');
    body.classList.remove('menu-open');

    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    menu.setAttribute('aria-hidden', 'true');
  }

  function toggleMenu() {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  /* Клик по бургеру */
  burger.addEventListener('click', toggleMenu);

  /* Клик по ссылке внутри меню — закрываем */
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Escape — закрыть */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      burger.focus();
    }
  });

  /* Ресайз: если ушли на десктоп, закрываем меню */
  const mq = window.matchMedia('(min-width: 721px)');
  mq.addEventListener('change', function (e) {
    if (e.matches) closeMenu();
  });

  /* Клик вне меню не нужен — меню на весь экран */

})();


(function () {
  'use strict';

  // Только для точных указателей (мышь, трекпад)
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  // Круг догоняет с задержкой — «упругий» эффект
  function loop() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.transform =
      `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(loop);
  }
  loop();

  // Ховер на интерактиве — увеличиваем круг
  const interactive = 'a, button, input, textarea, select, label, .burger';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactive)) {
      ring.classList.add('is-hover');
      dot.classList.add('is-hover');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactive)) {
      ring.classList.remove('is-hover');
      dot.classList.remove('is-hover');
    }
  });

  // Прячем курсор, когда уходит за окно
  document.addEventListener('mouseleave', function () {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    dot.style.opacity = '1';
    ring.style.opacity = '';
  });

})();

