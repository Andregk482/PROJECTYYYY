const Store = {
  get(key, def = null) { try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; } },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
  remove(key) { localStorage.removeItem(key); }
};
const Auth = {
  current() { return Store.get('bookly_currentUser'); },
  isLoggedIn() { return !!this.current(); },
  logout() { Store.remove('bookly_currentUser'); window.location.href = 'index.html'; }
};

function initDarkMode() { if (Store.get('bookly_darkMode', false)) document.documentElement.setAttribute('data-theme', 'dark'); }
function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) { document.documentElement.removeAttribute('data-theme'); Store.set('bookly_darkMode', false); }
  else { document.documentElement.setAttribute('data-theme', 'dark'); Store.set('bookly_darkMode', true); }
  buildNavbar();
}
function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('open'); document.querySelector('.menu-overlay').classList.toggle('show'); document.querySelector('.hamburger')?.classList.toggle('open'); }
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); document.querySelector('.menu-overlay').classList.remove('show'); document.querySelector('.hamburger')?.classList.remove('open'); }
function showNotification(msg, color = 'var(--verde)') { const e = document.querySelector('.notification'); if (e) e.remove(); const n = document.createElement('div'); n.className = 'notification'; n.style.borderLeft = `3px solid ${color}`; n.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${msg}`; document.body.appendChild(n); setTimeout(() => { n.style.opacity = '0'; n.style.transform = 'translateY(8px)'; setTimeout(() => n.remove(), 300); }, 2500); }

// ===== AQUI ESTÁ O BOTÃO "VENDER LIVRO" JÁ INCLUÍDO =====
function buildNavbar() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const user = Auth.current();
  const darkIcon = isDark
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  let navButtons;
  if (user) {
    navButtons = `
      <a href="cadastrar-livro.html" class="btn btn-outline btn-vender" style="font-size:0.78rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Vender livro
      </a>
      <div class="user-badge"><div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div><span class="user-name">${user.name.split(' ')[0]}</span></div>
      <a href="#" onclick="Auth.logout();return false;" class="btn btn-danger">Sair</a>`;
  } else {
    navButtons = `
      <a href="cadastrar-livro.html" class="btn btn-outline btn-vender" style="font-size:0.78rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Vender livro
      </a>
      <a href="login.html" class="btn btn-outline">Entrar</a>
      <a href="cadastro.html" class="btn btn-primary">Cadastrar</a>`;
  }

  document.getElementById('navbar').innerHTML = `
     <a href="explorar.html" class="logo">
  <img src="logo.png" alt="Bookly" style="height:80px;width:auto;object-fit:contain;">
</a>
    <div class="nav-links">
      <a href="#features" class="nav-link">Recursos</a>
      <a href="#how" class="nav-link">Como funciona</a>
      <a href="planos.html" class="nav-link">Planos</a>
    </div>
    <div class="nav-spacer"></div>
    <div class="nav-actions">
      <button class="nav-btn-icon" onclick="toggleDarkMode()" title="Tema">${darkIcon}</button>
      ${navButtons}
      <button class="hamburger" onclick="toggleMobileMenu()"><span></span><span></span><span></span></button>
    </div>`;

  buildMobileMenu(user, isDark);
}

function buildMobileMenu(user, isDark) {
  const darkIcon = isDark
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  let userSection = '', menuItems = '';
  if (user) {
    userSection = `<div class="mobile-menu-user"><div class="mobile-menu-user-avatar">${user.name.charAt(0).toUpperCase()}</div><div class="mobile-menu-user-info"><div class="mobile-menu-user-name">${user.name}</div><div class="mobile-menu-user-email">${user.email}</div></div></div>`;
    menuItems = `
      <a href="explorar.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Explorar livros</a>
      <a href="cadastrar-livro.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Vender livro</a>
      <a href="explorar.html?tab=meus" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Meus anúncios</a>
      <a href="planos.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/></svg>Planos</a>
      <div class="mobile-menu-divider"></div>
      <a href="#" class="mobile-menu-item" onclick="toggleDarkMode();return false;">${darkIcon}Tema escuro/claro</a>
      <a href="#" class="mobile-menu-item" style="color:var(--vermelho)" onclick="Auth.logout();return false;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sair da conta</a>`;
  } else {
    menuItems = `
      <a href="explorar.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Explorar livros</a>
      <a href="cadastrar-livro.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Vender livro</a>
      <a href="login.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>Entrar</a>
      <a href="cadastro.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>Criar conta grátis</a>
      <div class="mobile-menu-divider"></div>
      <a href="#features" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Recursos</a>
      <a href="#how" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>Como funciona</a>
      <a href="planos.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/></svg>Planos</a>
      <div class="mobile-menu-divider"></div>
      <a href="#" class="mobile-menu-item" onclick="toggleDarkMode();return false;">${darkIcon}Tema escuro/claro</a>`;
  }
  document.getElementById('mobile-menu').innerHTML = `
    <div class="mobile-menu-header"><a href="index.html" class="logo"><div class="logo-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><span>Bookly</span></a><button class="mobile-menu-close" onclick="closeMobileMenu()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
    ${userSection}${menuItems}`;
}

function updateHeroButtons() {
  const user = Auth.current();
  const heroEl = document.getElementById('hero-actions');
  const ctaInner = document.getElementById('cta-inner');
  if (user) {
    heroEl.innerHTML = `<a href="explorar.html" class="btn btn-primary btn-lg">Explorar livros</a><a href="cadastrar-livro.html" class="btn btn-outline btn-lg">Vender livro</a>`;
    ctaInner.innerHTML = `<h2>Bem-vindo de volta, ${user.name.split(' ')[0]}</h2><p>Continue de onde parou — explore o marketplace ou cadastre um novo livro.</p><a href="explorar.html" class="btn btn-primary btn-lg">Ir para o marketplace</a>`;
  } else {
    heroEl.innerHTML = `<a href="cadastro.html" class="btn btn-primary btn-lg">Criar conta grátis</a><a href="login.html" class="btn btn-outline btn-lg">Já tenho conta</a>`;
  }
}

const revealObserver = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

initDarkMode();
buildNavbar();
updateHeroButtons();