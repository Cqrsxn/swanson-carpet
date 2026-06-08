/* ================================================
   SWANSON CARPET & UPHOLSTERY CLEANING
   Main App JavaScript
   Booking is handled by Calendly embed in index.html
   ================================================ */

'use strict';

// ── REVIEWS DATA ─────────────────────────────────
// To add, edit, or remove a review, update this array only.
// See REVIEWS_GUIDE.md for instructions.
const REVIEWS = [
  {
    name: 'Heather S.',
    location: 'Bluffton, SC',
    rating: 5,
    text: 'Swanson Cleaning did an amazing job. The house felt fresh, clean, and taken care of. They were friendly, professional, and easy to work with.',
  },
  {
    name: 'Tristen S.',
    location: 'Hilton Head, SC',
    rating: 5,
    text: 'Very reliable and detailed. It was so nice coming home to everything looking spotless. I would definitely recommend them.',
  },
  {
    name: 'Sarah M.',
    location: 'Okatie, SC',
    rating: 5,
    text: 'Great communication, great service, and the cleaning looked even better than expected. I\'ll definitely be using them again.',
  },
  {
    name: 'Amanda R.',
    location: 'Bluffton, SC',
    rating: 5,
    text: 'They were on time, professional, and paid attention to the little details. The whole house looked and smelled amazing.',
  },
  {
    name: 'Lauren T.',
    location: 'Hilton Head, SC',
    rating: 5,
    text: 'Booking was easy and the cleaning was excellent. I felt like they really cared about doing the job right.',
  },
];

function buildReviewCard(review) {
  const stars = '★'.repeat(review.rating);
  const initial = review.name.charAt(0);
  return `<div class="review-card" role="listitem">
    <div class="review-stars" aria-label="${review.rating} out of 5 stars">${stars}</div>
    <blockquote class="review-text">“${review.text}”</blockquote>
    <div class="review-author">
      <div class="review-avatar" aria-hidden="true">${initial}</div>
      <div>
        <strong>${review.name}</strong>
        <span>${review.location}</span>
      </div>
    </div>
  </div>`;
}

function initReviews() {
  const track = document.querySelector('.reviews-track');
  if (!track) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = REVIEWS.map(buildReviewCard).join('');
  // Duplicate for seamless marquee loop; skip duplication for reduced motion
  track.innerHTML = prefersReduced ? cards : cards + cards;
}

initReviews();

// ── Footer Year ─────────────────────────────────
document.getElementById('footerYear').textContent = new Date().getFullYear();

// ── Sticky Header on Scroll ──────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNavLink();
}, { passive: true });

// ── Mobile Nav Hamburger ─────────────────────────
const hamburger = document.getElementById('navHamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── Active Nav Link on Scroll ────────────────────
const sections = ['home', 'services', 'booking', 'about', 'faq', 'contact'];

function updateActiveNavLink() {
  const scrollY = window.scrollY + 100;
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ── Fade-in Animations ───────────────────────────
// Content is always visible by default (no JS = no problem).
// js-loaded enables the animations as a progressive enhancement.
document.body.classList.add('js-loaded');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const isGrid = parent && parent.matches('.services-grid, .why-grid, .before-after-grid, .areas-grid');
      const delay  = isGrid ? Array.from(parent.children).indexOf(entry.target) * 80 : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));

// Fallback: force everything visible after 1.2s in case observer doesn't fire
setTimeout(() => {
  document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => el.classList.add('visible'));
}, 1200);

// ── FAQ Accordion ────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Service cards are <a href="#booking"> / <a href="#emergency"> in HTML — no JS needed.

// ── Smooth Scroll ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id     = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('header').offsetHeight + 12;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
