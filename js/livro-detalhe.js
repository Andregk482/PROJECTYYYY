const Store = { get(k,d=null){try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}}, set(k,v){localStorage.setItem(k,JSON.stringify(v))}, remove(k){localStorage.removeItem(k)} };
const Auth = { current(){return Store.get('bookly_currentUser')}, isLoggedIn(){return!!this.current()}, logout(){Store.remove('bookly_currentUser');window.location.href='index.html'} };
if (!Auth.isLoggedIn()) window.location.href = 'login.html';
const user = Auth.current();

const seedBooks = [
  { id:'seed_0', userId:'seed_user', userName:'Bookly', foto:null, titulo:'O sagrado das sombras', autores:'Morgana Marques', editora:'Editora Dark', genero:'Romance', categoria:'Literatura', ano:'15/03/22', isbn:'978-65-1234-567-8', hasISBN:true, estado:'Semi-novo', encadernacao:'Brochura', quantidade:1, atributos:['Primeira edição'], observacoes:'Leve desgaste na capa, páginas em ótimo estado. Livro lido uma única vez.', preco:49.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*5).toISOString() },
  { id:'seed_1', userId:'seed_user', userName:'Bookly', foto:null, titulo:'O entregador de bonecos', autores:'D. Lacerda', editora:'Aleph', genero:'Terror', categoria:'Literatura', ano:'20/09/21', isbn:'978-85-7777-222-1', hasISBN:true, estado:'Novo', encadernacao:'Capadura', quantidade:1, atributos:['Cópia Assinada'], observacoes:'Livro novo lacrado, autografado pelo autor. Edição de lançamento.', preco:67.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*3).toISOString() },
  { id:'seed_2', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Moby Dick', autores:'Herman Melville', editora:'Penguin', genero:'Ficção científica', categoria:'Literatura', ano:'10/01/20', isbn:'978-85-6666-111-0', hasISBN:true, estado:'Usado', encadernacao:'Brochura', quantidade:1, atributos:['Vintage'], observacoes:'Páginas amareladas pelo tempo. Capa com sinais de manuseio. Edição de bolso.', preco:78.90, idioma:'Inglês', createdAt:new Date(Date.now()-86400000*7).toISOString() },
  { id:'seed_3', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Dom Quixote', autores:'Miguel de Cervantes', editora:'Martin Claret', genero:'Fantasia', categoria:'Literatura', ano:'05/11/19', isbn:'978-85-4444-333-2', hasISBN:true, estado:'Semi-novo', encadernacao:'Capadura', quantidade:1, atributos:['Antiguidade','Fora de catálogo'], observacoes:'Edição especial de colecionador. Capa dura com acabamento dourado.', preco:119.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*10).toISOString() },
  { id:'seed_4', userId:'seed_user', userName:'Bookly', foto:null, titulo:'A volta ao mundo', autores:'Júlio Verne', editora:'L&PM', genero:'Fantasia', categoria:'Literatura', ano:'12/07/18', isbn:'978-85-2222-444-3', hasISBN:true, estado:'Usado', encadernacao:'Brochura', quantidade:1, atributos:[], observacoes:'Livro usado com anotações a lápis nas margens.', preco:54.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*15).toISOString() },
  { id:'seed_5', userId:'seed_user', userName:'Bookly', foto:null, titulo:'Crime e Castigo', autores:'Fiódor Dostoiévski', editora:'34', genero:'Ficção científica', categoria:'Literatura', ano:'22/04/21', isbn:'978-85-9999-555-4', hasISBN:true, estado:'Semi-novo', encadernacao:'Capadura', quantidade:1, atributos:['Impresso Limitada'], observacoes:'Edição limitada numerada #042/500. Capa dura com sobrecapa.', preco:89.90, idioma:'Português (br)', createdAt:new Date(Date.now()-86400000*2).toISOString() },
];
const seedReviews = [
  { bookId:'seed_0', userId:'u_demo1', userName:'Carlos S.', rating:5, comment:'Livro em ótimo estado, entrega rápida.', date:new Date(Date.now()-86400000*4).toISOString() },
  { bookId:'seed_0', userId:'u_demo2', userName:'Ana P.', rating:4, comment:'Boa condição, recomendo.', date:new Date(Date.now()-86400000*2).toISOString() },
  { bookId:'seed_1', userId:'u_demo3', userName:'Ricardo M.', rating:5, comment:'Veio autografado, perfeito!', date:new Date(Date.now()-86400000*1).toISOString() },
  { bookId:'seed_3', userId:'u_demo4', userName:'Júlia F.', rating:5, comment:'Edição de colecionador impecável.', date:new Date(Date.now()-86400000*3).toISOString() },
];
const coverColors = ['cover-1','cover-2','cover-3','cover-4','cover-5','cover-6','cover-7','cover-8'];

