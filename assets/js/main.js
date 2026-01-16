/**
* Template Name: Passion
* Template URL: https://bootstrapmade.com/passion-bootstrap-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      // initialize isotope with smooth transition and custom show/hide styles
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
        transitionDuration: '0.6s',
        hiddenStyle: { opacity: 0, transform: 'scale(0.98) translateY(10px)' },
        visibleStyle: { opacity: 1, transform: 'scale(1) translateY(0)' }
      });

      // Attach filter handlers after isotope is ready to avoid race conditions
      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
        // accessibility: make filters keyboard focusable and announceable
        filters.setAttribute('role', 'button');
        filters.setAttribute('tabindex', '0');

        function applyFilter(evt) {
          const active = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (active) active.classList.remove('filter-active');
          filters.classList.add('filter-active');

          // add a temporary class for CSS animations during filtering
          isotopeItem.classList.add('isotope-filtering');

          initIsotope.arrange({ filter: filters.getAttribute('data-filter') });

          // reinitialize AOS so revealed items animate
          if (typeof aosInit === 'function') {
            aosInit();
          }

          // remove the filtering class after transition completes
          setTimeout(function () {
            isotopeItem.classList.remove('isotope-filtering');
          }, 700);
        }

        filters.addEventListener('click', applyFilter, false);
        filters.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            applyFilter(e);
          }
        });
      });
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Internationalization (i18n)
   */
  const defaultLang = 'en';

  async function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', lang);

    try {
      const response = await fetch(`assets/lang/${lang}.json`);
      if (!response.ok) {
        console.error(`Could not load translation file: ${lang}.json`);
        return;
      }
      const translations = await response.json();
      updateContent(translations);
    } catch (error) {
      console.error('Error loading or parsing translation file:', error);
    }
  }

  function updateContent(translations) {
    // Update meta tags and title for SEO
    if (translations.meta_title) {
      document.title = translations.meta_title;
    }
    if (translations.meta_description) {
      const descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) {
        descriptionTag.setAttribute('content', translations.meta_description);
      }
    }
    if (translations.meta_keywords) {
      const keywordsTag = document.querySelector('meta[name="keywords"]');
      if (keywordsTag) {
        keywordsTag.setAttribute('content', translations.meta_keywords);
      }
    }

    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      let key = element.getAttribute('data-i18n');
      let attr = 'innerHTML'; // Default attribute

      if (key.startsWith('[') && key.includes(']')) {
        const parts = key.split(']');
        attr = parts[0].substring(1); // e.g., "placeholder" or "title"
        key = parts[1]; // the actual translation key
      }

      if (translations[key]) {
        if (attr === 'innerHTML') {
          element.innerHTML = translations[key];
        } else {
          element.setAttribute(attr, translations[key]);
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const langSwitcher = document.querySelector('#lang-switcher');
    if (langSwitcher) {
      langSwitcher.addEventListener('click', () => {
        const currentLang = localStorage.getItem('language') || defaultLang;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
      });
    }

    const savedLang = localStorage.getItem('language');
    setLanguage(savedLang || defaultLang);
  });

})();