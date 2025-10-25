/* =========================
   Dynamic Greeting (LocalStorage)
   ========================= */
const greetingEl = document.getElementById('greetingText');
const editNameBtn = document.getElementById('editName');

function updateGreeting() {
  const hour = new Date().getHours();
  const base = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const savedName = localStorage.getItem('username') || 'there';
  if (greetingEl) greetingEl.textContent = `${base}, ${savedName}! 👋`;
}
updateGreeting();

editNameBtn?.addEventListener('click', () => {
  const current = localStorage.getItem('username') || '';
  const input = prompt('What name should I use?', current);
  if (input !== null) {
    const name = input.trim();
    if (name) {
      localStorage.setItem('username', name);
      updateGreeting();
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
  if (themeBtn) themeBtn.textContent = '☀️';
} else {
  if (themeBtn) themeBtn.textContent = '🌙';
}
themeBtn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');
  const isDark = document.documentElement.classList.contains('dark-mode');
  if (themeBtn) themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* =========================
   Simple Quote API (loading/error/retry)
   ========================= */
const quoteText = document.getElementById('quoteText');
const quoteSpinner = document.getElementById('quoteSpinner');
const quoteError = document.getElementById('quoteError');
const retryBtn = document.getElementById('retryQuote');

async function loadQuote() {
  if (quoteSpinner) quoteSpinner.style.display = 'inline-block';
  quoteError?.classList.add('hidden');
  if (quoteText) quoteText.textContent = 'Loading quote…';
  try {
    const res = await fetch('https://api.quotable.io/random', { cache: 'no-store' });
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (quoteText) quoteText.textContent = `“${data.content}” — ${data.author}`;
  } catch {
    if (quoteText) quoteText.textContent = '';
    quoteError?.classList.remove('hidden');
  } finally {
    if (quoteSpinner) quoteSpinner.style.display = 'none';
  }
}
retryBtn?.addEventListener('click', loadQuote);
loadQuote();

/* =========================
   Projects Data + Rendering (filter/search/sort)
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
      <img src="${p.img}" alt="${p.title}">
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
   Back-to-Top Button
   ========================= */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (backToTopBtn) backToTopBtn.style.display = y > 200 ? 'block' : 'none';
});
backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================
   Contact Form Validation + Feedback
   ========================= */
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setError(field, msg){
  const span = form?.querySelector(`.field-error[data-for="${field}"]`);
  if (span) span.textContent = msg || '';
}
function validateEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  setError('name',''); setError('email',''); setError('message','');
  if (formStatus) formStatus.textContent = '';

  const data = new FormData(form);
  const name = (data.get('name')||'').toString().trim();
  const email = (data.get('email')||'').toString().trim();
  const message = (data.get('message')||'').toString().trim();

  let ok = true;
  if (!name) { setError('name','Please enter your name'); ok=false; }
  if (!email || !validateEmail(email)) { setError('email','Please enter a valid email'); ok=false; }
  if (!message || message.length<10) { setError('message','Message must be at least 10 characters'); ok=false; }

  if (!ok) return;

  if (formStatus) {
    formStatus.textContent = '✅ Thanks! Your message was captured (demo only).';
    formStatus.classList.add('fade-in');
  }
  form.reset();
});

/* =========================
   Smooth scroll for internal links
   ========================= */
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
