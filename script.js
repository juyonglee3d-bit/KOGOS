/* ==========================================================================
   KOGOS — site behaviour
   - KO / EN toggle (persisted)
   - mobile navigation
   - header shadow + active section highlight
   - reveal-on-scroll
   - product specification modal
   - enquiry form (builds a mailto: message, no server)
   ========================================================================== */
(function () {
  'use strict';

  var LANG_KEY = 'kogos.lang';

  /* ---------------- product metadata for the spec modal ------------------ */
  var PRODUCTS = {
    imx6q: {
      tag: 'NXP i.MX6 Quad',
      title: 'IMX6Q Board',
      img: 'assets/images/products/product-imx6q.jpg',
      alt: {
        ko: 'KOGOS IMX6Q Board — NXP i.MX6 Quad 산업용 메인보드',
        en: 'KOGOS IMX6Q Board — NXP i.MX6 Quad industrial main board'
      },
      desc: {
        ko: 'NXP i.MX6 Quad 기반 산업용 메인보드입니다. 3개의 이더넷 포트와 7.0″·10.1″·15.4″ LVDS 디스플레이, RS-232/RS-485 선택형 UART, CAN, mSATA SSD와 4G 모뎀용 Mini PCIe를 지원합니다.',
        en: 'An industrial main board on the NXP i.MX6 Quad. Three Ethernet ports, 7.0″, 10.1″ and 15.4″ LVDS displays, selectable RS-232/RS-485 UARTs, CAN, mSATA SSD and a Mini PCIe slot for a 4G modem.'
      }
    },
    cm4: {
      tag: 'Raspberry Pi CM4',
      title: 'CM4 Board',
      img: 'assets/images/products/product-cm4.jpg',
      alt: {
        ko: 'KOGOS CM4 Board — Raspberry Pi CM4 기반 HMI 보드',
        en: 'KOGOS CM4 Board — Raspberry Pi CM4 based HMI board'
      },
      desc: {
        ko: 'Raspberry Pi Compute Module 4 기반 베이스보드로, HMI·게이트웨이·패널 PC 구성에 적합합니다. 4포트 RS-485/RS-232, 8ch ADC·4ch DAC, M.2 NVMe SSD와 LTE 모듈, USB-C 디버그 포트를 제공합니다.',
        en: 'A Raspberry Pi Compute Module 4 base board for HMI, gateway and panel-PC builds: four RS-485/RS-232 ports, 8-channel ADC and 4-channel DAC, M.2 NVMe SSD and LTE module options, and a USB-C debug port.'
      }
    },
    cm3: {
      tag: 'Raspberry Pi CM3',
      title: 'CM3 Board',
      img: 'assets/images/products/product-cm3.jpg',
      alt: {
        ko: 'KOGOS CM3 Board — Raspberry Pi CM3 기반 베이스보드',
        en: 'KOGOS CM3 Board — Raspberry Pi CM3 based base board'
      },
      desc: {
        ko: 'Raspberry Pi Compute Module 3 기반의 컴팩트 베이스보드입니다. 7.0″/10.1″ LVDS LCD와 정전식 터치, 3개의 USB 호스트, RS-485/RS-232, 24V 전원 입력을 제공합니다.',
        en: 'A compact Raspberry Pi Compute Module 3 base board with 7.0″/10.1″ LVDS LCD and capacitive touch, three USB host ports, RS-485/RS-232 and 24 V input.'
      }
    },
    solar: {
      tag: 'STM32F407',
      title: 'Solar RTU',
      img: 'assets/images/products/product-solar-rtu.jpg',
      alt: {
        ko: 'KOGOS STM32F407 Solar RTU — 태양광 원격 단말 제어보드',
        en: 'KOGOS STM32F407 Solar RTU — solar remote terminal control board'
      },
      desc: {
        ko: '태양광 원격 단말(RTU)용 STM32F407 제어보드입니다. 4개의 RS-485와 2개의 RS-232, 5분 UPS 백업 기능, 2.4″ LCD와 4키 조작부, AC 220V 전원을 제공합니다.',
        en: 'An STM32F407 control board for solar remote terminal units: four RS-485 and two RS-232 ports, 5-minute UPS backup, 2.4″ LCD with four-key panel and AC 220 V input.'
      }
    },
    ev: {
      tag: 'STM32F407',
      title: 'EV Charger',
      img: 'assets/images/products/product-ev-charger.jpg',
      alt: {
        ko: 'KOGOS EV Charger — 전기차 충전기 제어·계량 보드',
        en: 'KOGOS EV Charger — EV charger control and metering board'
      },
      desc: {
        ko: '전기차 충전기용 STM32F407 제어·계량 보드입니다. 4개의 RS-485와 1개의 RS-232, 12V 도어락 릴레이, 2.4″ 터치 LCD, AC 220V 전원을 제공합니다.',
        en: 'An STM32F407 control and metering board for EV chargers: four RS-485 and one RS-232 port, 12 V door-lock relay, 2.4″ touch LCD and AC 220 V input.'
      }
    }
  };

  var META = {
    ko: {
      title: 'KOGOS 코고스 | 임베디드 H/W 설계 ODM · 산업용 LCD/CTP · 2026 ODM 제품',
      desc: '코고스(KOGOS)는 임베디드 하드웨어 설계 ODM과 산업용 LCD·CTP 통합을 전문으로 합니다. i.MX6, Raspberry Pi CM3/CM4, STM32F407 기반 2026 ODM 제품 5종과 설계·인증·양산 원스톱 서비스를 제공합니다.',
      nav: '주 메뉴',
      close: '닫기',
      menu: '메뉴'
    },
    en: {
      title: 'KOGOS | Embedded H/W Design ODM · Industrial LCD & CTP · 2026 lineup',
      desc: 'KOGOS is an embedded hardware design ODM specialising in industrial LCD and capacitive touch integration, with five 2026 ODM products on i.MX6, Raspberry Pi CM3/CM4 and STM32F407, plus design, certification and manufacturing under one roof.',
      nav: 'Main menu',
      close: 'Close',
      menu: 'Menu'
    }
  };

  var html = document.documentElement;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function currentLang() { return html.getAttribute('lang') === 'en' ? 'en' : 'ko'; }

  /* ---------------- language -------------------------------------------- */
  function applyLanguage(lang, persist) {
    lang = lang === 'en' ? 'en' : 'ko';
    html.setAttribute('lang', lang);
    html.setAttribute('data-lang', lang);

    $$('.lang-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    // placeholders and other attributes that CSS cannot switch
    $$('[data-ph-ko]').forEach(function (el) {
      el.setAttribute('placeholder', el.getAttribute('data-ph-' + lang) || '');
    });
    $$('option[data-' + lang + ']').forEach(function (opt) {
      opt.textContent = opt.getAttribute('data-' + lang);
    });

    document.title = META[lang].title;
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', META[lang].desc);
    var nav = $('#nav');
    if (nav) nav.setAttribute('aria-label', META[lang].nav);

    var specTitle = $('#spec-title');
    if (specTitle && specTitle.dataset.key) renderSpec(specTitle.dataset.key);
    var closeBtn = $('.modal-close');
    if (closeBtn) closeBtn.setAttribute('aria-label', META[lang].close);

    if (persist) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    }
  }

  $$('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'), true);
    });
  });

  /* ---------------- mobile navigation ----------------------------------- */
  var nav = $('#nav');
  var navToggle = $('#nav-toggle');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ---------------- header state + active section ------------------------ */
  var header = $('#site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navLinks = $$('.nav a');
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------------- reveal on scroll ------------------------------------ */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- specification modal --------------------------------- */
  var modal = $('#spec-modal');
  var lastFocus = null;

  function renderSpec(key) {
    var p = PRODUCTS[key];
    if (!p) return;
    var lang = currentLang();
    var title = $('#spec-title');
    var tag = $('#spec-tag');
    var desc = $('#spec-desc');
    var img = $('#spec-img');
    if (title) { title.textContent = p.title; title.dataset.key = key; }
    if (tag) tag.textContent = p.tag;
    if (desc) desc.textContent = p.desc[lang];
    if (img) { if (img.getAttribute('src') !== p.img) img.src = p.img; img.alt = p.alt[lang]; }
    $$('.spec-panel').forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-spec-panel') !== key;
    });
  }

  function openSpec(key) {
    if (!modal) return;
    lastFocus = document.activeElement;
    renderSpec(key);
    modal.hidden = false;
    document.body.classList.add('modal-open');
    var closeBtn = $('.modal-close', modal);
    if (closeBtn) closeBtn.focus();
  }

  function closeSpec() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  $$('[data-open-spec]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openSpec(btn.getAttribute('data-open-spec'));
    });
  });

  if (modal) {
    $$('[data-close-modal]', modal).forEach(function (el) {
      el.addEventListener('click', function (e) {
        // the "enquire" button is a link to #contact: close first, let it jump
        closeSpec();
        if (el.tagName === 'A') {
          var sel = $('#f-product');
          var key = $('#spec-title') && $('#spec-title').dataset.key;
          if (sel && key && PRODUCTS[key]) {
            sel.value = PRODUCTS[key].title;
            if (typeof sel.value !== 'undefined' && sel.value !== PRODUCTS[key].title) sel.value = '';
          }
        } else {
          e.preventDefault();
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') { closeSpec(); return; }
      if (e.key !== 'Tab') return;
      var focusables = $$('a[href], button:not([disabled]), input, select, textarea', modal)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    });
  }

  /* ---------------- quote links prefill the form ------------------------ */
  var productSelect = $('#f-product');
  $$('[data-quote]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!productSelect) return;
      productSelect.value = link.getAttribute('data-quote');
    });
  });

  /* ---------------- enquiry form ---------------------------------------- */
  var form = $('#inquiry-form');
  if (form) {
    var status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    form.appendChild(status);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lang = currentLang();
      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;
      var ok = true;

      [name, email, message].forEach(function (field) {
        var invalid = !field.value.trim() || (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
        field.classList.toggle('is-invalid', invalid);
        if (invalid) ok = false;
      });

      if (!ok) {
        status.textContent = lang === 'en'
          ? 'Please fill in your name, a valid e-mail address and a short message.'
          : '이름, 올바른 이메일 주소, 문의 내용을 입력해 주세요.';
        return;
      }

      var subject = (lang === 'en' ? 'Website enquiry' : '홈페이지 문의')
        + ' — ' + (form.elements.company.value.trim() || name.value.trim())
        + (form.elements.product.value ? ' / ' + form.elements.product.value : '');

      var lines = [
        (lang === 'en' ? 'Name' : '이름') + ': ' + name.value.trim(),
        (lang === 'en' ? 'Company' : '회사/소속') + ': ' + (form.elements.company.value.trim() || '-'),
        (lang === 'en' ? 'E-mail' : '이메일') + ': ' + email.value.trim(),
        (lang === 'en' ? 'Phone' : '연락처') + ': ' + (form.elements.phone.value.trim() || '-'),
        (lang === 'en' ? 'Product' : '관심 제품') + ': ' + (form.elements.product.value || '-'),
        '',
        message.value.trim()
      ];

      var href = 'mailto:jylee@kogos.co.kr'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\r\n'));

      status.textContent = lang === 'en'
        ? 'Opening your mail app with the message filled in…'
        : '메일 앱이 열리며 문의 내용이 채워집니다…';

      window.location.href = href;
    });

    // clear the invalid state as the user types
    $$('input, textarea', form).forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.value.trim()) field.classList.remove('is-invalid');
      });
    });
  }

  /* ---------------- footer year ----------------------------------------- */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------- boot ------------------------------------------------- */
  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
  // Korean is the default; a visitor's own choice from an earlier visit wins
  applyLanguage(saved === 'en' ? 'en' : 'ko', false);
})();
