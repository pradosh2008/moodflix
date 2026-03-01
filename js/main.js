/* ============================================================
   HARDFACTS — Main JavaScript
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
  const saved = localStorage.getItem('hardfacts-theme') || 'light';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('hardfacts-theme', theme);
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
  if (!article) { document.title = 'Article Not Found — HARDFACTS'; return; }

  document.title = article.title + ' — HARDFACTS';

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
  const bodies = {
    "usa-exploitation-iraq": `
      <p>On March 20, 2003, the United States and a "coalition of the willing" invaded Iraq. The stated justification: Saddam Hussein possessed weapons of mass destruction — biological agents, chemical stockpiles, and an active nuclear program that posed an imminent threat to global security. Within weeks of the invasion, it became clear that none of these weapons existed. The intelligence had been wrong, or worse, deliberately manipulated.</p>
      <p>What followed over the next two decades tells a story that goes far beyond a simple intelligence failure. It is a story of systematic exploitation — of oil, of geography, of a shattered state — that continues to this day.</p>

      <h2>The Lie That Launched a War</h2>
      <p>The case for war rested primarily on two pillars: the CIA's National Intelligence Estimate of October 2002, which assessed with "high confidence" that Iraq was reconstituting its nuclear weapons program, and Secretary of State Colin Powell's February 2003 presentation to the UN Security Council, which displayed satellite images and intercepted communications as proof of active WMD programs.</p>
      <p>The Downing Street Memo, a classified British government document leaked in 2005, revealed that senior UK officials had concluded as early as July 2002 that "intelligence and facts were being fixed around the policy." In other words, the decision to go to war had already been made — the intelligence was then shaped to justify it.</p>
      <blockquote><p>"The intelligence and facts were being fixed around the policy. The NSC had no patience with the UN route, and no enthusiasm for publishing material on the Iraqi regime's record. There was little discussion in Washington of the aftermath after military action."<br><em>— Downing Street Memo, July 23, 2002</em></p></blockquote>
      <p>The Iraq Survey Group, established by the US itself after the invasion, concluded in its final 2004 report that Iraq had no active WMD programs at the time of the invasion. Saddam had dismantled them after the Gulf War. The justification for the entire war was a fabrication.</p>

      <h2>The Oil That Was Always the Point</h2>
      <p>Iraq sits atop the world's fifth-largest proven oil reserves — approximately 145 billion barrels. Before the invasion, Iraq's oil sector was nationalized, controlled by the state-owned Iraq National Oil Company (INOC), and its contracts were largely held by French, Russian, and Chinese companies. American and British oil majors were locked out.</p>
      <p>Within two years of the invasion, that had changed dramatically. The Coalition Provisional Authority (CPA), led by L. Paul Bremer III, issued Order 39, which opened Iraq's economy — including its oil sector — to full foreign ownership and profit repatriation. This was a radical restructuring of an entire nation's economic architecture, imposed by an occupying power with no democratic mandate from the Iraqi people.</p>
      <p>By 2009, Iraq's government had signed long-term service contracts with ExxonMobil, BP, Shell, and other Western majors. The contracts were structured as "technical service agreements," allowing companies to sidestep constitutional restrictions on foreign ownership of oil resources — but the economic benefits flowed primarily outward. Iraq's oil production today exceeds 4 million barrels per day, generating revenues of approximately $90 billion annually. And yet, according to the World Bank, 22.5% of Iraq's population lives in poverty, and basic infrastructure — electricity, clean water, healthcare — remains severely degraded compared to pre-war levels.</p>

      <h2>The Permanent Military Footprint</h2>
      <p>The US military's presence in Iraq was never simply about defeating Saddam Hussein. The Pentagon constructed a network of large, permanent-grade military installations — Balad Air Base, Camp Victory near Baghdad, and Ain al-Assad in Anbar Province — designed not for temporary occupation but for long-term strategic positioning in the heart of the Middle East.</p>
      <p>Ain al-Assad Air Base, which expanded significantly after 2003, now functions as one of the largest US military installations in the region. It hosts thousands of troops and contractor personnel, advanced surveillance systems, and serves as a key hub for US military operations across Iraq, Syria, and beyond. The base was never built for the Iraqi people. It was built for American strategic projection.</p>
      <p>The Status of Forces Agreement signed in 2008 nominally required US troop withdrawal by the end of 2011. US forces did formally withdraw — then returned in 2014 under the pretext of fighting ISIS, a terrorist group that emerged partly from the power vacuum the 2003 invasion created. Today, approximately 2,500 US troops remain in Iraq, with a much larger presence of contractors and intelligence personnel. The Iraqi parliament voted in January 2020 to expel all foreign troops following the US assassination of Iranian General Qasem Soleimani on Iraqi soil — an act of war conducted without Iraqi permission, on Iraqi territory. The US government largely ignored the vote.</p>

      <h2>The Human Cost: What the Numbers Actually Say</h2>
      <p>The Iraq Body Count project documented between 183,000 and 206,000 civilian deaths from direct violence between 2003 and 2019. The Lancet medical journal's 2006 study, using epidemiological methods, estimated approximately 655,000 excess deaths attributable to the war in the first three years alone — a figure disputed but never definitively refuted.</p>
      <p>Beyond the dead: an estimated 3.3 million Iraqis were internally displaced by the conflict. Millions more fled the country. Iraq's Christian community, which numbered approximately 1.5 million before 2003, has been reduced to fewer than 200,000 — a direct consequence of the sectarian violence the invasion unleashed. The country's professional class — doctors, engineers, academics — left in waves. This "brain drain" has impaired Iraq's capacity for reconstruction to this day.</p>
      <blockquote><p>"We came to Iraq to liberate it. Instead we destroyed the infrastructure of a state that had existed for millennia, and handed the pieces to competing factions and foreign interests."<br><em>— Former US Army Colonel, Congressional testimony, 2007</em></p></blockquote>

      <h2>The Looting of History</h2>
      <p>In the days following the fall of Baghdad in April 2003, the Iraq Museum — home to one of the world's greatest collections of ancient Mesopotamian artifacts — was looted. Approximately 15,000 objects were stolen, including items from Ur, Nineveh, and Babylon. US forces, which had been specifically briefed on the museum's location and importance by archaeologists before the invasion, did nothing to protect it. The Pentagon had detailed plans for protecting oil infrastructure. No equivalent plan existed for cultural heritage sites.</p>
      <p>Thousands of archaeological sites across Iraq were subsequently looted as the security vacuum persisted. Entire civilizations — Sumerian, Akkadian, Babylonian, Assyrian — had their material record plundered and sold on the international antiquities market, much of it ultimately appearing in Western private collections and institutions.</p>

      <h2>The IMF Conditions: Economic Exploitation Formalized</h2>
      <p>As Iraq attempted to rebuild its shattered economy, it turned to international financial institutions for support. The International Monetary Fund's assistance came with conditions — a familiar pattern known as "structural adjustment." Iraq was required to reduce fuel subsidies (which were critical for a population with already devastated purchasing power), privatize state enterprises, and liberalize trade in ways that exposed Iraqi industry to competition it could not survive.</p>
      <p>The result was predictable: unemployment spiked, the private sector did not materialize as promised, and the removal of subsidies hit the poorest Iraqis hardest. The conditions reflected not the interests of the Iraqi people but the ideological preferences of Western financial institutions and the economic interests of Western corporations positioned to benefit from an open Iraqi market.</p>

      <h2>What Continues Today</h2>
      <p>Iraq in 2026 is a country still living in the shadow of what was done to it. The sectarian political system imposed by the occupation — distributing power along ethnic and religious lines rather than civic ones — has produced a governing class characterized by endemic corruption, paralysis, and dependence on foreign patrons. Transparency International consistently ranks Iraq among the most corrupt countries in the world.</p>
      <p>US influence over Iraq's political system remains substantial, exercised through diplomatic pressure, military presence, and economic leverage. When Iraqi political leaders have moved too close to Iran or proposed policies unfavorable to US interests, American officials have intervened — sometimes publicly, sometimes covertly — to shape outcomes. This is not the behavior of a liberator. It is the behavior of an imperial power managing a client state.</p>
      <p>Meanwhile, Iraq's oil revenues, which should fund reconstruction and development, are siphoned off by corruption, mismanagement, and the financial terms of oil service agreements that were structured to benefit international companies. The Iraqi people — who own this oil by constitutional right — see a fraction of its value.</p>

      <h2>The Hard Conclusion</h2>
      <p>What happened in Iraq was not a failed liberation. It was a successful exploitation, dressed in the language of liberation. The weapons of mass destruction were a pretext. The democracy promotion was a pretext. The underlying reality was the projection of American power into a strategically vital region, the opening of Iraq's economy to Western capital, and the securing of long-term military positioning in the Middle East.</p>
      <p>The people who paid the price — in lives, in displacement, in destroyed infrastructure, in looted heritage, in a political system that serves everyone except them — were the Iraqis. More than two decades later, that bill is still being paid.</p>
      <p>The least we can do is stop pretending we don't know what happened.</p>
    `
  };

  return bodies[article.slug] || `<p>${article.excerpt}</p><p>Full article content coming soon.</p>`;
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
  document.title = cat + ' — HARDFACTS';

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
