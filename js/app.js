/* ================================================
   SWANSON CARPET & UPHOLSTERY CLEANING
   Main App JavaScript
   ================================================ */

'use strict';

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

// Close mobile nav when a link is clicked
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
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${current}`);
  });
}

// ── Intersection Observer for Fade Animations ────
// Enable animations only after JS is ready — content is always visible as fallback
document.body.classList.add('js-loaded');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.closest('.services-grid, .why-grid, .before-after-grid, .testimonials-grid, .areas-grid')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));

// Safety fallback: if observer never fires (e.g. old browser), show everything after 1s
setTimeout(() => {
  document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => el.classList.add('visible'));
}, 1000);

// ── FAQ Accordion ────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));

    // Toggle this one
    if (!isOpen) item.classList.add('open');
  });
});

// ── Smooth Scroll for anchor links ───────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    const headerH = document.getElementById('header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ================================================
   BOOKING
   Powered by Calendly inline widget.
   The embed script is loaded directly in index.html.
   No additional JS needed here.
   ================================================ */

// Calendly is handled via the embed in index.html.
// To swap to a different Calendly link, update the
// data-url attribute on .calendly-inline-widget.

const BookingCalendar = (() => {
  function init() { /* Calendly handles booking */ }
  return { init };
})();

if (false) { // legacy custom calendar — kept for reference only
const BookingCalendarLegacy = (() => {

  // State
  let state = {
    year:         new Date().getFullYear(),
    month:        new Date().getMonth(),
    selectedDate: null,
    selectedTime: null,
  };

  // Time slots available Mon–Sat
  const ALL_SLOTS = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM',  '2:00 PM',  '3:00 PM',  '4:00 PM',
  ];

  // Simulate some booked slots (keyed YYYY-MM-DD → array of booked times)
  // [INTEGRATION] Replace this with a real fetch from your backend/database
  const BOOKED_SLOTS = {
    // Example: '2026-06-10': ['10:00 AM', '2:00 PM'],
  };

  function getAvailableSlots(dateStr) {
    const booked = BOOKED_SLOTS[dateStr] || [];
    return ALL_SLOTS.map(t => ({ time: t, available: !booked.includes(t) }));
  }

  // DOM refs
  const calGrid      = document.getElementById('calendarGrid');
  const calMonthYear = document.getElementById('calMonthYear');
  const calPrev      = document.getElementById('calPrev');
  const calNext      = document.getElementById('calNext');
  const step1        = document.getElementById('step1');
  const step2        = document.getElementById('step2');
  const step3        = document.getElementById('step3');
  const stepConf     = document.getElementById('stepConfirmation');
  const stepsBar     = document.getElementById('bookingSteps');

  function setStep(n) {
    [step1, step2, step3, stepConf].forEach(p => p.classList.add('hidden'));
    const panels = { 1: step1, 2: step2, 3: step3, conf: stepConf };
    (panels[n] || panels[1]).classList.remove('hidden');

    // Update step indicators
    stepsBar.querySelectorAll('.booking-step').forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.toggle('active', sn === n);
      s.classList.toggle('complete', typeof n === 'number' && sn < n);
    });
  }

  // Month names
  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  function renderCalendar() {
    const { year, month, selectedDate } = state;
    calMonthYear.textContent = `${MONTHS[month]} ${year}`;

    const today    = new Date();
    today.setHours(0,0,0,0);
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calGrid.innerHTML = '';

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day empty';
      calGrid.appendChild(cell);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const cell  = document.createElement('div');
      const date  = new Date(year, month, d);
      const isSun = date.getDay() === 0;
      const isPast = date < today;
      const dateStr = formatDate(year, month, d);

      cell.className = 'cal-day';
      cell.textContent = d;

      if (isSun || isPast) {
        cell.classList.add('disabled');
      } else {
        if (date.toDateString() === today.toDateString()) cell.classList.add('today');
        if (dateStr === selectedDate) cell.classList.add('selected');
        cell.addEventListener('click', () => selectDate(dateStr, year, month, d));
      }
      calGrid.appendChild(cell);
    }
  }

  function formatDate(y, m, d) {
    return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }

  function friendlyDate(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m-1, d);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  function selectDate(dateStr, y, m, d) {
    state.selectedDate = dateStr;
    state.selectedTime = null;
    renderCalendar();
    renderTimeSlots(dateStr);
    setStep(2);
  }

  function renderTimeSlots(dateStr) {
    const label = document.getElementById('selectedDateLabel');
    const grid  = document.getElementById('timeslotGrid');
    label.textContent = `Available Times — ${friendlyDate(dateStr)}`;
    grid.innerHTML = '';

    const slots = getAvailableSlots(dateStr);
    slots.forEach(({ time, available }) => {
      const btn = document.createElement('button');
      btn.className = 'time-slot' + (!available ? ' unavailable' : '');
      btn.textContent = time;
      btn.disabled = !available;
      if (available) {
        btn.addEventListener('click', () => selectTime(time, grid));
      }
      grid.appendChild(btn);
    });
  }

  function selectTime(time, grid) {
    state.selectedTime = time;
    grid.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
    Array.from(grid.querySelectorAll('.time-slot'))
      .find(b => b.textContent === time)
      ?.classList.add('selected');

    // Short delay so user sees selection, then advance
    setTimeout(() => {
      renderBookingForm();
      setStep(3);
    }, 260);
  }

  function renderBookingForm() {
    const summary = document.getElementById('formSummary');
    summary.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <span>${friendlyDate(state.selectedDate)} at <strong>${state.selectedTime}</strong></span>
    `;
  }

  // Navigation buttons
  calPrev.addEventListener('click', () => {
    if (state.month === 0) { state.month = 11; state.year--; }
    else state.month--;
    renderCalendar();
  });

  calNext.addEventListener('click', () => {
    if (state.month === 11) { state.month = 0; state.year++; }
    else state.month++;
    renderCalendar();
  });

  document.getElementById('backToCalBtn').addEventListener('click', () => {
    state.selectedTime = null;
    setStep(1);
    renderCalendar();
  });

  document.getElementById('backToTimesBtn').addEventListener('click', () => {
    setStep(2);
    renderTimeSlots(state.selectedDate);
  });

  document.getElementById('bookAnotherBtn').addEventListener('click', () => {
    state.selectedDate = null;
    state.selectedTime = null;
    document.getElementById('bookingForm').reset();
    setStep(1);
    renderCalendar();
  });

  // ── Form Submission ─────────────────────────────
  const form = document.getElementById('bookingForm');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      date:    state.selectedDate,
      time:    state.selectedTime,
      name:    form.clientName.value.trim(),
      phone:   form.clientPhone.value.trim(),
      email:   form.clientEmail.value.trim(),
      service: form.clientService.options[form.clientService.selectedIndex].text,
      address: form.clientAddress.value.trim(),
      notes:   form.clientNotes.value.trim(),
      created: new Date().toISOString(),
    };

    // [INTEGRATION] Replace localStorage with your API call:
    // -------------------------------------------------------
    // Google Calendar:  POST to your Google Apps Script webhook
    // Calendly:         Use Calendly Embed or API
    // Supabase:         supabase.from('bookings').insert(data)
    // Firebase:         db.collection('bookings').add(data)
    // -------------------------------------------------------
    saveBookingLocally(data);

    showConfirmation(data);
  });

  function validateForm() {
    let valid = true;
    const fields = [
      { id: 'clientName',    label: 'name' },
      { id: 'clientPhone',   label: 'phone number' },
      { id: 'clientService', label: 'service' },
      { id: 'clientAddress', label: 'address' },
    ];

    // Clear previous errors
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    fields.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.classList.add('error');
        el.addEventListener('input', () => el.classList.remove('error'), { once: true });
        valid = false;
      }
    });

    // Email format check (optional field)
    const emailEl = document.getElementById('clientEmail');
    if (emailEl.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
      emailEl.classList.add('error');
      emailEl.addEventListener('input', () => emailEl.classList.remove('error'), { once: true });
      valid = false;
    }

    if (!valid) {
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
    }
    return valid;
  }

  function saveBookingLocally(data) {
    // [INTEGRATION] This is a local-only fallback.
    // Remove or replace when connecting to a real backend.
    try {
      const existing = JSON.parse(localStorage.getItem('swanson_bookings') || '[]');
      existing.push(data);
      localStorage.setItem('swanson_bookings', JSON.stringify(existing));
    } catch (err) {
      console.warn('localStorage unavailable:', err);
    }
  }

  function showConfirmation(data) {
    const detailsEl = document.getElementById('confirmationDetails');
    detailsEl.innerHTML = `
      <div><strong>Date:</strong> <span>${friendlyDate(data.date)}</span></div>
      <div><strong>Time:</strong> <span>${data.time}</span></div>
      <div><strong>Service:</strong> <span>${data.service}</span></div>
      <div><strong>Name:</strong> <span>${data.name}</span></div>
      <div><strong>Phone:</strong> <span>${data.phone}</span></div>
      ${data.address ? `<div><strong>Address:</strong> <span>${data.address}</span></div>` : ''}
    `;

    setStep('conf');

    // Update step indicators for confirmation
    stepsBar.querySelectorAll('.booking-step').forEach(s => s.classList.add('complete'));
  }

  // ── Init ────────────────────────────────────────
  function init() {
    renderCalendar();
    setStep(1);
  }

  return { init };

})();

})(); } // end legacy custom calendar block

BookingCalendar.init();
