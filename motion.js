(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const htmlEl = document.documentElement;
  const lang = (htmlEl.getAttribute('lang') || '').toLowerCase();
  const path = window.location.pathname || '';
  const isRTL = htmlEl.dir === 'rtl' || ['ar', 'fa'].includes(lang) || path.startsWith('/ar/') || path.startsWith('/fa/');

  const gsapLib = window.gsap;
  if (!gsapLib) {
    return;
  }

  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger && gsapLib.registerPlugin) {
    gsapLib.registerPlugin(ScrollTrigger);
  }

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const addClasses = () => {
    const navLinks = document.querySelectorAll('header nav a, header nav button');
    navLinks.forEach((link) => link.classList.add('motion-underline', 'motion-ease'));

    document.querySelectorAll('a, button').forEach((el) => {
      el.classList.add('motion-magnetic');
      if (el.classList.contains('brand-gradient') || el.classList.contains('bg-emerald-500')) {
        el.classList.add('motion-button-glow');
      }
    });

    document.querySelectorAll('.glass, .glass-card, .timeline-stage, .rounded-3xl').forEach((card) => {
      card.classList.add('motion-card');
    });
  };

  addClasses();

  const animateNav = () => {
    const header = document.querySelector('header');
    if (!header) return;
    const navItems = header.querySelectorAll('nav a, nav button');
    const afterItems = header.querySelectorAll('.ml-auto a, .ml-auto button');

    const tl = gsapLib.timeline({ defaults: { duration: 0.6, ease: 'power3.out' } });
    if (navItems.length) {
      tl.fromTo(
        navItems,
        prefersReducedMotion ? { autoAlpha: 0 } : { autoAlpha: 0, y: -16, filter: 'blur(8px)' },
        prefersReducedMotion
          ? { autoAlpha: 1, stagger: 0.08 }
          : { autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.1 }
      );
    }
    if (afterItems.length) {
      tl.fromTo(
        afterItems,
        prefersReducedMotion ? { autoAlpha: 0 } : { autoAlpha: 0, y: -12, filter: 'blur(6px)' },
        prefersReducedMotion
          ? { autoAlpha: 1, stagger: 0.06 }
          : { autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.08 },
        '>-0.2'
      );
    }
  };

  const animateSections = () => {
    if (!ScrollTrigger) return;
    const sectionSet = new Set([
      ...document.querySelectorAll('section'),
      ...document.querySelectorAll('#brands, #production-timeline, #contact, footer')
    ]);

    sectionSet.forEach((section) => {
      if (!section) return;
      const headings = section.querySelectorAll('h1, h2, h3, h4');
      const bodyText = section.querySelectorAll('p, li');
      const cards = section.querySelectorAll('.glass, .glass-card, article, .motion-card, .rounded-2xl, .rounded-3xl');
      const images = section.querySelectorAll('img, video, picture');

      const xFrom = isRTL ? '50vw' : '-50vw';
      if (headings.length) {
        gsapLib.from(headings, {
          ...(prefersReducedMotion
            ? { autoAlpha: 0 }
            : { x: xFrom, autoAlpha: 0, filter: 'blur(10px)' }),
          duration: prefersReducedMotion ? 0.6 : 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
      if (bodyText.length) {
        gsapLib.from(bodyText, {
          ...(prefersReducedMotion ? { autoAlpha: 0 } : { y: 40, autoAlpha: 0 }),
          duration: prefersReducedMotion ? 0.5 : 0.9,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        });
      }
      if (cards.length) {
        gsapLib.from(cards, {
          ...(prefersReducedMotion ? { autoAlpha: 0 } : { y: 60, autoAlpha: 0, scale: 0.96 }),
          duration: prefersReducedMotion ? 0.6 : 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });
      }
      if (images.length) {
        gsapLib.fromTo(
          images,
          prefersReducedMotion ? { autoAlpha: 0 } : { scale: 1.06 },
          {
            ...(prefersReducedMotion ? { autoAlpha: 1 } : { scale: 1 }),
            duration: prefersReducedMotion ? 0.6 : 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  };

  const animateTimeline = () => {
    if (!ScrollTrigger) return;
    const timelineSection = document.getElementById('production-timeline');
    if (!timelineSection) return;
    const line = timelineSection.querySelector('.timeline-line');
    const stages = timelineSection.querySelectorAll('.timeline-stage');

    if (line) {
      gsapLib.set(line, { transformOrigin: 'top center' });
      gsapLib.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineSection,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: false
          }
        }
      );
    }
    if (stages.length) {
      gsapLib.from(stages, {
        autoAlpha: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: timelineSection,
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      });
    }
  };

  const animateActiveNav = () => {
    if (!ScrollTrigger) return;
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    navLinks.forEach((link) => {
      const id = link.getAttribute('href');
      if (!id) return;
      const target = document.querySelector(id);
      if (!target) return;
      ScrollTrigger.create({
        trigger: target,
        start: 'top 30%',
        end: 'bottom 30%',
        onEnter: () => link.classList.add('is-active'),
        onEnterBack: () => link.classList.add('is-active'),
        onLeave: () => link.classList.remove('is-active'),
        onLeaveBack: () => link.classList.remove('is-active')
      });
    });
  };

  const setupMagnetism = () => {
    if (prefersReducedMotion) return;
    const magneticItems = document.querySelectorAll('.motion-magnetic');
    magneticItems.forEach((item) => {
      let rafId = null;
      const strength = 10;

      const onMove = (event) => {
        const rect = item.getBoundingClientRect();
        const relX = event.clientX - rect.left - rect.width / 2;
        const relY = event.clientY - rect.top - rect.height / 2;
        const moveX = clamp(relX / rect.width, -1, 1) * strength;
        const moveY = clamp(relY / rect.height, -1, 1) * strength;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
      };

      const onLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        item.style.transform = 'translate3d(0, 0, 0)';
      };

      item.addEventListener('mousemove', onMove);
      item.addEventListener('mouseleave', onLeave);
      item.addEventListener('blur', onLeave);
    });
  };

  const setupScrollVelocityEffects = () => {
    if (prefersReducedMotion || !ScrollTrigger) return;
    const mediaEls = document.querySelectorAll('img, video, .motion-media');
    const cardEls = document.querySelectorAll('.glass, .glass-card, .motion-card');
    const accentEls = document.querySelectorAll('.brand-gradient, .motion-accent');

    const mediaSetters = Array.from(mediaEls, (el) => gsapLib.quickSetter(el, 'y', 'px'));
    const cardSetters = Array.from(cardEls, (el) => (value) => {
      el.style.setProperty('--motion-card-skew', `${value}deg`);
    });
    const accentSetters = Array.from(accentEls, (el) => gsapLib.quickSetter(el, 'filter'));
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;

    const tick = () => {
      const now = performance.now();
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;
      const dt = now - lastTime || 16;
      velocity = clamp(delta / dt, -1.5, 1.5);

      const mediaOffset = clamp(velocity * 30, -30, 30);
      const cardTilt = clamp(velocity * 6, -6, 6);
      const accentGlow = clamp(Math.abs(velocity) * 0.4, 0, 0.4);

      mediaSetters.forEach((setter) => setter(mediaOffset));
      cardSetters.forEach((setter) => setter(cardTilt));
      accentSetters.forEach((setter) =>
        setter(`drop-shadow(0 0 ${12 + accentGlow * 30}px rgba(0,224,164,${0.2 + accentGlow}))`)
      );

      lastScroll = currentScroll;
      lastTime = now;
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const init = () => {
    if (prefersReducedMotion) {
      gsapLib.set('body', { autoAlpha: 1 });
    }
    animateNav();
    animateSections();
    animateTimeline();
    animateActiveNav();
    setupMagnetism();
    setupScrollVelocityEffects();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
