/* ============================================================
   MERIDIAN — Articles Data Store
   All articles are managed here as a JS array.
   Add new articles by appending to the ARTICLES array.
   ============================================================ */

const ARTICLES = [
  {
    id: 1,
    slug: "ai-reshaping-global-labor-markets",
    title: "How Artificial Intelligence Is Quietly Reshaping Global Labor Markets",
    subtitle: "From white-collar automation to the rise of AI-proof skills, the employment landscape of 2026 looks nothing like economists predicted five years ago.",
    excerpt: "The narrative that AI would first displace factory workers before reaching knowledge workers has been inverted. New data reveals a more nuanced and unsettling picture.",
    category: "Technology",
    author: { name: "Sarah Chen", initials: "SC", color: "#3B82F6", role: "Tech Policy Analyst" },
    date: "March 1, 2026",
    dateISO: "2026-03-01",
    readTime: 9,
    featured: true,
    hero: true,
    tags: ["AI", "Labor", "Economics", "Future of Work"],
    emoji: "🤖",
    color: "#3B82F6"
  },
  {
    id: 2,
    slug: "dollar-dominance-twilight",
    title: "The Dollar's Twilight: Is Reserve Currency Status Finally Under Threat?",
    subtitle: "A coalition of emerging economies has quietly built the infrastructure for a parallel financial system. Here's what it means for global trade.",
    excerpt: "After decades of predictions that proved premature, a convergence of geopolitical realignments and digital currency infrastructure may be changing the calculus.",
    category: "Economy",
    author: { name: "Marcus Rivera", initials: "MR", color: "#10B981", role: "Macro Economist" },
    date: "February 27, 2026",
    dateISO: "2026-02-27",
    readTime: 12,
    featured: true,
    tags: ["Dollar", "BRICS", "Reserve Currency", "Global Finance"],
    emoji: "💵",
    color: "#10B981"
  },
  {
    id: 3,
    slug: "arctic-geopolitics-new-cold-war",
    title: "The Arctic's Melting Ice Is Opening a New Theater for Great Power Competition",
    subtitle: "As permafrost thaws, the geopolitical temperature is rising in ways that few policy frameworks were designed to handle.",
    excerpt: "Five nations with Arctic coastlines are racing to establish legal, military, and economic precedents in waters that were impassable a generation ago.",
    category: "Geopolitics",
    author: { name: "Elena Vasquez", initials: "EV", color: "#EC4899", role: "Foreign Policy Analyst" },
    date: "February 24, 2026",
    dateISO: "2026-02-24",
    readTime: 10,
    featured: true,
    tags: ["Arctic", "Geopolitics", "Climate", "Military"],
    emoji: "🧊",
    color: "#EC4899"
  },
  {
    id: 4,
    slug: "quantum-computing-cryptography-crisis",
    title: "The Cryptography Crisis No One Is Talking About",
    subtitle: "Quantum computers capable of breaking RSA encryption may arrive sooner than governments and banks are prepared for.",
    excerpt: "Security experts have long warned about 'Q-Day.' The timelines are collapsing faster than post-quantum standards can be deployed.",
    category: "Technology",
    author: { name: "David Park", initials: "DP", color: "#3B82F6", role: "Cybersecurity Researcher" },
    date: "February 22, 2026",
    dateISO: "2026-02-22",
    readTime: 8,
    featured: false,
    tags: ["Quantum", "Cybersecurity", "Encryption", "Technology"],
    emoji: "🔐",
    color: "#3B82F6"
  },
  {
    id: 5,
    slug: "urban-food-systems-vertical-farming",
    title: "Vertical Farms Are Finally Profitable — And They're Changing Urban Planning",
    subtitle: "After years of hype and failed ventures, a new generation of indoor agriculture companies has cracked the economics. The implications reach far beyond food.",
    excerpt: "The technology finally caught up with the vision. Now cities from Singapore to Detroit are redesigning zoning laws to accommodate agriculture as infrastructure.",
    category: "Environment",
    author: { name: "Amara Okonkwo", initials: "AO", color: "#06B6D4", role: "Urban Sustainability Reporter" },
    date: "February 20, 2026",
    dateISO: "2026-02-20",
    readTime: 7,
    featured: false,
    tags: ["Agriculture", "Cities", "Sustainability", "Food"],
    emoji: "🌿",
    color: "#06B6D4"
  },
  {
    id: 6,
    slug: "democratic-backsliding-measurement-problem",
    title: "Democratic Backsliding Has a Measurement Problem",
    subtitle: "Established indices disagree sharply on which countries are losing democratic quality — and the methodology gap matters for how we respond.",
    excerpt: "The V-Dem, Freedom House, and EIU indices reached conflicting conclusions about democratic trends in 14 countries last year. The divergence tells us something important.",
    category: "Politics",
    author: { name: "Thomas Müller", initials: "TM", color: "#EF4444", role: "Political Scientist" },
    date: "February 18, 2026",
    dateISO: "2026-02-18",
    readTime: 11,
    featured: false,
    tags: ["Democracy", "Governance", "Political Science", "Institutions"],
    emoji: "🗳️",
    color: "#EF4444"
  },
  {
    id: 7,
    slug: "longevity-research-inequality-access",
    title: "The Longevity Revolution Is Coming. Who Gets to Benefit?",
    subtitle: "Breakthroughs in aging biology are reaching clinical trials. The harder question is whether access will mirror every other medical innovation — or break the pattern.",
    excerpt: "Senolytics, NAD+ precursors, and partial reprogramming have moved from laboratory promise to human trials. The equity implications are only beginning to be debated.",
    category: "Science",
    author: { name: "Priya Nair", initials: "PN", color: "#8B5CF6", role: "Biomedical Science Writer" },
    date: "February 15, 2026",
    dateISO: "2026-02-15",
    readTime: 13,
    featured: false,
    tags: ["Longevity", "Biology", "Health", "Inequality"],
    emoji: "🧬",
    color: "#8B5CF6"
  },
  {
    id: 8,
    slug: "streaming-wars-cultural-homogenization",
    title: "The Streaming Wars Ended. Cultural Homogenization Won.",
    subtitle: "As platforms consolidate, the diversity of content that once defined the streaming era is quietly contracting. A cultural audit.",
    excerpt: "Three platforms now account for 71% of global streaming hours. The algorithmic monoculture that critics warned about has quietly materialized.",
    category: "Culture",
    author: { name: "James Oduya", initials: "JO", color: "#F59E0B", role: "Media Critic" },
    date: "February 13, 2026",
    dateISO: "2026-02-13",
    readTime: 8,
    featured: false,
    tags: ["Streaming", "Media", "Culture", "Technology"],
    emoji: "📺",
    color: "#F59E0B"
  },
  {
    id: 9,
    slug: "central-bank-digital-currencies-financial-inclusion",
    title: "CBDCs Promised Financial Inclusion. The Reality Is More Complicated.",
    subtitle: "Fourteen countries have launched central bank digital currencies. The early data on financial inclusion outcomes is instructive — and sobering.",
    excerpt: "The narrative was compelling: digital government money would bank the unbanked. But implementation gaps and design choices have produced uneven results.",
    category: "Economy",
    author: { name: "Marcus Rivera", initials: "MR", color: "#10B981", role: "Macro Economist" },
    date: "February 10, 2026",
    dateISO: "2026-02-10",
    readTime: 9,
    featured: false,
    tags: ["CBDC", "FinTech", "Financial Inclusion", "Central Banks"],
    emoji: "🏦",
    color: "#10B981"
  },
  {
    id: 10,
    slug: "south-china-sea-new-dynamics",
    title: "South China Sea: Why the Calculus Is Shifting in 2026",
    subtitle: "New alliances, altered patrol patterns, and a changed American posture have introduced instability into a region that had settled into a tense equilibrium.",
    excerpt: "The departure from the 2016 Hague ruling's contested status quo is accelerating. Three developments in the past six months have changed the strategic equation.",
    category: "Geopolitics",
    author: { name: "Elena Vasquez", initials: "EV", color: "#EC4899", role: "Foreign Policy Analyst" },
    date: "February 7, 2026",
    dateISO: "2026-02-07",
    readTime: 10,
    featured: false,
    tags: ["South China Sea", "China", "Asia", "Maritime Security"],
    emoji: "🌏",
    color: "#EC4899"
  },
  {
    id: 11,
    slug: "attention-economy-cognitive-science",
    title: "What Cognitive Science Actually Tells Us About the Attention Economy",
    subtitle: "Separating the well-established neuroscience from the pop-psychology narratives that dominate the screen-time debate.",
    excerpt: "The research on digital distraction is more nuanced, more contested, and more interesting than the discourse around it suggests.",
    category: "Science",
    author: { name: "Priya Nair", initials: "PN", color: "#8B5CF6", role: "Biomedical Science Writer" },
    date: "February 5, 2026",
    dateISO: "2026-02-05",
    readTime: 11,
    featured: false,
    tags: ["Neuroscience", "Attention", "Technology", "Cognitive Science"],
    emoji: "🧠",
    color: "#8B5CF6"
  },
  {
    id: 12,
    slug: "industrial-policy-returns",
    title: "The Return of Industrial Policy: What Three Years of Data Reveals",
    subtitle: "The IRA, CHIPS Act, and their European equivalents have produced their first generation of empirical results. The picture is neither triumphant nor damning.",
    excerpt: "Economists who declared industrial policy dead are reassessing. The new wave of government investment has defied both its advocates' promises and its critics' predictions.",
    category: "Economy",
    author: { name: "Sarah Chen", initials: "SC", color: "#10B981", role: "Economic Policy Writer" },
    date: "February 2, 2026",
    dateISO: "2026-02-02",
    readTime: 10,
    featured: false,
    tags: ["Industrial Policy", "Economics", "Government", "Manufacturing"],
    emoji: "🏭",
    color: "#10B981"
  }
];

// Categories metadata
const CATEGORIES = [
  { name: "Technology",   color: "#3B82F6", desc: "AI, quantum computing, cybersecurity, and the digital transformation of society." },
  { name: "Economy",      color: "#10B981", desc: "Global markets, monetary policy, trade, and the forces shaping financial systems." },
  { name: "Politics",     color: "#EF4444", desc: "Governance, institutions, electoral systems, and democratic theory." },
  { name: "Science",      color: "#8B5CF6", desc: "Biology, physics, medicine, and the frontiers of human knowledge." },
  { name: "Culture",      color: "#F59E0B", desc: "Media, art, ideas, and the forces shaping how we live and what we value." },
  { name: "Environment",  color: "#06B6D4", desc: "Climate, ecology, energy transition, and the politics of the natural world." },
  { name: "Geopolitics",  color: "#EC4899", desc: "Great power competition, regional conflicts, diplomacy, and international order." }
];

// Helper functions
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
