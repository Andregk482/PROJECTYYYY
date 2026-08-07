// ===== STORAGE =====
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

// ===== SE JÁ LOGADO, REDIRECIONAR =====
if (Auth.isLoggedIn()) window.location.href = 'explorar.html';

// ===== DARK MODE =====
function initDarkMode() { if (Store.get('bookly_darkMode', false)) document.documentElement.setAttribute('data-theme', 'dark'); }
function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) { document.documentElement.removeAttribute('data-theme'); Store.set('bookly_darkMode', false); }
  else { document.documentElement.setAttribute('data-theme', 'dark'); Store.set('bookly_darkMode', true); }
  buildNavbar();
}

// ===== MOBILE MENU =====
function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('open'); document.querySelector('.menu-overlay').classList.toggle('show'); document.querySelector('.hamburger')?.classList.toggle('open'); }
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); document.querySelector('.menu-overlay').classList.remove('show'); document.querySelector('.hamburger')?.classList.remove('open'); }

function buildNavbar() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const darkIcon = isDark
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  document.getElementById('navbar').innerHTML = `
    <a href="explorar.html" class="logo">
  <img src="logo.png" alt="Bookly" style="height:80px;width:auto;object-fit:contain;">
</a>
    <div class="nav-spacer"></div>
    <div class="nav-actions">
      <button class="nav-btn-icon" onclick="toggleDarkMode()">${darkIcon}</button>
      <a href="login.html" class="btn btn-outline">Entrar</a>
      <a href="cadastro.html" class="btn btn-fill">Cadastrar</a>
      <button class="hamburger" onclick="toggleMobileMenu()"><span></span><span></span><span></span></button>
    </div>`;

  document.getElementById('mobile-menu').innerHTML = `
    <div class="mobile-menu-header"><a href="index.html" class="logo"><div class="logo-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><span>Bookly</span></a><button class="mobile-menu-close" onclick="closeMobileMenu()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
    <a href="login.html" class="mobile-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>Entrar</a>
    <a href="cadastro.html" class="mobile-menu-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>Criar conta grátis</a>
    <div class="mobile-menu-divider"></div>
    <a href="index.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Página inicial</a>
    <a href="#" class="mobile-menu-item" onclick="toggleDarkMode();return false;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>Modo escuro/claro</a>`;
}

// ===== PASSWORD TOGGLE =====
function togglePassword() {
  const input = document.getElementById('password');
  const icon = document.getElementById('toggle-pwd');
  if (input.type === 'password') { input.type = 'text'; icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'; }
  else { input.type = 'password'; icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'; }
}

// ===== PASSWORD STRENGTH =====
function checkStrength(pwd) {
  const fill = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const levels = [
    { w: '0%', c: 'var(--border)', l: '' },
    { w: '25%', c: 'var(--vermelho)', l: 'Fraca' },
    { w: '50%', c: 'var(--dourado)', l: 'Média' },
    { w: '75%', c: 'var(--azul)', l: 'Boa' },
    { w: '100%', c: 'var(--verde)', l: 'Forte' }
  ];
  const level = levels[Math.min(score, 4)];
  fill.style.width = level.w;
  fill.style.background = level.c;
  label.textContent = level.l;
  label.style.color = level.c;
}

// ===== NOTIFICATION =====
function showNotification(msg, color = 'var(--verde)') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  const n = document.createElement('div');
  n.className = 'notification';
  n.style.borderLeft = `3px solid ${color}`;
  n.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${msg}`;
  document.body.appendChild(n);
  setTimeout(() => { n.style.opacity = '0'; n.style.transform = 'translateY(10px)'; setTimeout(() => n.remove(), 300); }, 2500);
}

// ===== SIGNUP =====
function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const errEl = document.getElementById('error-msg');
  const errText = document.getElementById('error-text');

  const users = Store.get('bookly_users', []);
  if (users.some(u => u.email === email)) {
    errText.textContent = 'Este e-mail já está cadastrado. Tente entrar.';
    errEl.classList.add('show');
    return false;
  }

  const newUser = { id: 'u_' + Date.now(), name, email, password, createdAt: new Date().toISOString(), plan: null };
  users.push(newUser);
  Store.set('bookly_users', users);
  Store.set('bookly_currentUser', { id: newUser.id, name, email, plan: null });

  const btn = document.querySelector('.btn-block');
  btn.textContent = 'Criando conta...';
  btn.style.opacity = '0.7';

  showNotification(`Conta criada! Bem-vindo, ${name}!`);
  setTimeout(() => window.location.href = 'explorar.html', 1200);
  return false;
}

// ===== FLOAT ELEMENTS ENTRANCE =====
window.addEventListener('load', () => {
  document.querySelectorAll('.float-3d').forEach((el, i) => {
    el.style.opacity = '0';
    setTimeout(() => { el.style.transition = 'opacity 1s ease'; el.style.opacity = ''; }, 300 + i * 150);
  });
});

// ===== INIT =====
initDarkMode();
buildNavbar();