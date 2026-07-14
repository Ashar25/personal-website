// ===== Left-edge side nav =====
const sideNav = document.querySelector('.side-nav');
const sideHandle = document.querySelector('.side-nav-handle');
const sideClose = document.querySelector('.side-nav-close');

let closeTimer;
function openSideNav(){
  clearTimeout(closeTimer);
  if(sideNav) sideNav.classList.add('open');
}
function closeSideNav(){
  if(sideNav) sideNav.classList.remove('open');
}
function deferCloseSideNav(){
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closeSideNav, 220);
}

if(sideNav){
  // Mouse-near-left-edge opens the nav
  document.addEventListener('mousemove', (e) => {
    if(e.clientX <= 22) openSideNav();
  });
  sideNav.addEventListener('mouseenter', openSideNav);
  sideNav.addEventListener('mouseleave', deferCloseSideNav);
}
if(sideHandle){
  sideHandle.addEventListener('mouseenter', openSideNav);
  sideHandle.addEventListener('click', openSideNav);
}
if(sideClose) sideClose.addEventListener('click', closeSideNav);
document.addEventListener('keydown', e => { if(e.key==='Escape') closeSideNav(); });
document.querySelectorAll('.side-nav a').forEach(a => a.addEventListener('click', closeSideNav));

// ===== Scrolled bar =====
const bar = document.querySelector('.bar');
window.addEventListener('scroll', () => {
  if(bar) bar.classList.toggle('scrolled', window.scrollY > 50);
}, {passive:true});

// ===== Rain (hero only) =====
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hero = document.querySelector('.hero');
  if(!hero) return;
  const N = 70;
  for(let i=0; i<N; i++){
    const d = document.createElement('span');
    d.className = 'raindrop';
    d.style.left = Math.random()*100 + '%';
    d.style.height = (14 + Math.random()*28) + 'px';
    d.style.animationDuration = (0.9 + Math.random()*1.5) + 's';
    d.style.animationDelay = (Math.random()*4) + 's';
    d.style.opacity = 0.3 + Math.random()*0.5;
    hero.appendChild(d);
  }
})();

// ===== Publications search =====
(function(){
  const wrap = document.querySelector('.pub-search');
  const input = document.querySelector('#pubSearch');
  const clearBtn = document.querySelector('.pub-search-clear');
  const empty = document.querySelector('.pub-empty');
  if(!input) return;

  const pubs = Array.from(document.querySelectorAll('.pub'));
  const groups = Array.from(document.querySelectorAll('.pub-group'));

  function apply(){
    const q = input.value.trim().toLowerCase();
    wrap.classList.toggle('has-value', q.length > 0);

    let anyMatch = false;
    pubs.forEach(p => {
      const title = (p.querySelector('.pub-title')?.textContent || '').toLowerCase();
      const match = !q || title.includes(q);
      p.hidden = !match;
      if(match) anyMatch = true;
    });

    groups.forEach(g => {
      const visible = g.querySelectorAll('.pub:not([hidden])').length;
      g.hidden = visible === 0;
    });

    if(empty) empty.hidden = !q || anyMatch;
  }

  input.addEventListener('input', apply);
  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      apply();
    });
  }
})();

// ===== Active link highlight =====
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.side-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path || (path==='' && href==='index.html')) a.classList.add('active');
  });
})();
