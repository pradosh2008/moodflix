/* ============================================================
   HARDFACTS — Articles Data Store
   ============================================================ */

const ARTICLES = [
  {
    id: 1,
    slug: "usa-exploitation-iraq",
    title: "Oil, Power, and Deception: How the USA Has Exploited Iraq Since 2003",
    subtitle: "Two decades after an invasion justified by weapons that never existed, Iraq's oil flows outward while millions remain in poverty. A hard look at what really happened — and what continues today.",
    excerpt: "The 2003 invasion was sold as liberation. What followed — the oil contracts, the permanent military bases, the IMF conditions, the looted heritage — tells a darker and more consequential story.",
    category: "Geopolitics",
    author: { name: "Pradosh Kumar", initials: "PK", color: "#EC4899", role: "Investigative Reporter & Founder, HARDFACTS" },
    date: "March 1, 2026",
    dateISO: "2026-03-01",
    readTime: 15,
    featured: true,
    hero: true,
    tags: ["Iraq", "USA", "Oil", "War", "Geopolitics", "Middle East"],
    emoji: "🛢️",
    color: "#EC4899"
  }
];

const CATEGORIES = [
  { name: "Geopolitics", color: "#EC4899", desc: "Power, conflict, and the forces shaping the international order." }
];

function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug);
}

function getArticlesByCategory(cat) {
  return ARTICLES.filter(a => a.category === cat);
}

function getFeaturedArticles() {
  return ARTICLES.filter(a => a.featured);
}

function getLatestArticles(limit = 10) {
  return [...ARTICLES].sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO)).slice(0, limit);
}

function searchArticles(query) {
  const q = query.toLowerCase();
  return ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q) ||
    (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
  );
}

function getCategoryMeta(name) {
  return CATEGORIES.find(c => c.name === name);
}

function getRelatedArticles(article, limit = 3) {
  return ARTICLES
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, limit);
}
