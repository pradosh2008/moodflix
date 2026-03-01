/* ============================================================
   MERIDIAN — Main JavaScript
   Navigation, search, theme, article rendering utilities
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavScroll();
  initSearch();
  initMobileMenu();
  initReadingProgress();
  markActiveNavLink();
});

/* ── Theme (dark/light) ─────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem('meridian-theme') || 'light';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('meridian-theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ── Sticky nav shadow ──────────────────────────────────────── */
function initNavScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Reading progress bar ───────────────────────────────────── */
function initReadingProgress() {
  const bar = document.querySelector('.reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docH > 0 ? (window.scrollY / docH * 100) + '%' : '0%';
  }, { passive: true });
}

/* ── Search overlay ─────────────────────────────────────────── */
function initSearch() {
  const overlay  = document.getElementById('search-overlay');
  const input    = document.getElementById('search-input');
  const results  = document.getElementById('search-results');
  const openBtn  = document.getElementById('search-open');
  const closeBtn = document.getElementById('search-close');

  if (!overlay) return;

  function open()  { overlay.classList.add('open'); input && input.focus(); }
  function close() { overlay.classList.remove('open'); if (input) input.value = ''; if (results) results.innerHTML = ''; }

  openBtn  && openBtn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open(); }
  });

  if (input && results) {
    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (q.length < 2) { results.innerHTML = ''; return; }
      const found = typeof searchArticles === 'function' ? searchArticles(q) : [];
      renderSearchResults(found, results, close);
    });
  }
}

function renderSearchResults(articles, container, onSelect) {
  if (!articles.length) {
    container.innerHTML = '<p style="padding:16px 20px;color:var(--text-muted);font-size:14px;">No articles found.</p>';
    return;
  }
  container.innerHTML = articles.slice(0, 6).map(a => `
    <div class="search-result-item" onclick="${onSelect ? 'document.getElementById(\'search-overlay\').classList.remove(\'open\');' : ''}window.location='article.html?slug=${a.slug}'">
      <span class="category-tag" data-cat="${a.category}">${a.category}</span>
      <div>
        <h4>${a.title}</h4>
        <span style="font-size:11px;color:var(--text-muted)">${a.date} · ${a.readTime} min read</span>
      </div>
    </div>
  `).join('');
}

/* ── Mobile menu ────────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.cssText = isOpen
      ? ''
      : 'display:flex;flex-direction:column;position:fixed;top:var(--nav-height);left:0;right:0;background:var(--bg-card);border-bottom:1px solid var(--border);padding:12px 24px 20px;z-index:99;gap:4px;box-shadow:var(--shadow-md)';
  });
}

/* ── Mark active nav ────────────────────────────────────────── */
function markActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === page || (page === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
}

/* ── Article card renderer ──────────────────────────────────── */
function renderArticleCard(article, size = 'medium') {
  return `
    <article class="card card--${size}" onclick="window.location='article.html?slug=${article.slug}'" style="cursor:pointer">
      <div class="card__image-placeholder">${article.emoji}</div>
      <div class="card__body">
        <div class="card__meta">
          <span class="category-tag" data-cat="${article.category}">${article.category}</span>
          <span class="card__date">${article.date}</span>
          <span class="card__read-time">· ${article.readTime} min</span>
        </div>
        <h3 class="card__title">${article.title}</h3>
        <p class="card__excerpt">${article.excerpt}</p>
      </div>
      <div class="card__footer">
        <div class="card__author">
          <div class="card__author-avatar" style="background:${article.author.color}">${article.author.initials}</div>
          <span class="card__author-name">${article.author.name}</span>
        </div>
        <button class="card__save" title="Save article" onclick="event.stopPropagation();this.style.color='var(--accent)'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
      </div>
    </article>
  `;
}

