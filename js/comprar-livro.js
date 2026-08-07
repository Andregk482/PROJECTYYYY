const Store = { get(k,d=null){try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}}, set(k,v){localStorage.setItem(k,JSON.stringify(v))}, remove(k){localStorage.removeItem(k)} };
const Auth = { current(){return Store.get('bookly_currentUser')}, isLoggedIn(){return!!this.current()}, logout(){Store.remove('bookly_currentUser');window.location.href='index.html'} };
if (!Auth.isLoggedIn()) window.location.href = 'login.html';
const user = Auth.current();

const seedBooks = [
  { id:'seed_0', userId:'seed_user', userName:'Bookly', foto:null, titulo:'O sagrado das sombras', autores:'Morgana Marques', editora:'Editora Dark', genero:'Romance', categoria:'Literatura', ano:'15/03/22', isbn:'978-65-1234-567-8', hasISBN:true, estado:'Semi-novo', encadernacao:'Brochura', quantidade:1, atributos:['Primeira edição'], observacoes:'Leve desgaste na capa.', preco:49.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*5).toISOString() },
  { id:'seed_1', userId:'seed_user', userName:'Bookly', foto:null, titulo:'O entregador de bonecos', autores:'D. Lacerda', editora:'Aleph', genero:'Terror', categoria:'Literatura', ano:'20/09/21', isbn:'978-85-7777-222-1', hasISBN:true, estado:'Novo', encadernacao:'Capadura', quantidade:1, atributos:['Cópia Assinada'], observacoes:'Livro novo lacrado.', preco:67.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*3).toISOString() },
  { id:'seed_2', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Moby Dick', autores:'Herman Melville', editora:'Penguin', genero:'Ficção científica', categoria:'Literatura', ano:'10/01/20', isbn:'978-85-6666-111-0', hasISBN:true, estado:'Usado', encadernacao:'Brochura', quantidade:1, atributos:['Vintage'], observacoes:'Páginas amareladas.', preco:78.90, idioma:'Inglês', createdAt:new Date(Date.now()-86400000*7).toISOString() },
  { id:'seed_3', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Dom Quixote', autores:'Miguel de Cervantes', editora:'Martin Claret', genero:'Fantasia', categoria:'Literatura', ano:'05/11/19', isbn:'978-85-4444-333-2', hasISBN:true, estado:'Semi-novo', encadernacao:'Capadura', quantidade:1, atributos:['Antiguidade'], observacoes:'Edição especial.', preco:119.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*10).toISOString() },
  { id:'seed_4', userId:'seed_user', userName:'Bookly', foto:null, titulo:'A volta ao mundo', autores:'Júlio Verne', editora:'L&PM', genero:'Fantasia', categoria:'Literatura', ano:'12/07/18', isbn:'978-85-2222-444-3', hasISBN:true, estado:'Usado', encadernacao:'Brochura', quantidade:1, atributos:[], observacoes:'', preco:54.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*15).toISOString() },
  { id:'seed_5', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Crime e Castigo', autores:'Fiódor Dostoiévski', editora:'34', genero:'Ficção científica', categoria:'Literatura', ano:'22/04/21', isbn:'978-85-9999-555-4', hasISBN:true, estado:'Semi-novo', encadernacao:'Capadura', quantidade:1, atributos:['Impresso Limitada'], observacoes:'Edição limitada.', preco:89.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*2).toISOString() },
];
const coverColors = ['cover-1','cover-2','cover-3','cover-4','cover-5','cover-6','cover-7','cover-8'];
function getAllBooks() { let b = Store.get('bookly_books', []); seedBooks.forEach(s => { if (!b.find(x => x.id === s.id)) b.push(s); }); return b; }

function initDarkMode(){if(Store.get('bookly_darkMode',false))document.documentElement.setAttribute('data-theme','dark')}
function toggleDarkMode(){const i=document.documentElement.getAttribute('data-theme')==='dark';if(i){document.documentElement.removeAttribute('data-theme');Store.set('bookly_darkMode',false)}else{document.documentElement.setAttribute('data-theme','dark');Store.set('bookly_darkMode',true)}buildNavbar();buildMobileMenu()}
function toggleMobileMenu(){document.getElementById('mobile-menu').classList.toggle('open');document.querySelector('.menu-overlay').classList.toggle('show');document.querySelector('.hamburger')?.classList.toggle('open')}
function closeMobileMenu(){document.getElementById('mobile-menu').classList.remove('open');document.querySelector('.menu-overlay').classList.remove('show');document.querySelector('.hamburger')?.classList.remove('open')}
function showNotification(msg,color='var(--verde)'){const e=document.querySelector('.notification');if(e)e.remove();const n=document.createElement('div');n.className='notification';n.style.borderLeft=`3px solid ${color}`;n.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${msg}`;document.body.appendChild(n);setTimeout(()=>{n.style.opacity='0';n.style.transform='translateY(8px)';setTimeout(()=>n.remove(),300)},2500)}

function buildNavbar(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  const di=isDark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  document.getElementById('navbar').innerHTML=`
    <a href="explorar.html" class="logo">
  <img src="logo.png" alt="Bookly" style="height:80px;width:auto;object-fit:contain;">
</a>
    <div class="nav-spacer"></div>
    <div class="nav-actions">
      <a href="cadastrar-livro.html" class="btn btn-outline" style="font-size:0.78rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Vender livro</a>
      <button class="nav-btn-icon" onclick="toggleDarkMode()">${di}</button>
      <div class="user-badge"><div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div><span class="user-name">${user.name.split(' ')[0]}</span></div>
      <a href="#" onclick="Auth.logout();return false;" class="btn btn-danger">Sair</a>
      <button class="hamburger" onclick="toggleMobileMenu()"><span></span><span></span><span></span></button>
    </div>`;
}

function buildMobileMenu(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  const di=isDark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  document.getElementById('mobile-menu').innerHTML=`
    <div class="mobile-menu-header"><a href="explorar.html" class="logo"><div class="logo-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><span>Bookly</span></a><button class="mobile-menu-close" onclick="closeMobileMenu()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
    <div class="mobile-menu-user"><div class="mobile-menu-user-avatar">${user.name.charAt(0).toUpperCase()}</div><div class="mobile-menu-user-info"><div class="mobile-menu-user-name">${user.name}</div><div class="mobile-menu-user-email">${user.email}</div></div></div>
    <a href="explorar.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Explorar livros</a>
    <a href="cadastrar-livro.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Vender livro</a>
    <a href="explorar.html?tab=meus" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Meus anúncios</a>
    <a href="planos.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/></svg>Planos</a>
    <div class="mobile-menu-divider"></div>
    <a href="#" class="mobile-menu-item" onclick="toggleDarkMode();return false;">${di}Tema escuro/claro</a>
    <a href="#" class="mobile-menu-item" style="color:var(--vermelho)" onclick="Auth.logout();return false;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sair da conta</a>`;
}

// ===== LOAD BOOK =====
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');
const allBooks = getAllBooks();
const book = allBooks.find(b => b.id === bookId);

if (!book) { window.location.href = 'explorar.html'; }

const colorClass = coverColors[book.id.charCodeAt(book.id.length-1) % coverColors.length];
const coverHTML = book.foto ? `<div class="summary-cover"><img src="${book.foto}" alt="${book.titulo}"></div>` : `<div class="summary-cover ${colorClass}"><svg class="summary-cover-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>`;

let currentRating = 0;
let timerInterval = null, timerSeconds = 900;

function renderPaymentStep() {
  document.getElementById('main-content').innerHTML = `
    <div class="pay-card">
      <div class="pay-header"><h1>Finalizar compra</h1><p>Complete a compra do seu livro</p></div>
      <div class="book-summary">${coverHTML}<div class="summary-info"><div class="summary-title">${book.titulo}</div><div class="summary-author">${book.autores || 'Autor'}</div><div class="summary-price">R$ ${book.preco.toFixed(2).replace('.', ',')}</div></div></div>
      <div class="section-label">Forma de pagamento</div>
      <button class="method-btn active" data-method="pix" onclick="selectMethod(this)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg><div><div class="method-name">PIX</div><div class="method-desc">Aprovação imediata</div></div><div class="method-check"></div></button>
      <button class="method-btn" data-method="cartao" onclick="selectMethod(this)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg><div><div class="method-name">Cartão de crédito</div><div class="method-desc">Visa, Master, Elo</div></div><div class="method-check"></div></button>

      <div class="pix-area" id="pix-area">
        <div class="pix-box">
          <div class="qr-code"><svg viewBox="0 0 100 100" width="160" height="160"><rect width="100" height="100" fill="white"/><g fill="#0F172A"><rect x="5" y="5" width="20" height="20"/><rect x="10" y="10" width="10" height="10" fill="white"/><rect x="12" y="12" width="6" height="6"/><rect x="75" y="5" width="20" height="20"/><rect x="80" y="10" width="10" height="10" fill="white"/><rect x="82" y="12" width="6" height="6"/><rect x="5" y="75" width="20" height="20"/><rect x="10" y="80" width="10" height="10" fill="white"/><rect x="12" y="82" width="6" height="6"/><rect x="30" y="5" width="5" height="5"/><rect x="40" y="5" width="5" height="5"/><rect x="50" y="10" width="5" height="5"/><rect x="60" y="5" width="5" height="5"/><rect x="30" y="15" width="5" height="5"/><rect x="45" y="15" width="5" height="5"/><rect x="55" y="20" width="5" height="5"/><rect x="5" y="30" width="5" height="5"/><rect x="15" y="35" width="5" height="5"/><rect x="25" y="30" width="5" height="5"/><rect x="35" y="35" width="5" height="5"/><rect x="45" y="30" width="5" height="5"/><rect x="55" y="35" width="5" height="5"/><rect x="65" y="30" width="5" height="5"/><rect x="75" y="35" width="5" height="5"/><rect x="85" y="30" width="5" height="5"/><rect x="10" y="45" width="5" height="5"/><rect x="20" y="50" width="5" height="5"/><rect x="30" y="45" width="5" height="5"/><rect x="40" y="50" width="5" height="5"/><rect x="50" y="45" width="5" height="5"/><rect x="60" y="50" width="5" height="5"/><rect x="70" y="45" width="5" height="5"/><rect x="80" y="50" width="5" height="5"/><rect x="90" y="45" width="5" height="5"/><rect x="5" y="60" width="5" height="5"/><rect x="15" y="65" width="5" height="5"/><rect x="25" y="60" width="5" height="5"/><rect x="35" y="65" width="5" height="5"/><rect x="45" y="60" width="5" height="5"/><rect x="55" y="65" width="5" height="5"/><rect x="65" y="60" width="5" height="5"/><rect x="75" y="65" width="5" height="5"/><rect x="85" y="60" width="5" height="5"/><rect x="30" y="75" width="5" height="5"/><rect x="40" y="80" width="5" height="5"/><rect x="50" y="75" width="5" height="5"/><rect x="60" y="80" width="5" height="5"/><rect x="70" y="75" width="5" height="5"/><rect x="80" y="80" width="5" height="5"/><rect x="90" y="75" width="5" height="5"/><rect x="35" y="90" width="5" height="5"/><rect x="50" y="85" width="5" height="5"/><rect x="65" y="90" width="5" height="5"/><rect x="80" y="85" width="5" height="5"/></g></svg></div>
          <div class="pix-copy"><div class="pix-copy-label">Código PIX Copia e Cola:</div><div class="pix-copy-code" id="pix-code">00020126580014BR.GOV.BCB.PIX0136bookly-${book.id}5204599953039865802BR5913BOOKLY6009SAO PAULO62070503***6304A1B2</div><button class="btn btn-outline btn-block" onclick="copyPix()">Copiar código</button></div>
        </div>
        <div class="pix-timer"><div class="timer-label">QR Code expira em:</div><div class="timer-value" id="pix-timer">15:00</div></div>
        <button class="btn btn-green btn-block" onclick="completePayment()" style="margin-top:12px;">Já paguei (simular)</button>
      </div>

      <div class="card-form" id="card-area" style="display:none;">
        <div class="field-group"><label class="field-label">Número do cartão</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg><input type="text" id="card-number" placeholder="0000 0000 0000 0000" maxlength="19" oninput="formatCard(this)"></div></div>
        <div class="field-group"><label class="field-label">Nome no cartão</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><input type="text" id="card-name" placeholder="Como está no cartão"></div></div>
        <div style="display:flex;gap:12px;">
          <div class="field-group" style="flex:1;"><label class="field-label">Validade</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg><input type="text" id="card-expiry" placeholder="MM/AA" maxlength="5" oninput="formatExpiry(this)"></div></div>
          <div class="field-group" style="width:100px;"><label class="field-label">CVV</label><div class="input-wrap"><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><input type="text" id="card-cvv" placeholder="123" maxlength="4" oninput="this.value=this.value.replace(/\D/g,'')"></div></div>
        </div>
        <div class="field-group"><label class="field-label">Parcelas</label><div class="input-wrap select"><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18M3 12h18M3 19h18"/></svg><select id="parcelas"><option value="1">1x sem juros</option><option value="2">2x sem juros</option><option value="3">3x sem juros</option><option value="6">6x com juros</option><option value="12">12x com juros</option></select></div></div>
        <button class="btn btn-green btn-block" onclick="processCard()">Pagar com cartão</button>
      </div>

      <div class="total-row"><span class="total-label">Total</span><span class="total-value">R$ ${book.preco.toFixed(2).replace('.', ',')}</span></div>
      <div class="pay-footer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--verde)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Pagamento seguro e criptografado</div>
    </div>`;
  startTimer();
}

function renderRatingStep() {
  document.getElementById('main-content').innerHTML = `
    <div class="pay-card" style="text-align:center;padding:32px 26px;">
      <div style="width:56px;height:56px;margin:0 auto 16px;border-radius:50%;background:var(--verde-claro);display:flex;align-items:center;justify-content:center;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--verde)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h1 style="font-size:1.3rem;font-weight:800;color:var(--text-primary);margin-bottom:4px;">Compra realizada!</h1>
      <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:24px;">Seu pagamento de R$ ${book.preco.toFixed(2).replace('.', ',')} foi confirmado.</p>
    </div>

    <div class="rating-section">
      <div class="rating-header"><h2>Avalie sua compra</h2><p>Como foi sua experiência com "${book.titulo}"?</p></div>
      <div class="stars-input" id="stars-input">
        ${[1,2,3,4,5].map(n => `<svg class="star-input" data-rating="${n}" onclick="setRating(${n})" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
      </div>
      <div class="rating-label" id="rating-label">Selecione uma nota</div>
      <textarea class="rating-textarea" id="review-comment" placeholder="Conte como foi sua experiência com o livro e o vendedor (opcional)..."></textarea>
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button class="btn btn-outline btn-block" onclick="skipRating()">Pular</button>
        <button class="btn btn-green btn-block" onclick="submitRating()">Enviar avaliação</button>
      </div>
    </div>`;
}

function selectMethod(btn) {
  document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const m = btn.dataset.method;
  document.getElementById('pix-area').style.display = m === 'pix' ? 'block' : 'none';
  document.getElementById('card-area').style.display = m === 'cartao' ? 'block' : 'none';
  if (m === 'pix') startTimer();
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerSeconds = 900; updateTimer();
  timerInterval = setInterval(() => { timerSeconds--; if (timerSeconds <= 0) { clearInterval(timerInterval); } updateTimer(); }, 1000);
}
function updateTimer() { const m = Math.floor(timerSeconds / 60), s = timerSeconds % 60; const el = document.getElementById('pix-timer'); if (el) el.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0'); }

function copyPix() {
  const code = document.getElementById('pix-code').textContent;
  navigator.clipboard.writeText(code).then(() => showNotification('Código PIX copiado!')).catch(() => { const ta = document.createElement('textarea'); ta.value = code; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); showNotification('Código PIX copiado!'); });
}

function completePayment() {
  showNotification('Pagamento confirmado!', 'var(--verde)');
  setTimeout(() => renderRatingStep(), 800);
}

function formatCard(input) { let v = input.value.replace(/\D/g, '').slice(0, 16); v = v.match(/.{1,4}/g)?.join(' ') || ''; input.value = v; }
function formatExpiry(input) { let v = input.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); input.value = v; }

function processCard() {
  const num = document.getElementById('card-number').value.replace(/\s/g, '');
  const name = document.getElementById('card-name').value.trim();
  const exp = document.getElementById('card-expiry').value;
  const cvv = document.getElementById('card-cvv').value;
  if (num.length < 16) { showNotification('Número do cartão inválido', 'var(--vermelho)'); return; }
  if (!name) { showNotification('Digite o nome no cartão', 'var(--vermelho)'); return; }
  if (exp.length < 5) { showNotification('Validade inválida', 'var(--vermelho)'); return; }
  if (cvv.length < 3) { showNotification('CVV inválido', 'var(--vermelho)'); return; }
  const btn = document.querySelector('#card-area .btn-green');
  btn.textContent = 'Processando...'; btn.style.opacity = '0.7';
  setTimeout(() => { showNotification('Pagamento aprovado!'); setTimeout(() => renderRatingStep(), 800); }, 2000);
}

// ===== RATING =====
const ratingLabels = ['', 'Muito ruim', 'Ruim', 'Regular', 'Bom', 'Excelente'];

function setRating(n) {
  currentRating = n;
  document.querySelectorAll('.star-input').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.rating) <= n);
  });
  document.getElementById('rating-label').textContent = ratingLabels[n];
}

function submitRating() {
  if (currentRating === 0) { showNotification('Selecione uma nota de 1 a 5 estrelas', 'var(--vermelho)'); return; }
  const comment = document.getElementById('review-comment').value.trim();
  const reviews = Store.get('bookly_reviews', []);
  // Remove existing review from this user for this book (one review per user per book)
  const filtered = reviews.filter(r => !(r.bookId === book.id && r.userId === user.id));
  filtered.push({ bookId: book.id, userId: user.id, userName: user.name, rating: currentRating, comment: comment || 'Sem comentário', date: new Date().toISOString() });
  Store.set('bookly_reviews', filtered);
  showNotification('Avaliação enviada! Obrigado.');
  setTimeout(() => window.location.href = 'explorar.html', 1500);
}

function skipRating() {
  showNotification('Tudo bem! Você pode avaliar depois.');
  setTimeout(() => window.location.href = 'explorar.html', 1000);
}

initDarkMode();
buildNavbar();
buildMobileMenu();
renderPaymentStep();