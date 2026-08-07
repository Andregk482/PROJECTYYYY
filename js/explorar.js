// ===== STORAGE / AUTH =====
const Store = { get(k,d=null){try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}}, set(k,v){localStorage.setItem(k,JSON.stringify(v))}, remove(k){localStorage.removeItem(k)} };
const Auth = { current(){return Store.get('bookly_currentUser')}, isLoggedIn(){return!!this.current()}, logout(){Store.remove('bookly_currentUser');window.location.href='index.html'} };
if (!Auth.isLoggedIn()) window.location.href = 'login.html';
const user = Auth.current();
const urlParams = new URLSearchParams(window.location.search);
const isMyAds = urlParams.get('tab') === 'meus';

function initDarkMode(){if(Store.get('bookly_darkMode',false))document.documentElement.setAttribute('data-theme','dark')}
function toggleDarkMode(){const i=document.documentElement.getAttribute('data-theme')==='dark';if(i){document.documentElement.removeAttribute('data-theme');Store.set('bookly_darkMode',false)}else{document.documentElement.setAttribute('data-theme','dark');Store.set('bookly_darkMode',true)}buildNavbar();buildMobileMenu()}
function toggleMobileMenu(){document.getElementById('mobile-menu').classList.toggle('open');document.querySelector('.menu-overlay').classList.toggle('show');document.querySelector('.hamburger')?.classList.toggle('open')}
function closeMobileMenu(){document.getElementById('mobile-menu').classList.remove('open');document.querySelector('.menu-overlay').classList.remove('show');document.querySelector('.hamburger')?.classList.remove('open')}
function toggleMobileSidebar(){document.getElementById('sidebar').classList.toggle('mobile-open')}
function showNotification(msg,color='var(--verde)'){const e=document.querySelector('.notification');if(e)e.remove();const n=document.createElement('div');n.className='notification';n.style.borderLeft=`3px solid ${color}`;n.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${msg}`;document.body.appendChild(n);setTimeout(()=>{n.style.opacity='0';n.style.transform='translateY(8px)';setTimeout(()=>n.remove(),300)},2500)}

function buildNavbar(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  const di=isDark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  document.getElementById('navbar').innerHTML=`
    <a href="explorar.html" class="logo">
  <img src="logo.png" alt="Bookly" style="height:80px;width:auto;object-fit:contain;">
</a>
    <div class="search-bar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input type="text" placeholder="Buscar livros, autores, gêneros..." id="search-input" oninput="renderBooks()"><span class="search-kbd">Ctrl K</span></div>
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

// ===== SEED BOOKS =====
const seedBooks = [
  { id:'seed_0', userId:'seed_user', userName:'Bookly', foto:null, titulo:'O sagrado das sombras', autores:'Morgana Marques', editora:'Editora Dark', genero:'Romance', categoria:'Literatura', ano:'15/03/22', isbn:'978-65-1234-567-8', hasISBN:true, estado:'Semi-novo', encadernacao:'Brochura', quantidade:1, atributos:['Primeira edição'], observacoes:'Leve desgaste na capa.', preco:49.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*5).toISOString() },
  { id:'seed_1', userId:'seed_user', userName:'Bookly', foto:null, titulo:'O entregador de bonecos', autores:'D. Lacerda', editora:'Aleph', genero:'Terror', categoria:'Literatura', ano:'20/09/21', isbn:'978-85-7777-222-1', hasISBN:true, estado:'Novo', encadernacao:'Capadura', quantidade:1, atributos:['Cópia Assinada'], observacoes:'Livro novo lacrado.', preco:67.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*3).toISOString() },
  { id:'seed_2', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Moby Dick', autores:'Herman Melville', editora:'Penguin', genero:'Ficção científica', categoria:'Literatura', ano:'10/01/20', isbn:'978-85-6666-111-0', hasISBN:true, estado:'Usado', encadernacao:'Brochura', quantidade:1, atributos:['Vintage'], observacoes:'Páginas amareladas.', preco:78.90, idioma:'Inglês', createdAt:new Date(Date.now()-86400000*7).toISOString() },
  { id:'seed_3', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Dom Quixote', autores:'Miguel de Cervantes', editora:'Martin Claret', genero:'Fantasia', categoria:'Literatura', ano:'05/11/19', isbn:'978-85-4444-333-2', hasISBN:true, estado:'Semi-novo', encadernacao:'Capadura', quantidade:1, atributos:['Antiguidade'], observacoes:'Edição especial.', preco:119.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*10).toISOString() },
  { id:'seed_4', userId:'seed_user', userName:'Bookly', foto:null, titulo:'A volta ao mundo', autores:'Júlio Verne', editora:'L&PM', genero:'Fantasia', categoria:'Literatura', ano:'12/07/18', isbn:'978-85-2222-444-3', hasISBN:true, estado:'Usado', encadernacao:'Brochura', quantidade:1, atributos:[], observacoes:'', preco:54.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*15).toISOString() },
  { id:'seed_5', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Crime e Castigo', autores:'Fiódor Dostoiévski', editora:'34', genero:'Ficção científica', categoria:'Literatura', ano:'22/04/21', isbn:'978-85-9999-555-4', hasISBN:true, estado:'Semi-novo', encadernacao:'Capadura', quantidade:1, atributos:['Impresso Limitada'], observacoes:'Edição limitada.', preco:89.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*2).toISOString() },
];

// ===== SEED REVIEWS =====
const seedReviews = [
  { bookId:'seed_0', userId:'u_demo1', userName:'Carlos S.', rating:5, comment:'Livro em ótimo estado, entrega rápida.', date:new Date(Date.now()-86400000*4).toISOString() },
  { bookId:'seed_0', userId:'u_demo2', userName:'Ana P.', rating:4, comment:'Boa condição, recomendo.', date:new Date(Date.now()-86400000*2).toISOString() },
  { bookId:'seed_1', userId:'u_demo3', userName:'Ricardo M.', rating:5, comment:'Veio autografado, perfeito!', date:new Date(Date.now()-86400000*1).toISOString() },
  { bookId:'seed_3', userId:'u_demo4', userName:'Júlia F.', rating:5, comment:'Edição de colecionador impecável.', date:new Date(Date.now()-86400000*3).toISOString() },
];

function getAllBooks() { let b = Store.get('bookly_books', []); seedBooks.forEach(s => { if (!b.find(x => x.id === s.id)) b.push(s); }); return b; }

// ===== REVIEW SYSTEM =====
function getAllReviews() { let r = Store.get('bookly_reviews', []); seedReviews.forEach(s => { if (!r.find(x => x.bookId === s.bookId && x.userId === s.userId)) r.push(s); }); return r; }

function getBookRating(bookId) {
  const reviews = getAllReviews().filter(r => r.bookId === bookId);
  if (reviews.length === 0) return { avg: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return { avg: sum / reviews.length, count: reviews.length };
}

function countBooksByField(books, field) { const counts = {}; books.forEach(b => { const v = b[field]; if (v) counts[v] = (counts[v] || 0) + 1; }); return counts; }

function buildSidebar() {
  const allBooks = getAllBooks();
  const generoCounts = countBooksByField(allBooks, 'genero');
  const condicaoCounts = countBooksByField(allBooks, 'estado');
  const idiomaCounts = countBooksByField(allBooks, 'idioma');
  const generos = ['Romance','Ficção científica','Fantasia','Biografia','Terror'];
  const condicoes = ['Novo','Semi-novo','Usado','Degradado','Outlet'];
  const idiomas = [['Português (br)','Português (br)'],['Inglês','Inglês'],['Espanhol','Espanhol'],['Francês','Francês'],['Japonês','Japonês']];
  document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-title">Filtros</div>
    <div class="filter-group" data-type="genero">
      <div class="filter-header" onclick="toggleFilterGroup(this)"><span class="filter-label">Gênero</span><svg class="filter-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
      <div class="filter-items">${generos.map(g => `<div class="filter-item" onclick="toggleFilter(this)" data-type="genero" data-value="${g}"><div class="filter-checkbox"></div><span class="filter-name">${g}</span><span class="filter-count">${generoCounts[g]||0}</span></div>`).join('')}</div>
    </div>
    <div class="filter-group" data-type="condicao">
      <div class="filter-header" onclick="toggleFilterGroup(this)"><span class="filter-label">Condição</span><svg class="filter-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
      <div class="filter-items">${condicoes.map(c => `<div class="filter-item" onclick="toggleFilter(this)" data-type="condicao" data-value="${c}"><div class="filter-checkbox"></div><span class="filter-name">${c}</span><span class="filter-count">${condicaoCounts[c]||0}</span></div>`).join('')}</div>
    </div>
    <div class="filter-group" data-type="idioma">
      <div class="filter-header" onclick="toggleFilterGroup(this)"><span class="filter-label">Idioma</span><svg class="filter-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
      <div class="filter-items">${idiomas.map(([v,n]) => `<div class="filter-item" onclick="toggleFilter(this)" data-type="idioma" data-value="${v}"><div class="filter-checkbox"></div><span class="filter-name">${n}</span><span class="filter-count">${idiomaCounts[v]||0}</span></div>`).join('')}</div>
    </div>
    <div class="filter-group" data-type="preco">
      <div class="filter-header" onclick="toggleFilterGroup(this)"><span class="filter-label">Preço (BRL)</span><svg class="filter-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
      <div class="filter-items"><div class="price-range"><span id="price-min">R$ 10</span><span id="price-max">R$ 780</span></div><div class="slider-track" id="slider-track"><div class="slider-fill" id="slider-fill"></div><div class="slider-thumb left" id="thumb-left"></div><div class="slider-thumb right" id="thumb-right"></div></div></div>
    </div>`;
}

let activeFilters = { genero: [], condicao: [], idioma: [] };
function toggleFilter(item) { item.classList.toggle('active'); const type = item.dataset.type, val = item.dataset.value; if (item.classList.contains('active')) { if (!activeFilters[type].includes(val)) activeFilters[type].push(val); } else { activeFilters[type] = activeFilters[type].filter(v => v !== val); } renderBooks(); }
function toggleFilterGroup(header) { header.parentElement.classList.toggle('collapsed'); }

function initSlider() {
  const track = document.getElementById('slider-track'); if (!track) return;
  const thumbs = [document.getElementById('thumb-left'), document.getElementById('thumb-right')];
  const fill = document.getElementById('slider-fill'), minEl = document.getElementById('price-min'), maxEl = document.getElementById('price-max');
  const minPrice = 10, maxPrice = 780; let leftPct = 0, rightPct = 100;
  thumbs.forEach((thumb, idx) => {
    let dragging = false;
    const start = (e) => { dragging = true; e.preventDefault(); };
    const move = (e) => { if (!dragging) return; const rect = track.getBoundingClientRect(), clientX = e.touches ? e.touches[0].clientX : e.clientX; let pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)); if (idx === 0) { leftPct = Math.min(pct, rightPct - 5); thumb.style.left = leftPct + '%'; minEl.textContent = 'R$ ' + Math.round(minPrice + (leftPct/100)*(maxPrice-minPrice)); } else { rightPct = Math.max(pct, leftPct + 5); thumb.style.left = rightPct + '%'; maxEl.textContent = 'R$ ' + Math.round(minPrice + (rightPct/100)*(maxPrice-minPrice)); } fill.style.left = leftPct + '%'; fill.style.right = (100 - rightPct) + '%'; };
    const end = () => { dragging = false; renderBooks(); };
    thumb.addEventListener('mousedown', start); thumb.addEventListener('touchstart', start);
    document.addEventListener('mousemove', move); document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', end); document.addEventListener('touchend', end);
  });
}

const coverColors = ['cover-1','cover-2','cover-3','cover-4','cover-5','cover-6','cover-7','cover-8'];

function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<svg class="star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    else if (i - rating < 1) html += '<svg class="star" viewBox="0 0 24 24" fill="currentColor" opacity="0.5"><defs><linearGradient id="h'+i+'"><stop offset="50%" stop-color="#F6B73C"/><stop offset="50%" stop-color="#E2E8F0"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#h'+i+')"/></svg>';
    else html += '<svg class="star empty" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  return html;
}

function renderBooks() {
  let books = getAllBooks();
  if (isMyAds) { books = books.filter(b => b.userId === user.id); document.getElementById('page-title').textContent = 'Meus anúncios'; document.getElementById('page-subtitle').textContent = 'Gerencie seus livros à venda'; }
  const searchTerm = (document.getElementById('search-input')?.value || '').toLowerCase();
  if (searchTerm) books = books.filter(b => b.titulo.toLowerCase().includes(searchTerm) || (b.autores || '').toLowerCase().includes(searchTerm));
  if (activeFilters.genero.length) books = books.filter(b => activeFilters.genero.includes(b.genero));
  if (activeFilters.condicao.length) books = books.filter(b => activeFilters.condicao.includes(b.estado));
  if (activeFilters.idioma.length) books = books.filter(b => activeFilters.idioma.includes(b.idioma || 'Português (br)'));
  const sort = document.getElementById('sort-select').value;
  if (sort === 'low') books.sort((a, b) => a.preco - b.preco);
  else if (sort === 'high') books.sort((a, b) => b.preco - a.preco);
  else if (sort === 'rating') { books.sort((a, b) => { const ra = getBookRating(a.id), rb = getBookRating(b.id); return rb.avg - ra.avg; }); }
  document.getElementById('results-count').textContent = `${books.length} ${books.length === 1 ? 'livro encontrado' : 'livros encontrados'}`;

  const grid = document.getElementById('book-grid');
  if (books.length === 0) {
    grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><h3>${isMyAds ? 'Você ainda não anunciou livros' : 'Nenhum livro encontrado'}</h3><p>${isMyAds ? 'Que tal vender seu primeiro livro?' : 'Tente ajustar os filtros'}</p>${isMyAds ? '<a href="cadastrar-livro.html" class="btn btn-primary">Vender livro</a>' : ''}</div>`;
    return;
  }

  grid.innerHTML = books.map((book, i) => {
    const colorClass = coverColors[i % coverColors.length];
    const estado = book.estado || 'Bom';
    const cover = book.foto ? `<div class="book-cover"><img src="${book.foto}" alt="${book.titulo}"><div class="book-condition-badge badge-${estado}">${estado}</div></div>` : `<div class="book-cover ${colorClass}"><svg class="book-cover-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><div class="book-condition-badge badge-${estado}">${estado}</div></div>`;
    const isOwner = book.userId === user.id;
    const { avg, count } = getBookRating(book.id);
    const genero = book.genero || '', encad = book.encadernacao || '';
    // O card inteiro é clicável via data-id, MAS o botão Comprar usa stopPropagation
    return `<div class="book-card" data-book-id="${book.id}" style="position:relative;">
      ${cover}
      <div class="book-info">
        <div class="book-title">${book.titulo}</div>
        <div class="book-author">${book.autores || 'Autor não informado'}</div>
        ${count > 0 ? `<div class="book-rating"><div class="stars">${renderStars(avg)}</div><span class="rating-count">(${count})</span></div>` : '<div class="book-rating"><span class="rating-count" style="font-style:italic">Sem avaliações</span></div>'}
        <div class="book-meta">${genero ? `<span>${genero}</span>` : ''}${encad ? `<span>${encad}</span>` : ''}</div>
        <div class="book-footer">
          <div class="book-price">R$ ${book.preco.toFixed(2).replace('.', ',')}</div>
          ${isOwner
            ? `<button class="btn-buy" onclick="event.stopPropagation();window.location.href='livro-detalhe.html?id=${book.id}'" style="background:var(--vermelho);color:white;">Gerenciar</button>`
            : `<button class="btn-buy" onclick="event.stopPropagation();window.location.href='comprar-livro.html?id=${book.id}'">Comprar</button>`
          }
        </div>
        ${isOwner ? '<span class="owner-tag">Seu anúncio</span>' : `<span class="seller-name">Por ${book.userName || 'Bookly'}</span>`}
      </div>
    </div>`;
  }).join('');

  // EVENT DELEGATION — clique no card leva para detalhes
  document.querySelectorAll('.book-card[data-book-id]').forEach(card => {
    card.addEventListener('click', function() {
      const id = this.getAttribute('data-book-id');
      window.location.href = 'livro-detalhe.html?id=' + id;
    });
  });
}

document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); document.getElementById('search-input')?.focus(); } });

initDarkMode();
buildNavbar();
buildMobileMenu();
buildSidebar();
initSlider();
renderBooks();