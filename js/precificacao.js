// ===== STORAGE / AUTH =====
const Store = { get(k,d=null){try{return JSON.parse(localStorage.getItem(k))||d}catch{return d}}, set(k,v){localStorage.setItem(k,JSON.stringify(v))}, remove(k){localStorage.removeItem(k)} };
const Auth = { current(){return Store.get('bookly_currentUser')}, isLoggedIn(){return!!this.current()}, logout(){Store.remove('bookly_currentUser');window.location.href='index.html'} };
if (!Auth.isLoggedIn()) window.location.href = 'login.html';
const user = Auth.current();

function initDarkMode(){if(Store.get('bookly_darkMode',false))document.documentElement.setAttribute('data-theme','dark')}
function toggleDarkMode(){const i=document.documentElement.getAttribute('data-theme')==='dark';if(i){document.documentElement.removeAttribute('data-theme');Store.set('bookly_darkMode',false)}else{document.documentElement.setAttribute('data-theme','dark');Store.set('bookly_darkMode',true)}buildNavbar();buildMobileMenu()}
function toggleMobileMenu(){document.getElementById('mobile-menu').classList.toggle('open');document.querySelector('.menu-overlay').classList.toggle('show');document.querySelector('.hamburger')?.classList.toggle('open')}
function closeMobileMenu(){document.getElementById('mobile-menu').classList.remove('open');document.querySelector('.menu-overlay').classList.remove('show');document.querySelector('.hamburger')?.classList.remove('open')}

function buildNavbar(){
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  const di=isDark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  document.getElementById('navbar').innerHTML=`
    <a href="explorar.html" class="logo"><div class="logo-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><span>Bookly</span></a>
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
    <a href="explorar.html?tab=meus" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Meus anúncios</a>
    <a href="planos.html" class="mobile-menu-item" onclick="closeMobileMenu()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/></svg>Planos</a>
    <div class="mobile-menu-divider"></div>
    <a href="#" class="mobile-menu-item" onclick="toggleDarkMode();return false;">${di}Tema escuro/claro</a>
    <a href="#" class="mobile-menu-item" style="color:var(--vermelho)" onclick="Auth.logout();return false;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sair da conta</a>`;
}

