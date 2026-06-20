/**
 * portfolio.js
 * GSAP + ScrollTrigger animations for Yaretzy Wara's Portfolio
 * Ultra-tech dark-minimalist scroll reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── Register ScrollTrigger ─── */
  gsap.registerPlugin(ScrollTrigger);

  /* ─── NAVBAR TOGGLE (Mobile) ─── */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobileMenu');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.toggle('active');
    });
    navMobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMobile.classList.remove('active'));
    });
  }

  /* ─── NAVBAR SCROLL EFFECT ─── */
  const navbar = document.getElementById('navbar');
  gsap.to(navbar, {
    background: 'rgba(10, 10, 10, 0.92)',
    boxShadow: '0 1px 0 rgba(255,255,255,0.04)',
    scrollTrigger: {
      trigger: document.body,
      start: 'top -60px',
      end: 'top -80px',
      scrub: 0.6
    }
  });

  /* ─── SET INITIAL HIDDEN STATES (JS-driven, CSS keeps visible by default) ─── */
  gsap.set('[data-reveal]', { opacity: 0, y: 40 });

  /* ─── HERO PAGE-LOAD TIMELINE ─── */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
  heroTl
    .fromTo('.navbar', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    .fromTo('.hero-label', { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, '-=0.2')
    .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.1 }, '-=0.3')
    .fromTo('.hero-subtitle', { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, '-=0.3')
    .fromTo('.hero-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, '-=0.3');

  /* ─── REVEAL HELPER (staggered fade-up per section) ─── */
  function revealChildren(container, stagger = 0.12, y = 30, start = 'top 82%') {
    const children = container.querySelectorAll('[data-reveal]');
    if (!children.length) return;
    gsap.to(children, {
      opacity: 1,
      y: 0,
      stagger,
      ease: 'power3.out',
      duration: 0.9,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none reverse'
      }
    });
  }

  /* ─── SECTIONS REVEAL ─── */
  revealChildren(document.querySelector('.about'), 0.12, 30, 'top 80%');
  revealChildren(document.querySelector('.experience'), 0.18, 30, 'top 80%');
  revealChildren(document.querySelector('.projects'), 0.15, 30, 'top 80%');
  revealChildren(document.querySelector('.awards'), 0.1, 30, 'top 85%');
  revealChildren(document.querySelector('.skills'), 0.1, 30, 'top 80%');
  revealChildren(document.querySelector('.contact'), 0.12, 30, 'top 80%');

  /* ─── TIMELINE ITEMS STAGGER ─── */
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    gsap.set(timelineItems, { opacity: 0, x: -20 });
    gsap.to(timelineItems, {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      ease: 'power3.out',
      duration: 0.7,
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  /* ─── PROJECT CARDS STAGGER ─── */
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    gsap.set(projectCards, { opacity: 0, y: 40 });
    gsap.to(projectCards, {
      opacity: 1,
      y: 0,
      stagger: 0.18,
      ease: 'power3.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  /* ─── SKILL CARDS STAGGER ─── */
  const skillCards = document.querySelectorAll('.skill-category');
  if (skillCards.length) {
    gsap.set(skillCards, { opacity: 0, y: 30 });
    gsap.to(skillCards, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: 'power3.out',
      duration: 0.6,
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  /* ─── AWARD CHIPS STAGGER ─── */
  const awardChips = document.querySelectorAll('.award-chip');
  if (awardChips.length) {
    gsap.set(awardChips, { opacity: 0, scale: 0.92 });
    gsap.to(awardChips, {
      opacity: 1,
      scale: 1,
      stagger: 0.06,
      ease: 'back.out(1.4)',
      duration: 0.5,
      scrollTrigger: {
        trigger: '.awards-track',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  /* ─── SECTION BG TITLE REVEAL (subtle fade-in of the massive bg text) ─── */
  const bgTitles = document.querySelectorAll('.section-bg-title');
  if (bgTitles.length) {
    gsap.set(bgTitles, { opacity: 0, x: -20 });
    gsap.to(bgTitles, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  /* ─── CONTACT FORM SUBMIT (prevent default for demo) ─── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<span class="btn-label">Message Sent</span> <i class="fa-solid fa-check"></i>';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 2500);
    });
  }

  /* ─── REFRESH ScrollTrigger (layout settled) ─── */
  ScrollTrigger.refresh();
});