function getAllBooks() { let b = Store.get('bookly_books', []); seedBooks.forEach(s => { if (!b.find(x => x.id === s.id)) b.push(s); }); return b; }
function getAllReviews() { let r = Store.get('bookly_reviews', []); seedReviews.forEach(s => { if (!r.find(x => x.bookId === s.bookId && x.userId === s.userId)) r.push(s); }); return r; }
function getBookRating(bookId) { const reviews = getAllReviews().filter(r => r.bookId === bookId); if (reviews.length === 0) return { avg: 0, count: 0 }; const sum = reviews.reduce((acc, r) => acc + r.rating, 0); return { avg: sum / reviews.length, count: reviews.length }; }
function getBookReviews(bookId) { return getAllReviews().filter(r => r.bookId === bookId).sort((a,b) => new Date(b.date) - new Date(a.date)); }

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

function renderStars(rating, size) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<svg class="star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    else if (i - rating < 1) html += '<svg class="star" viewBox="0 0 24 24" fill="currentColor" opacity="0.5"><defs><linearGradient id="h'+i+'_'+size+'"><stop offset="50%" stop-color="#F6B73C"/><stop offset="50%" stop-color="#E2E8F0"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#h'+i+'_'+size+')"/></svg>';
    else html += '<svg class="star empty" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  return html;
}

function formatDate(iso) { const d = new Date(iso); return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }); }