function showNotification(msg,color='var(--verde)'){const e=document.querySelector('.notification');if(e)e.remove();const n=document.createElement('div');n.className='notification';n.style.borderLeft=`3px solid ${color}`;n.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${msg}`;document.body.appendChild(n);setTimeout(()=>{n.style.opacity='0';n.style.transform='translateY(8px)';setTimeout(()=>n.remove(),300)},2500)}

// ===== FALLBACK PRICING (caso a API Python não esteja rodando) =====
const FB_GENERO_BASE={'Ficção':55,'Não-ficção':48,'Romance':45,'Aventura':52,'Biografia':50,'Técnico':85,'Infantil':35,'Terror':48,'Fantasia':60,'Outro':50};
const FB_CONDICAO_MULT={'Perfeito':1.0,'Bom':0.85,'Médio':0.70,'Ruim':0.50,'Péssimo':0.30,'Novo':1.0,'Semi-novo':0.85,'Usado':0.65,'Degradado':0.40,'Outlet':0.35};
const FB_ENC_MULT={'Capadura':1.15,'Brochura':1.0};
const FB_ATTR_BONUS={'Primeira edição':0.20,'Cópia Assinada':0.30,'Impresso Limitada':0.25,'Fora de catálogo':0.15,'Vintage':0.10,'Antiguidade':0.25};

function fbSeed(t,a){const t2=(t+a).toLowerCase().trim();let h=0;for(let i=0;i<t2.length;i++){h=(h*31+t2.charCodeAt(i))>>>0}return h}

function fallbackPricing(dados){
  const seed=fbSeed(dados.titulo||'',dados.autores||'');
  let rng=seed;
  const rand=()=>{rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff)};
  const randInt=(min,max)=>Math.floor(rand()*(max-min+1))+min;

  const genero=dados.genero||'Outro';
  const estado=dados.estado||'Bom';
  const encad=dados.encadernacao||'Brochura';
  const attrs=dados.atributos||[];

  let preco=FB_GENERO_BASE[genero]||50;
  preco*=FB_CONDICAO_MULT[estado]||0.75;
  preco*=FB_ENC_MULT[encad]||1.0;
  let bonus=0;attrs.forEach(a=>bonus+=FB_ATTR_BONUS[a]||0);
  preco*=(1+bonus);
  if(dados.hasISBN)preco*=1.05;
  preco*=(1+(rand()-0.5)*0.10);
  preco=Math.max(15,Math.round(preco*100)/100);

  const media=Math.round(preco*(0.6+rand()*0.15)*100)/100;
  const margem=Math.round(((preco-media*0.4)/preco)*10000)/100;
  const demBase={'Ficção':75,'Romance':85,'Fantasia':80,'Terror':65,'Biografia':55,'Técnico':45,'Outro':50}[genero]||50;
  let dem=demBase+attrs.length*3+randInt(-5,5);
  if(estado.includes('Perfeito')||estado.includes('Novo'))dem+=5;
  if(estado.includes('Ruim')||estado.includes('Péssimo'))dem-=15;
  dem=Math.max(10,Math.min(100,dem));

  const lojas=['Amazon','eBay','eBay','Mercado Livre'];
  const vars=[0.85+rand()*0.3,0.7+rand()*0.25,0.65+rand()*0.25,0.9+rand()*0.3];
  const comp=lojas.map((l,i)=>{const p=Math.round(preco*vars[i]*100)/100;return{loja:l,preco:p,diferenca:Math.round((p-preco)*100)/100,diferenca_pct:Math.round(((p-preco)/preco)*1000)/10}});

  return{preco_sugerido:preco,media_mercado:media,margem_lucro:margem,demanda:dem,demanda_texto:dem>70?'Alta demanda':dem>40?'Média demanda':'Baixa demanda',comparacao_lojas:comp,analise:`Análise de mercado para "${dados.titulo}":\n\n• Gênero ${genero} tem demanda ${dem>70?'alta':dem>40?'média':'baixa'} no mercado.\n• Condição "${estado}" ${FB_CONDICAO_MULT[estado]>=1?'mantém valor cheio':`reduz ${Math.round((1-(FB_CONDICAO_MULT[estado]||0.75))*100)}% do valor`}.\n${attrs.length?`• Atributos (${attrs.join(', ')}) adicionam valor.\n`:''}✓ Preço sugerido de R$ ${preco.toFixed(2)} está ${Math.round(((preco-media)/media)*100)}% acima da média.`};
}

// ===== CARREGAR DRAFT E BUSCAR RECOMENDAÇÃO =====
const draft = Store.get('bookly_draft', {});

async function loadRecommendation() {
  if (!draft.titulo) {
    showNotification('Preencha os passos anteriores primeiro', 'var(--vermelho)');
    setTimeout(() => window.location.href = 'cadastrar-livro.html', 1500);
    return;
  }

  // Tentar API Python
  try {
    const resp = await fetch('http://localhost:5000/api/recommend-price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
      timeout: 3000
    });
    if (resp.ok) {
      const data = await resp.json();
      renderRecommendation(data);
      return;
    }
  } catch (e) {
    // API não disponível — usar fallback
  }

  // Fallback
  const data = fallbackPricing(draft);
  renderRecommendation(data);
}

function renderRecommendation(data) {
  const p = data.preco_sugerido || 59.99;
  const m = data.media_mercado || 38.59;
  const marg = data.margem_lucro || 67;
  const dem = data.demanda || 67;
  const demTxt = data.demanda_texto || 'Alta demanda';
  const comp = data.comparacao_lojas || [];
  const analise = data.analise || '';

  const cores = ['var(--azul)', 'var(--verde)', 'var(--marrom)', 'var(--roxo)'];
  const maxPreco = Math.max(...comp.map(c => c.preco), p);

  const compHTML = comp.map((c, i) => {
    const h = Math.max(20, (c.preco / maxPreco) * 100);
    return `<div class="chart-bar-group">
      <div class="chart-bar" style="height:${h}%;background:linear-gradient(180deg,${cores[i]},${cores[i]}cc);">
        <span class="chart-bar-value">R$ ${c.preco.toFixed(0)}</span>
      </div>
      <span class="chart-bar-label">${c.loja}</span>
    </div>`;
  }).join('');

  document.getElementById('content-area').innerHTML = `
    <div class="metrics-row">
      <div class="metric-card metric-blue"><div class="metric-label">Preço sugerido</div><div class="metric-value">R$ ${p.toFixed(2).replace('.', ',')}</div><div class="metric-sub">Baseado no mercado</div></div>
      <div class="metric-card metric-green"><div class="metric-label">Média do mercado</div><div class="metric-value">R$ ${m.toFixed(2).replace('.', ',')}</div><div class="metric-sub">Preço similar</div></div>
      <div class="metric-card metric-brown"><div class="metric-label">Margem de lucro</div><div class="metric-value">${marg.toFixed(1)}%</div><div class="metric-sub">Média margem</div></div>
      <div class="metric-card metric-purple"><div class="metric-label">Demanda</div><div class="metric-value">${dem}/100</div><div class="metric-sub">${demTxt}</div></div>
    </div>

    ${analise ? `<div class="ai-analysis">
      <div class="ai-analysis-header"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>Análise IA</div>
      ${analise}
    </div>` : ''}

    <div class="chart-section">
      <div class="chart-header">Comparar com outras lojas</div>
      <div class="chart-container">${compHTML}</div>
    </div>

    <div class="price-section">
      <div class="price-input-wrapper">
        <div class="price-label">Escreva o preço final</div>
        <div class="price-input-row">
          <span class="price-currency">R$</span>
          <input type="number" class="price-input" id="preco-final" value="${p.toFixed(2)}" step="0.01" oninput="checkWarning(${p})">
        </div>
        <div class="price-warning" id="price-warning" style="color:#FBD38D;"></div>
      </div>
    </div>`;

  checkWarning(p);
}

function checkWarning(sugerido) {
  const input = document.getElementById('preco-final');
  const warning = document.getElementById('price-warning');
  if (!input || !warning) return;
  const valor = parseFloat(input.value) || 0;
  if (valor > sugerido) {
    const pct = Math.round(((valor - sugerido) / sugerido) * 100);
    warning.textContent = `${pct}% acima do recomendado`;
    warning.style.color = pct > 100 ? '#FC8181' : pct > 50 ? '#FBD38D' : '#C6F6D5';
  } else if (valor < sugerido * 0.5) {
    warning.textContent = 'Preço muito abaixo do mercado';
    warning.style.color = '#FBD38D';
  } else if (valor < sugerido * 0.8) {
    warning.textContent = `${Math.round((1 - valor / sugerido) * 100)}% abaixo do recomendado`;
    warning.style.color = '#C6F6D5';
  } else {
    warning.textContent = '✓ Preço dentro da faixa recomendada';
    warning.style.color = '#68D391';
  }
}

function finalizarRegistro() {
  const input = document.getElementById('preco-final');
  if (!input) { showNotification('Aguarde o carregamento', 'var(--vermelho)'); return; }
  const preco = parseFloat(input.value);
  if (!preco || preco <= 0) { showNotification('Defina um preço válido', 'var(--vermelho)'); return; }

  const book = {
    id: 'b_' + Date.now(),
    userId: user.id,
    userName: user.name,
    titulo: draft.titulo || 'Sem título',
    autores: draft.autores || '',
    editora: draft.editora || '',
    genero: draft.genero || '',
    categoria: draft.categoria || '',
    ano: draft.ano || '',
    isbn: draft.hasISBN ? draft.isbn : 'Não possui',
    foto: draft.foto || null,
    estado: draft.estado || 'Bom',
    encadernacao: draft.encadernacao || 'Brochura',
    quantidade: draft.quantidade || 1,
    atributos: draft.atributos || [],
    observacoes: draft.observacoes || '',
    preco: preco,
    createdAt: new Date().toISOString()
  };

  const books = Store.get('bookly_books', []);
  books.unshift(book);
  Store.set('bookly_books', books);
  Store.remove('bookly_draft');

  showNotification('Livro registrado com sucesso!');
  setTimeout(() => window.location.href = 'explorar.html', 1200);
}

// ===== INIT =====
initDarkMode();
buildNavbar();
buildMobileMenu();
loadRecommendation();