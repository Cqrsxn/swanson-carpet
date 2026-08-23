/* ================================================
   SWANSON CARPET & UPHOLSTERY CLEANING
   Reviews data — single source of truth.
   Shared by index.html (homepage previews) and
   reviews.html (full review page).

   To add, edit, or remove a review, update this
   array only. See REVIEWS_GUIDE.md for instructions.
   Use a backtick `template string` for text so
   apostrophes and dashes need no escaping.
   ================================================ */

'use strict';

const REVIEWS = [
  {
    id: 'lori',
    name: 'Lori',
    location: '',
    rating: 5,
    text: `Hiring Swanson Carpet & Upholstery Cleaning was one of the best decisions I've made for my home! As a single mom with a light linen couch that has survived three years of a toddler and a dog, I honestly thought it was beyond saving. After she cleaned it, I was amazed—it looks incredible, and for the first time in a long time I feel proud to have people over.

I also had my area rug cleaned, and was shocked by how much dirt she removed…even though I vacuum several times a week. Seeing the results firsthand was eye-opening.

What truly sets her apart is her integrity and care. I trusted her completely in my home, even when I wasn't there, and she cleaned and treated my items as if they were her own. It's beyond refreshing to work with a small business owner who genuinely cares about doing exceptional work, not just rushing through another appointment. My home looks cleaner, feels fresher, and I KNOW we're breathing in less dust, dander, and allergens because of her work. Absolutely worth every penny!`,
  },
  {
    id: 'isabel-hahn',
    name: 'Isabel Hahn',
    location: '',
    rating: 5,
    text: `Heather has cleaned carpets for me twice now and did a great job both times. Most recently she cleaned my area rug and carpeted stairs, and they came out looking great. She was on time, professional, and worked hard.

She also came out late one evening when my cat had a major accident on my bedroom carpet and nobody else was willing to come that quickly. I really appreciated the fast response and wouldn't hesitate to use her again.`,
  },
  {
    id: 'jessica-hensel',
    name: 'Jessica Hensel',
    location: '',
    rating: 5,
    text: `Heather did an amazing job cleaning my white couches! They had accumulated everyday dirt and stains, and I honestly didn't think they could look this good again. We tried a larger company prior and they could not get them clean! Heather was professional, thorough, and paid close attention to every detail. My couches look fresh, bright, and almost brand new.

She arrived on time, was friendly and knowledgeable, and took great care while working in my home. I was impressed by both the quality of her work and the results. If you're looking for someone reliable who does exceptional upholstery cleaning, I highly recommend Heather. I'll definitely be using her services again!`,
  },
  {
    id: 'joanna-pennino',
    name: 'Joanna Pennino',
    location: 'Beaufort, SC',
    rating: 5,
    text: `Heather went above and beyond in her responsiveness, attention to detail, and professional courtesy. She was quick to tackle the emergency of red wine spilled on an ivory couch. Heather took the trek out to Beaufort with short notice. Upon arrival, she promptly assessed the stain, and diligently went to work to save the family couch. I highly recommend giving Heather a call if you have upholstery in need of a professional cleanup!`,
  },
];

// Make available to plain <script> includes on both pages.
if (typeof window !== 'undefined') {
  window.REVIEWS = REVIEWS;
}

// Build a short preview of a long review for the homepage cards.
// Trims to the nearest word boundary so previews read cleanly.
function reviewPreview(text, maxChars = 200) {
  const oneLine = text.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= maxChars) {
    return { text: oneLine, truncated: false };
  }
  let cut = oneLine.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  return { text: cut.replace(/[.,;:—-]+$/, '') + '…', truncated: true };
}

if (typeof window !== 'undefined') {
  window.reviewPreview = reviewPreview;
}
