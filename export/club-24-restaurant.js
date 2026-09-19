const menuData = {
  loved: [
    ['Club 24 Special Thali', 'A generous plate for the whole mood', '₹320', true],
    ['Masala Dosa', 'Crisp-edged, soft-centred, proper comfort', '₹180'],
    ['Paneer Butter Masala', 'Silky gravy, charred paneer, warm spices', '₹240'],
    ['Kesar Peda', 'A little saffron sweetness after the meal', '₹160'],
  ],
  tawa: [
    ['Masala Dosa', 'Crisp-edged, soft-centred, proper comfort', '₹180'],
    ['Plain Dosa', 'Golden, thin, with sambar on the side', '₹140'],
    ['Chole Bhature', 'Big flavours, made for a hungry table', '₹210'],
    ['Idli Sambar', 'Soft, warm, and exactly right', '₹130'],
  ],
  sweets: [
    ['Sonpapdi / Sonpatisha', 'Feathery layers, a Club 24 favourite', '₹120'],
    ['Kesar Peda', 'Milk, saffron, and a fragrant finish', '₹160'],
    ['Jalebi', 'Glossy, hot, and worth the napkin', '₹110'],
    ['Motichoor Laddoo', 'Tender, festive, never too much', '₹140'],
  ],
};

const reviews = [
  {
    quote: 'The kind of place you recommend without thinking twice. The thali is generous, the sweets are fresh, and the pricing feels wonderfully fair.',
    name: 'A regular at the table',
    detail: 'On the thali & value',
  },
  {
    quote: 'Came for dosa, left with Sonpapdi and a plan to return. Warm hospitality makes this feel like a neighbourhood secret everyone already knows.',
    name: 'A hungry traveller',
    detail: 'On dosa & sweets',
  },
  {
    quote: 'Parking nearby, food coming quickly, and an owner who notices his guests. Club 24 does the simple things with a lot of heart.',
    name: 'A family evening',
    detail: 'On welcome & ease',
  },
];

const menuList = document.querySelector('#menu-list');
const reviewQuote = document.querySelector('#review-quote');
const reviewName = document.querySelector('#review-name');
const reviewDetail = document.querySelector('#review-detail');
const reviewCount = document.querySelector('#review-count');
const mobileNav = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('.menu-toggle');
const galleryModal = document.querySelector('#gallery-modal');
let reviewIndex = 0;

function renderMenu(category) {
  menuList.innerHTML = menuData[category].map(([name, note, price, featured]) => `
    <article class="menu-item">
      <div>
        <h3>${name}${featured ? '<span class="pick">HOUSE PICK</span>' : ''}</h3>
        <p>${note}</p>
      </div>
      <span class="menu-item-price">${price}</span>
    </article>
  `).join('');
}

function renderReview() {
  const review = reviews[reviewIndex];
  reviewQuote.textContent = `“${review.quote}”`;
  reviewName.textContent = review.name;
  reviewDetail.textContent = review.detail;
  reviewCount.textContent = `${String(reviewIndex + 1).padStart(2, '0')} / ${String(reviews.length).padStart(2, '0')}`;
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

document.querySelectorAll('.menu-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.menu-tabs button').forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    renderMenu(button.dataset.category);
  });
});

document.querySelector('#next-review').addEventListener('click', () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  renderReview();
});

document.querySelector('#previous-review').addEventListener('click', () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  renderReview();
});

menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', closeMobileNav));

function openGallery() {
  galleryModal.hidden = false;
  document.body.classList.add('modal-open');
  document.querySelector('#close-gallery').focus();
}

function closeGallery() {
  galleryModal.hidden = true;
  document.body.classList.remove('modal-open');
}

document.querySelector('#open-gallery').addEventListener('click', openGallery);
document.querySelector('#close-gallery').addEventListener('click', closeGallery);
galleryModal.addEventListener('click', (event) => {
  if (event.target === galleryModal) closeGallery();
});
document.querySelector('#modal-menu-link').addEventListener('click', closeGallery);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeGallery();
    closeMobileNav();
  }
});

renderMenu('loved');
renderReview();