function renderHorizontalCard(article) {
  return `
    <article class="card-h" onclick="window.location='article.html?slug=${article.slug}'" style="cursor:pointer">
      <div class="card-h__image">${article.emoji}</div>
      <div class="card-h__body">
        <div class="card-h__meta">
          <span class="category-tag" data-cat="${article.category}">${article.category}</span>
          <span class="card-h__date">${article.date}</span>
        </div>
        <h3 class="card-h__title">${article.title}</h3>
        <p class="card-h__excerpt">${article.excerpt}</p>
      </div>
    </article>
  `;
}

function renderRankedCard(article, rank) {
  const catMeta = typeof getCategoryMeta === 'function' ? getCategoryMeta(article.category) : { color: '#C9A035' };
  return `
    <div class="card-ranked" onclick="window.location='article.html?slug=${article.slug}'">
      <div class="card-ranked__num">0${rank}</div>
      <div>
        <div class="card-ranked__cat" style="color:${catMeta ? catMeta.color : '#C9A035'}">${article.category}</div>
        <div class="card-ranked__title">${article.title}</div>
        <div class="card-ranked__date">${article.date}</div>
      </div>
    </div>
  `;
}

/* ── Newsletter form ────────────────────────────────────────── */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const btn   = e.target.querySelector('button');
  if (!input || !btn) return;

  const email = input.value.trim();
  if (!email || !email.includes('@')) { input.style.borderColor = 'red'; return; }

  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#10B981';
  input.value = '';
  input.disabled = true;
  btn.disabled = true;
}

/* ── Animate on scroll ──────────────────────────────────────── */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .card-h, .spotlight-card, .sidebar-widget').forEach(el => {
    observer.observe(el);
  });
}

/* ── Category tab filtering ─────────────────────────────────── */
function initCategoryTabs(containerId, listId) {
  const container = document.getElementById(containerId);
  const list      = document.getElementById(listId);
  if (!container || !list) return;

  container.addEventListener('click', e => {
    const btn = e.target.closest('.category-tab');
    if (!btn) return;

    container.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    const articles = cat === 'all'
      ? getLatestArticles(8)
      : getArticlesByCategory(cat).slice(0, 8);

    list.innerHTML = articles.map(a => renderHorizontalCard(a)).join('');
  });
}

/* ── Article page: load article by slug ─────────────────────── */
function loadArticlePage() {
  const params = new URLSearchParams(window.location.search);
  const slug   = params.get('slug');
  if (!slug || typeof getArticleBySlug !== 'function') return;

  const article = getArticleBySlug(slug);
  if (!article) { document.title = 'Article Not Found — MERIDIAN'; return; }

  document.title = article.title + ' — MERIDIAN';

  setEl('article-cat',     `<span class="category-tag" data-cat="${article.category}">${article.category}</span>`);
  setEl('article-title',   article.title);
  setEl('article-subtitle', article.subtitle || '');
  setEl('article-author',  article.author.name);
  setEl('article-role',    article.author.role || '');
  setEl('article-date',    article.date);
  setEl('article-readtime', article.readTime + ' min read');
  setEl('article-emoji',   article.emoji);

  const avatarEl = document.getElementById('article-avatar');
  if (avatarEl) {
    avatarEl.textContent = article.author.initials;
    avatarEl.style.background = article.author.color;
  }

  // Generate article body
  const bodyEl = document.getElementById('article-body');
  if (bodyEl) bodyEl.innerHTML = generateArticleBody(article);

  // Related articles
  const relatedEl = document.getElementById('related-articles');
  if (relatedEl && typeof getRelatedArticles === 'function') {
    const related = getRelatedArticles(article, 3);
    relatedEl.innerHTML = related.map(a => renderHorizontalCard(a)).join('');
  }

  // Tags
  const tagsEl = document.getElementById('article-tags');
  if (tagsEl && article.tags) {
    tagsEl.innerHTML = article.tags.map(t =>
      `<span style="display:inline-block;padding:4px 12px;border:1px solid var(--border);border-radius:100px;font-size:12px;color:var(--text-secondary);margin:4px">${t}</span>`
    ).join('');
  }
}