function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get('id');
  const allBooks = getAllBooks();
  const book = allBooks.find(b => b.id === bookId);

  if (!book) {
    document.getElementById('product-content').innerHTML = `<div class="not-found"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><h2>Livro não encontrado</h2><p>O livro pode ter sido removido.</p><a href="explorar.html" class="btn btn-primary btn-lg">Voltar ao marketplace</a></div>`;
    return;
  }

  document.title = `Bookly — ${book.titulo}`;
  document.getElementById('bc-title').textContent = book.titulo;

  const isOwner = book.userId === user.id;
  const { avg, count } = getBookRating(book.id);
  const reviews = getBookReviews(book.id);
  const estado = book.estado || 'Bom';
  const colorClass = coverColors[book.id.charCodeAt(book.id.length-1) % coverColors.length];

  const cover = book.foto
    ? `<div class="cover-wrapper"><img src="${book.foto}" alt="${book.titulo}"><div class="condition-badge-large badge-${estado}">${estado}</div></div>`
    : `<div class="cover-wrapper ${colorClass}"><svg class="cover-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><div class="condition-badge-large badge-${estado}">${estado}</div></div>`;

  const attrs = book.atributos || [];
  const attrsHTML = attrs.length ? `<div class="attr-chips">${attrs.map(a => `<span class="attr-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${a}</span>`).join('')}</div>` : '<span class="description-text empty">Nenhum atributo especial</span>';
  const obs = book.observacoes || '';
  const obsHTML = obs ? `<p class="description-text">${obs}</p>` : '<p class="description-text empty">Sem descrição fornecida pelo vendedor.</p>';
  const sellerInitial = (book.userName || 'B').charAt(0).toUpperCase();
  const sellerName = book.userName || 'Bookly';

  const buyActionsHTML = isOwner
    ? `<button class="btn btn-danger btn-lg btn-block" onclick="deleteBook('${book.id}')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Excluir anúncio</button>
       <a href="explorar.html?tab=meus" class="btn btn-outline btn-block">Ver meus anúncios</a>`
    : `<a href="comprar-livro.html?id=${book.id}" class="btn btn-green btn-lg btn-block"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Comprar agora</a>
       <button class="btn btn-outline btn-block" onclick="addToCart('${book.titulo}')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Adicionar ao carrinho</button>`;

  const reviewsHTML = reviews.length
    ? reviews.map(r => `<div class="review-item"><div class="review-header"><div class="review-avatar">${r.userName.charAt(0).toUpperCase()}</div><span class="review-name">${r.userName}</span><span class="review-date">${formatDate(r.date)}</span></div><div class="review-stars">${renderStars(r.rating, 'rev')}</div><p class="review-comment">${r.comment}</p></div>`).join('')
    : '<p class="no-reviews">Ainda não há avaliações para este livro.</p>';

  document.getElementById('product-content').innerHTML = `
    <div class="product-grid">
      <div class="cover-section">${cover}</div>
      <div class="info-section">
        <h1 class="product-title">${book.titulo}</h1>
        <p class="product-author">por ${book.autores || 'Autor não informado'}</p>
        ${count > 0 ? `<div class="product-rating"><div class="stars">${renderStars(avg, 'main')}</div><span class="rating-text">${avg.toFixed(1)} · ${count} ${count === 1 ? 'avaliação' : 'avaliações'}</span></div>` : '<div class="product-rating"><span class="rating-text" style="font-style:italic">Sem avaliações</span></div>'}
        <div class="product-meta">
          <span class="meta-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/></svg>${book.genero || 'Geral'}</span>
          <span class="meta-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>${book.categoria || 'Literatura'}</span>
          <span class="meta-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>${book.encadernacao || 'Brochura'}</span>
          <span class="meta-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>${book.idioma || 'Português (br)'}</span>
        </div>
        <div class="section-block"><div class="section-title">Descrição</div>${obsHTML}</div>
        <div class="section-block"><div class="section-title">Atributos especiais</div>${attrsHTML}</div>
        <div class="section-block"><div class="section-title">Especificações</div><div class="specs-table">
          <div class="spec-row"><div class="spec-label">Editora</div><div class="spec-value">${book.editora || 'Não informada'}</div></div>
          <div class="spec-row"><div class="spec-label">Ano</div><div class="spec-value">${book.ano || 'Não informado'}</div></div>
          <div class="spec-row"><div class="spec-label">ISBN</div><div class="spec-value">${book.isbn || 'Não possui'}</div></div>
          <div class="spec-row"><div class="spec-label">Encadernação</div><div class="spec-value">${book.encadernacao || 'Brochura'}</div></div>
          <div class="spec-row"><div class="spec-label">Condição</div><div class="spec-value">${estado}</div></div>
          <div class="spec-row"><div class="spec-label">Quantidade</div><div class="spec-value">${book.quantidade || 1} unidade(s)</div></div>
          <div class="spec-row"><div class="spec-label">Idioma</div><div class="spec-value">${book.idioma || 'Português (br)'}</div></div>
        </div></div>
        <div class="section-block"><div class="section-title">Avaliações (${count})</div><div class="reviews-list">${reviewsHTML}</div></div>
      </div>
      <div class="buy-box">
        <div class="buy-price">R$ ${book.preco.toFixed(2).replace('.', ',')}</div>
        <div class="buy-price-label">preço unitário</div>
        <div class="buy-seller"><div class="seller-avatar">${sellerInitial}</div><div class="seller-info"><div class="seller-name">${sellerName}</div><div class="seller-label">${isOwner ? 'Você é o vendedor' : 'Vendedor'}</div></div></div>
        <div class="buy-actions">${buyActionsHTML}</div>
        <div class="buy-stock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>${book.quantidade > 0 ? 'Em estoque' : 'Esgotado'}</div>
      </div>
    </div>`;
}

function deleteBook(bookId) {
  if (!confirm('Excluir este anúncio permanentemente?')) return;
  let books = Store.get('bookly_books', []);
  books = books.filter(b => b.id !== bookId);
  Store.set('bookly_books', books);
  showNotification('Anúncio excluído');
  setTimeout(() => window.location.href = 'explorar.html?tab=meus', 1000);
}
function addToCart(title) { showNotification(`"${title}" adicionado ao carrinho`); }

initDarkMode();
buildNavbar();
buildMobileMenu();
loadProduct();