/* ========================================
   Name Gate (first visit) + Greeting/Chip
   ======================================== */
const greetingEl = document.getElementById('greetingText');
const userChip = document.getElementById('userChip');
const changeNameBtn = document.getElementById('changeName');

const gate = document.getElementById('nameGate');
const gateForm = document.getElementById('nameGateForm');
const nameInput = document.getElementById('nameInput');

function updateGreetingAndChip() {
  const hour = new Date().getHours();
  const base = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const name = localStorage.getItem('username') || 'there';
  if (greetingEl) greetingEl.textContent = `${base}, ${name}! 👋`;
  if (userChip) userChip.textContent = `Hi, ${name}`;
}

// Show gate if no name yet
(function initGate(){
  const saved = localStorage.getItem('username');
  if (!saved) {
    gate?.classList.add('show');
    setTimeout(()=> nameInput?.focus(), 50);
  } else {
    updateGreetingAndChip();
  }
})();

// Submit name
gateForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = (nameInput?.value || '').trim();
  if (!value) return;
  localStorage.setItem('username', value);
  gate?.classList.remove('show');
  updateGreetingAndChip();
  nameInput.value = '';
});

// Change name later
changeNameBtn?.addEventListener('click', () => {
  const current = localStorage.getItem('username') || '';
  const input = prompt('Update your name:', current);
  if (input !== null) {
    const v = input.trim();
    if (v) {
      localStorage.setItem('username', v);
      updateGreetingAndChip();
    }
  }
});

/* =========================
   Theme Toggle (persisted)
   ========================= */
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme'); // 'dark' | 'light'
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark-mode');
  themeBtn && (themeBtn.textContent = '☀️');
} else {
  themeBtn && (themeBtn.textContent = '🌙');
}
themeBtn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');
  const isDark = document.documentElement.classList.contains('dark-mode');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* =========================
   Quote API (with fallback)
   ========================= */
const quoteText = document.getElementById('quoteText');
const quoteSpinner = document.getElementById('quoteSpinner');
const quoteError = document.getElementById('quoteError');
const retryBtn = document.getElementById('retryQuote');

const QUOTE_SOURCES = [
  { url: 'https://api.quotable.io/random',  pick: d => `“${d.content}” — ${d.author}` },
  { url: 'https://dummyjson.com/quotes/random', pick: d => `“${d.quote}” — ${d.author}` },
  { url: 'https://zenquotes.io/api/random', pick: arr => { const d = Array.isArray(arr) ? arr[0] : arr; return `“${d.q}” — ${d.a}`; } },
];
function fetchWithTimeout(resource, options = {}) {
  const { timeout = 7000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(resource, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(id));
}
async function loadQuote() {
  if (quoteSpinner) quoteSpinner.style.display = 'inline-block';
  quoteError?.classList.add('hidden');
  if (quoteText) quoteText.textContent = 'Loading quote…';
  for (const src of QUOTE_SOURCES) {
    try {
      const res = await fetchWithTimeout(src.url, { cache: 'no-store', timeout: 7000 });
      if (!res.ok) throw new Error('Network');
      const data = await res.json();
      const text = src.pick(data);
      if (quoteText) quoteText.textContent = text;
      if (quoteSpinner) quoteSpinner.style.display = 'none';
      return;
    } catch {}
  }
  if (quoteSpinner) quoteSpinner.style.display = 'none';
  if (quoteText) quoteText.textContent = '';
  quoteError?.classList.remove('hidden');
}
retryBtn?.addEventListener('click', loadQuote);
loadQuote();

/* =========================
   Projects (filter/search/sort)
   ========================= */
const projects = [
  { title:'CLUBZONE Platform', category:'Web', date:'2025-01-10', img:'assets/club.png',
    summary:'A web platform to manage and join student clubs.',
    details:'Built as part of SWE206. I focused on UI design and improving UX flows.' },
  { title:'Online Gaming Data Analysis', category:'Data', date:'2024-04-01', img:'assets/online.png',
    summary:'Collected and analyzed player data with visual insights.',
    details:'Part of COE292. I practiced data handling, visualization, and teamwork.' },
  { title:'Saudi Electricity Investment Presentation', category:'Presentation', date:'2024-05-16', img:'assets/elec.png',
    summary:'English 102 presentation on investment benefits.',
    details:'Improved my research, academic writing, and presentation skills.' },
];

const listEl = document.getElementById('projectsList');
const emptyEl = document.getElementById('emptyState');
const chips = [...document.querySelectorAll('.chip')];
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

let activeFilter = 'all';
let query = '';
let sortBy = 'date-desc';

function compare(a, b) {
  if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
  if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
  if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
  if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
  return 0;
}
function match(p) {
  const passFilter = activeFilter === 'all' || p.category === activeFilter;
  const q = query.trim().toLowerCase();
  const passSearch = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
  return passFilter && passSearch;
}
function render() {
  if (!listEl || !emptyEl) return;
  const filtered = projects.filter(match).sort(compare);
  listEl.innerHTML = '';
  if (filtered.length === 0) {
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');
  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card fade-in';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <div class="project-body">
        <h3>${p.title}</h3>
        <div class="project-meta">${p.category} • ${new Date(p.date).toLocaleDateString()}</div>
        <p>${p.summary}</p>
        <details>
          <summary>Details</summary>
          <p>${p.details}</p>
        </details>
      </div>
    `;
    listEl.appendChild(card);
  });
}
chips.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    render();
  });
});
searchInput?.addEventListener('input', e=>{
  query = e.target.value;
  render();
});
sortSelect?.addEventListener('change', e=>{
  sortBy = e.target.value;
  render();
});
render();

/* =========================
   Back-to-Top + Smooth anchors
   ========================= */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (backToTopBtn) backToTopBtn.style.display = y > 200 ? 'block' : 'none';
});
backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id && id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