function setEl(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function generateArticleBody(article) {
  // Generate rich placeholder body text for each article
  const bodies = {
    "ai-reshaping-global-labor-markets": `
      <p>When economists at the McKinsey Global Institute published their landmark 2017 study projecting that automation would displace 400-800 million workers by 2030, they envisioned a familiar pattern: first the assembly lines, then the knowledge workers. The robot would arrive at the factory gate before it knocked on the office door.</p>
      <p>The data from 2023 to 2025 suggests something more complicated — and more disquieting — has unfolded instead.</p>
      <h2>The Inversion Nobody Predicted</h2>
      <p>Generative AI, which reached mass adoption between 2023 and 2024, proved most immediately disruptive to tasks that were once considered quintessentially human: drafting legal briefs, generating financial reports, producing marketing copy, writing code. The factory floor, by contrast, proved harder to automate than anticipated — physical manipulation in unstructured environments remains genuinely difficult for robotics.</p>
      <blockquote><p>"We're witnessing a skills inversion in real time. The workers who were told automation-proofing themselves required more education are discovering that education alone wasn't the shield they were promised."</p></blockquote>
      <p>The Bureau of Labor Statistics data through Q3 2025 shows that employment in sectors like legal services, marketing, and entry-level software development has contracted faster than manufacturing, which has actually added jobs in some subsectors due to reshoring trends and the growing complexity of supply chain management.</p>
      <h2>The 'Complementarity' Argument Under Scrutiny</h2>
      <p>Economic orthodoxy held that automation historically creates as many jobs as it destroys by complementing human labor rather than replacing it. The steam engine made mill workers more productive; the spreadsheet created the modern CFO role. Why should this time be different?</p>
      <p>Proponents of this view point to emerging job categories: AI trainers, prompt engineers, AI output auditors. But critics note that these roles are far fewer in number than the tasks being displaced, and that the complementarity argument may be temporally compressed in ways that make the transition more difficult even if the endpoint is the same.</p>
      <h2>What the New Labor Market Actually Rewards</h2>
      <p>Three categories of work appear genuinely resistant to current AI capabilities:</p>
      <p><strong>Complex physical manipulation:</strong> Plumbers, electricians, and surgeons performing dexterous tasks in unstructured environments. The physical world remains hard to automate at human cost points.</p>
      <p><strong>High-stakes interpersonal judgment:</strong> Therapists, mediators, and senior executives making consequential decisions where accountability and trust matter as much as the decision itself.</p>
      <p><strong>Novel problem framing:</strong> The ability to identify what question should be asked, rather than answer a question already posed, remains difficult to systematize.</p>
      <p>The implication is uncomfortable: the credential-credential path to economic security — school, degree, white-collar job — needs fundamental rethinking at a pace that educational institutions are poorly equipped to achieve.</p>
      <h2>Policy Responses and Their Gaps</h2>
      <p>The European Union's AI Act, fully in force since 2025, focuses heavily on safety and transparency requirements but says relatively little about labor market transition. The United States has relied primarily on existing unemployment insurance architecture, which was designed for cyclical job loss, not structural technological displacement.</p>
      <p>A handful of cities — notably Helsinki, Seoul, and Denver — have piloted variants of skills voucher programs, offering workers displaced by automation credits toward retraining. Early results are mixed, primarily because the bottleneck isn't access to training, it's clarity about which skills to train for in an environment where AI capabilities are themselves evolving rapidly.</p>
      <p>The picture that emerges from two years of data is not the clean narrative of human-machine collaboration that dominated business school case studies circa 2022. It's messier, faster, and less evenly distributed than the optimists projected. The adjustment mechanisms built for previous waves of technological change may be structurally mismatched with this one.</p>
    `,
    "default": `
      <p>${article.excerpt}</p>
      <p>The implications of this development stretch far beyond what the immediate data suggests. To understand the full significance, it helps to examine the historical context and the specific mechanisms through which this phenomenon operates.</p>
      <h2>The Analytical Framework</h2>
      <p>Analysts who have studied this space most carefully tend to avoid the polarized narratives that dominate public discourse. Neither pure optimism nor catastrophism captures the complexity of what is actually unfolding.</p>
      <p>The structural factors driving this development include both long-term trends that have been building for decades and more recent catalysts that have accelerated the pace of change beyond what most forecasters anticipated.</p>
      <blockquote><p>"The question is no longer whether this will reshape the landscape, but how fast, and who will be positioned to navigate the transition effectively."</p></blockquote>
      <h2>What the Evidence Shows</h2>
      <p>The data available through early 2026 paints a picture that is more nuanced than either advocates or critics typically acknowledge. Positive effects have been concentrated in certain domains, while negative externalities have emerged in others that received less attention in the initial analysis.</p>
      <p>Three variables appear most significant for understanding the divergent outcomes observed across different contexts and regions:</p>
      <p>First, the institutional environment in which these changes are unfolding matters enormously. The same underlying dynamic produces different results depending on the governance frameworks, regulatory architectures, and social safety nets in place.</p>
      <p>Second, the distributional effects have been more uneven than aggregate statistics suggest. Headline numbers often mask significant variation across demographic groups, geographies, and economic strata.</p>
      <p>Third, second-order effects — the systemic responses that develop in reaction to first-order changes — are beginning to emerge in ways that will likely reshape the trajectory significantly over the next 18-24 months.</p>
      <h2>Looking Ahead</h2>
      <p>The most honest answer to where this is heading is that genuine uncertainty remains, and anyone claiming confident prediction deserves skepticism. The variables in play are too numerous and too interconnected for reliable point estimates.</p>
      <p>What can be said with more confidence is that the decisions made in the next 12-24 months — by governments, by institutions, by individuals — will substantially determine which of several plausible futures materializes. The range of outcomes remains wide. The window for influencing which direction things move is narrowing.</p>
      <p>That is both the sobering conclusion and the grounds for engagement rather than fatalism.</p>
    `
  };

  return bodies[article.slug] || bodies["default"];
}

/* ── Archive page loader ─────────────────────────────────────── */
function loadArchivePage() {
  const grid = document.getElementById('archive-grid');
  if (!grid || typeof ARTICLES === 'undefined') return;

  const activeFilter = document.querySelector('.category-tab.active');
  const cat = activeFilter ? activeFilter.dataset.cat : 'all';
  const articles = cat === 'all' ? getLatestArticles(ARTICLES.length) : getArticlesByCategory(cat);

  grid.innerHTML = articles.map(a => renderArticleCard(a, 'medium')).join('');
}

/* ── Category page loader ────────────────────────────────────── */
function loadCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  const cat    = params.get('cat');
  if (!cat) return;

  const meta = typeof getCategoryMeta === 'function' ? getCategoryMeta(cat) : null;
  const hero = document.querySelector('.cat-hero');
  if (hero) hero.setAttribute('data-cat', cat);

  setEl('cat-name',  cat);
  setEl('cat-desc',  meta ? meta.desc : '');
  document.title = cat + ' — MERIDIAN';

  const catTag = document.querySelector('.cat-hero .category-tag');
  if (catTag) { catTag.dataset.cat = cat; catTag.textContent = cat; }

  const grid = document.getElementById('cat-grid');
  if (grid && typeof getArticlesByCategory === 'function') {
    const articles = getArticlesByCategory(cat);
    grid.innerHTML = articles.length
      ? articles.map(a => renderArticleCard(a, 'medium')).join('')
      : '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:60px 0">More articles coming soon.</p>';
  }
}

// Auto-init page-specific logic
window.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop();
  if (page === 'article.html') loadArticlePage();
  if (page === 'archive.html') loadArchivePage();
  if (page === 'category.html') loadCategoryPage();
  initScrollAnimations();
});
