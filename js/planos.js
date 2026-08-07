const Store = { get(k, d = null) { try { return JSON.parse(localStorage.getItem(k)) || d } catch { return d } }, set(k, v) { localStorage.setItem(k, JSON.stringify(v)) }, remove(k) { localStorage.removeItem(k) } };
const Auth = { current() { return Store.get('bookly_currentUser') }, isLoggedIn() { return !!this.current() }, logout() { Store.remove('bookly_currentUser'); window.location.href = 'index.html' } };
if (!Auth.isLoggedIn()) window.location.href = 'login.html';
const user = Auth.current();

function initDarkMode() { if (Store.get('bookly_darkMode', false)) document.documentElement.setAttribute('data-theme', 'dark') }
function toggleDarkMode() { const i = document.documentElement.getAttribute('data-theme') === 'dark'; if (i) { document.documentElement.removeAttribute('data-theme'); Store.set('bookly_darkMode', false) } else { document.documentElement.setAttribute('data-theme', 'dark'); Store.set('bookly_darkMode', true) } buildNavbar(); buildMobileMenu() }
function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('open'); document.querySelector('.menu-overlay').classList.toggle('show'); document.querySelector('.hamburger')?.classList.toggle('open') }
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); document.querySelector('.menu-overlay').classList.remove('show'); document.querySelector('.hamburger')?.classList.remove('open') }
function showNotification(msg, color = 'var(--verde)') { const e = document.querySelector('.notification'); if (e) e.remove(); const n = document.createElement('div'); n.className = 'notification'; n.style.borderLeft = `3px solid ${color}`; n.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${msg}`; document.body.appendChild(n); setTimeout(() => { n.style.opacity = '0'; n.style.transform = 'translateY(8px)'; setTimeout(() => n.remove(), 300) }, 2500) }

function buildNavbar() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const di = isDark ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    document.getElementById('navbar').innerHTML = `
    <a href="explorar.html" class="logo">
  <img src="logo.png" alt="Bookly" style="height:80px;width:auto;object-fit:contain;">
</a>
    <div class="nav-links">
    <div class="nav-spacer"></div>
    <div class="nav-actions">
      <a href="cadastrar-livro.html" class="btn btn-outline" style="font-size:0.78rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Vender livro</a>
      <button class="nav-btn-icon" onclick="toggleDarkMode()">${di}</button>
      <div class="user-badge"><div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div><span class="user-name">${user.name.split(' ')[0]}</span></div>
      <a href="#" onclick="Auth.logout();return false;" class="btn btn-danger">Sair</a>
      <button class="hamburger" onclick="toggleMobileMenu()"><span></span><span></span><span></span></button>
    </div>`;
}

function buildMobileMenu() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const di = isDark ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    document.getElementById('mobile-menu').innerHTML = `
    <div class="mobile-menu-header"><a href="explorar.html" class="logo"><div class="logo-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><span>Bookly</span></a><button class="mobile-menu-close" onclick="closeMobileMenu()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
    <div class="mobile-menu-user"><div class="mobile-menu-user-avatar">${user.name.charAt(0).toUpperCase()}</div><div class="mobile-menu-user-info"><div class="mobile-menu-user-name">${user.name}</div><div class="mobile-menu-user-email">${user.email}</div></div></div>
    <a href="explorar.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Explorar livros</a>
    <a href="cadastrar-livro.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Vender livro</a>
    <a href="explorar.html?tab=meus" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Meus anúncios</a>
    <a href="planos.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/></svg>Planos</a>
    <div class="mobile-menu-divider"></div>
    <a href="#" class="mobile-menu-item" onclick="toggleDarkMode();return false;">${di}Tema escuro/claro</a>
    <a href="#" class="mobile-menu-item" style="color:var(--vermelho)" onclick="Auth.logout();return false;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sair da conta</a>`;
}

function selectPlan(name, price, color) {
    const colors = { blue: 'var(--azul)', green: 'var(--verde)', purple: 'var(--roxo)' };
    const c = colors[color] || colors.blue;
    const btn = event.currentTarget;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => { btn.style.transform = ''; }, 150);
    showNotification(`Plano ${name} selecionado — R$ ${price.toFixed(2).replace('.', ',')}/mês`, c);
}

initDarkMode();
buildNavbar();
buildMobileMenu();