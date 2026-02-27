"use strict";

const BASE_INTERESTS = [
  { key: "tech", label: "Tech" },
  { key: "coffee", label: "Coffee/Tea" },
  { key: "fitness", label: "Fitness" },
  { key: "cooking", label: "Cooking" },
  { key: "outdoors", label: "Outdoors" },
  { key: "gaming", label: "Gaming" },
  { key: "books", label: "Books" },
  { key: "travel", label: "Travel" },
  { key: "style", label: "Style" },
  { key: "home", label: "Home" },
  { key: "experiences", label: "Experiences" }
];

const DEFAULT_STYLES = [
  { key: "practical", label: "Practical" },
  { key: "thoughtful", label: "Thoughtful" },
  { key: "fun", label: "Fun" },
  { key: "style", label: "Style" },
  { key: "luxury", label: "Luxury" },
  { key: "meaningful", label: "Meaningful" }
];

const SENTIMENTS = [
  { key: "low", label: "Low (useful gifts)" },
  { key: "med", label: "Medium (thoughtful + useful)" },
  { key: "high", label: "High (personal / keepsake)" }
];

const CURRENCY = "£";
const AMAZON_BASE = "https://www.amazon.co.uk/s?k=";
const AMAZON_TAG = "giftkind-21";
const AMAZON_MAX_LINKS = 7;
const AMAZON_EXACT_LINKS_ONLY = true;
const AMAZON_LINKS = typeof window !== "undefined" && window.AMAZON_LINKS ? window.AMAZON_LINKS : {};
const UNLOCK_KEY = "mdgf_unlocked";
const MAX_RESULTS = 8;
const LOCKED_RESULTS = 3;

const $ = (id) => document.getElementById(id);
const trackEvent = (name, params = {}) => {
  if (typeof window !== "undefined" && typeof window.trackEvent === "function") {
    window.trackEvent(name, params);
  }
};

const CATEGORY_GROUPS = [
  {
    title: "People",
    items: [
      "gifts-for-him",
      "gifts-for-her",
      "gifts-for-wife",
      "gifts-for-husband",
      "gifts-for-brother",
      "gifts-for-sister",
      "gifts-for-mother-in-law",
      "gifts-for-step-parents",
      "gifts-for-grandparents",
      "meaningful-gifts"
    ]
  },
  {
    title: "Occasions",
    items: [
      "fathers-day",
      "anniversary-1",
      "anniversary-5",
      "anniversary-10",
      "anniversary-15",
      "anniversary-20",
      "anniversary-25",
      "anniversary-30",
      "anniversary-40",
      "anniversary-50",
      "anniversary-60"
    ]
  },
  {
    title: "Milestone birthdays",
    items: ["birthday-18", "birthday-21", "birthday-30", "birthday-40", "birthday-50", "birthday-60"]
  },
  {
    title: "New baby and parents",
    items: ["baby-shower", "new-mum", "new-dad", "practical-baby-gifts"]
  },
  {
    title: "Teacher gifts",
    items: ["teacher-end-term", "teacher-end-year"]
  },
  {
    title: "Difficult to buy for",
    items: ["minimalist-gifts", "experience-gifts"]
  }
];

function buildSearchTerms(gift) {
  const base = gift.name.replace(/[()]/g, "").replace(/[^a-z0-9\s]/gi, "").trim();
  const terms = [
    base,
    `${base} gift`,
    `best ${base}`,
    `${base} set`,
    `luxury ${base}`,
    `${base} uk`
  ];
  return Array.from(new Set(terms)).filter((term) => term.length > 2).slice(0, AMAZON_MAX_LINKS);
}

function buildAmazonSearchUrl(term) {
  const trimmed = term.trim();
  if (!trimmed) return "";
  const tag = AMAZON_TAG && !AMAZON_TAG.includes("PASTE_") ? `&tag=${AMAZON_TAG}` : "";
  return `${AMAZON_BASE}${encodeURIComponent(trimmed)}${tag}`;
}

function ensureAmazonTag(url) {
  if (!AMAZON_TAG || AMAZON_TAG.includes("PASTE_")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.endsWith("amazon.co.uk") && !parsed.searchParams.get("tag")) {
      parsed.searchParams.set("tag", AMAZON_TAG);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

function asinsToLinks(asins, giftName) {
  return asins.slice(0, AMAZON_MAX_LINKS).map((asin, index) => ({
    label: `${giftName} option ${index + 1}`,
    url: `https://www.amazon.co.uk/dp/${asin}`
  }));
}

function buildAffiliateLinks(gift) {
  let links = [];

  if (Array.isArray(gift.links) && gift.links.length) {
    links = gift.links;
  } else if (Array.isArray(gift.asins) && gift.asins.length) {
    links = asinsToLinks(gift.asins, gift.name);
  } else if (AMAZON_LINKS[gift.name]) {
    const entry = AMAZON_LINKS[gift.name];
    if (Array.isArray(entry)) {
      links = entry;
    } else if (entry && Array.isArray(entry.asins)) {
      links = asinsToLinks(entry.asins, gift.name);
    }
  }

  if (links.length) {
    return links
      .slice(0, AMAZON_MAX_LINKS)
      .map((link) => ({
        label: link.label || gift.name,
        url: ensureAmazonTag(link.url)
      }))
      .filter((link) => link.url);
  }

  if (AMAZON_EXACT_LINKS_ONLY) {
    return [];
  }

  const terms = gift.searchTerms && gift.searchTerms.length ? gift.searchTerms : buildSearchTerms(gift);
  return terms
    .slice(0, AMAZON_MAX_LINKS)
    .map((term) => ({
      label: term,
      url: buildAmazonSearchUrl(term)
    }))
    .filter((link) => link.url);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function prettyTag(tag) {
  const map = {
    low: "useful",
    med: "thoughtful",
    high: "keepsake",
    practical: "practical",
    fun: "fun",
    style: "style",
    luxury: "luxury",
    meaningful: "meaningful"
  };
  return map[tag] || tag;
}

function isUnlocked() {
  return localStorage.getItem(UNLOCK_KEY) === "true";
}

function setUnlocked(value) {
  localStorage.setItem(UNLOCK_KEY, value ? "true" : "false");
}

function buildSummary(category, options, total) {
  const card = document.createElement("div");
  card.className = "panel summary";
  const interestLabels = options.interests.length
    ? options.interests.map((key) => labelFor(BASE_INTERESTS, key)).join(", ")
    : "None";
  card.innerHTML = `
    <strong>Top picks</strong>
    <div class="small">Category: ${category.label} | Budget: up to ${CURRENCY}${options.budget} | Style: ${labelFor(category.styles || DEFAULT_STYLES, options.style)} | Sentiment: ${sentimentLabel(options.sentiment)} | Interests: ${interestLabels}</div>
    <div class="small">${total} matches found.</div>
  `;
  return card;
}

function buildResultCard(gift, delay, locked) {
  const card = document.createElement("div");
  card.className = `result${locked ? " locked" : ""}`;
  card.style.animationDelay = `${delay}ms`;
  const tags = gift.tags
    .filter((tag) => ["low", "med", "high", "practical", "fun", "style", "luxury", "meaningful", "tech", "coffee", "fitness", "cooking", "outdoors", "gaming", "books", "travel", "home", "experiences"].includes(tag))
    .slice(0, 3)
    .map((tag) => `<span class="pill">${prettyTag(tag)}</span>`)
    .join("");
  const links = buildAffiliateLinks(gift);
  const safeGift = escapeHtml(gift.name);
  const linkHtml = links
    .map((link, index) => {
      const safeLabel = escapeHtml(link.label || gift.name);
      return `<a href="${link.url}" target="_blank" rel="sponsored nofollow noopener" data-affiliate-link="amazon" data-gift="${safeGift}" data-position="${index + 1}">${safeLabel}</a>`;
    })
    .join("");
  const linksBlock = links.length
    ? `
      <div class="buy">
        <div class="buy-title">Where to buy</div>
        <div class="buy-note">View options on Amazon.</div>
        <div class="buy-links">${linkHtml}</div>
      </div>
    `
    : "";

  card.innerHTML = `
    <div class="result-header">
      <div>
        <div class="result-title">${gift.name}</div>
        <div class="result-why">${gift.why}</div>
        <div class="tags">${tags}</div>
        ${linksBlock}
      </div>
      <div class="price">
        <strong>~${CURRENCY}${gift.price}</strong>
        <div class="small">typical</div>
      </div>
    </div>
  `;

  return card;
}

function buildPaywall() {
  const wrap = document.createElement("div");
  wrap.className = "paywall";
  wrap.innerHTML = `
    <h3>Unlock full results</h3>
    <div class="small">Get all matching ideas plus a bonus section with card message prompts and where-to-buy notes.</div>
    <button type="button">Unlock full results for ${CURRENCY}1.99</button>
    <div class="tiny">Secure checkout powered by Stripe.</div>
  `;
  wrap.querySelector("button").addEventListener("click", () => {
    startCheckout();
  });
  return wrap;
}

function buildUnlockNote() {
  const wrap = document.createElement("div");
  wrap.className = "unlock-note";
  wrap.innerHTML = `
    <span class="pill success">Unlocked</span>
    <div class="small">Full results are visible on this device.</div>
    <button type="button" class="link-button">Lock again</button>
  `;
  wrap.querySelector("button").addEventListener("click", () => {
    setUnlocked(false);
    generate();
  });
  return wrap;
}

function sentimentLabel(value) {
  if (value === "high") return "High (keepsake)";
  if (value === "low") return "Low (useful)";
  return "Medium";
}

function labelFor(items, key) {
  const match = items.find((item) => item.key === key);
  return match ? match.label : key;
}

function parseAvoid(text) {
  return text
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function selectedInterests(list) {
  return list
    .map((interest) => ({
      key: interest.key,
      checked: $("interest_" + interest.key).checked
    }))
    .filter((interest) => interest.checked)
    .map((interest) => interest.key);
}

function renderInterests(list) {
  const wrap = $("interestChecks");
  wrap.innerHTML = "";
  list.forEach((interest) => {
    const id = `interest_${interest.key}`;
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" id="${id}" value="${interest.key}" />${interest.label}`;
    wrap.appendChild(label);
  });
}

function fillSelect(id, items, defaultKey) {
  const el = $(id);
  el.innerHTML = items
    .map((item) => {
      const selected = item.key === defaultKey ? "selected" : "";
      return `<option value="${item.key}" ${selected}>${item.label}</option>`;
    })
    .join("");
}

function buildCategoryCards(categories) {
  const wrap = $("categoryGrid");
  wrap.innerHTML = "";
  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "occasion-card";
    card.innerHTML = `
      <h3>${category.label}</h3>
      <p>${category.description}</p>
      <button type="button" class="occasion-cta" data-category="${category.id}">Start ${category.label}</button>
    `;
    wrap.appendChild(card);
  });
}

function scrollResultsIntoView() {
  const results = $("results");
  if (!results) return;
  window.requestAnimationFrame(() => {
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id) || CATEGORIES[0];
}

function scoreGift(gift, options) {
  let score = 0;

  if (gift.price > options.budget) return -999;

  if (gift.tags.includes(options.style)) score += 3;
  if (gift.tags.includes(options.sentiment)) score += 2;

  options.interests.forEach((interest) => {
    if (gift.tags.includes(interest)) score += 2;
  });

  options.avoid.forEach((word) => {
    if (gift.name.toLowerCase().includes(word)) score -= 3;
  });

  const budgetDistance = Math.abs(options.budget - gift.price) / options.budget;
  score += Math.max(0, 2 - budgetDistance * 2);

  return score;
}

function generate(source = "auto") {
  const category = getCategory($("category").value);
  const interestList = category.interests || BASE_INTERESTS;
  const options = {
    budget: parseInt($("budget").value, 10),
    style: $("giftStyle").value,
    sentiment: $("sentiment").value,
    avoid: parseAvoid($("avoid").value),
    interests: selectedInterests(interestList)
  };

  const scored = category.gifts
    .map((gift) => ({ gift, score: scoreGift(gift, options) }))
    .filter((item) => item.score > -100)
    .sort((a, b) => b.score - a.score);

  const results = $("results");
  results.innerHTML = `<p class="small results-disclosure">Some links are affiliate links. As an Amazon Associate I earn from qualifying purchases.</p>`;

  if (!scored.length) {
    if (source === "submit") {
      trackEvent("finder_submit", {
        category: category.id,
        budget: options.budget,
        style: options.style,
        sentiment: options.sentiment,
        interests_count: options.interests.length
      });
      trackEvent("results_shown", { total_matches: 0, unlocked: isUnlocked() ? "yes" : "no" });
    }
    results.innerHTML += `<div class="panel">No matches found. Try a higher budget or fewer avoid keywords.</div>`;
    return;
  }

  results.appendChild(buildSummary(category, options, scored.length));

  const unlocked = isUnlocked();
  const limit = unlocked ? MAX_RESULTS : LOCKED_RESULTS;

  if (source === "submit") {
    trackEvent("finder_submit", {
      category: category.id,
      budget: options.budget,
      style: options.style,
      sentiment: options.sentiment,
      interests_count: options.interests.length
    });
    trackEvent("results_shown", { total_matches: scored.length, unlocked: unlocked ? "yes" : "no" });
  }

  scored.slice(0, limit).forEach((item, index) => {
    results.appendChild(buildResultCard(item.gift, index * 40, false));
  });

  if (!unlocked && scored.length > limit) {
    const previewCount = Math.min(3, scored.length - limit);
    for (let i = 0; i < previewCount; i += 1) {
      results.appendChild(buildResultCard(scored[limit + i].gift, (limit + i) * 40, true));
    }
    results.appendChild(buildPaywall());
    if (source === "submit") {
      trackEvent("paywall_shown", { total_matches: scored.length, preview_count: previewCount });
    }
  } else if (unlocked) {
    results.appendChild(buildUnlockNote());
  }
}

async function startCheckout() {
  try {
    trackEvent("checkout_start", { source: "paywall" });
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: 1,
        returnPath: window.location.pathname + window.location.search
      })
    });
    if (!response.ok) {
      throw new Error("Checkout unavailable");
    }
    const data = await response.json();
    if (data && data.url) {
      window.location.href = data.url;
      return;
    }
    throw new Error("Missing checkout URL");
  } catch (error) {
    alert("Checkout is unavailable right now. Please try again in a moment.");
  }
}

function trackUnlockFromQuery() {
  const params = new URLSearchParams(window.location.search);
  let changed = false;
  if (params.get("unlocked") === "1") {
    trackEvent("unlock_success", { method: "stripe" });
    params.delete("unlocked");
    changed = true;
  }
  if (params.get("unlock_failed") === "1") {
    trackEvent("unlock_failed", { method: "stripe" });
    params.delete("unlock_failed");
    changed = true;
  }
  if (changed) {
    const query = params.toString();
    const nextUrl = window.location.pathname + (query ? `?${query}` : "") + window.location.hash;
    window.history.replaceState({}, "", nextUrl);
  }
}

function getCategoryGroups() {
  return CATEGORY_GROUPS.map((group) => ({
    title: group.title,
    items: group.items.map((id) => getCategory(id)).filter(Boolean)
  }));
}

function populateCategorySelect() {
  const select = $("category");
  select.innerHTML = "";
  getCategoryGroups().forEach((group) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group.title;
    group.items.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.label;
      optgroup.appendChild(option);
    });
    select.appendChild(optgroup);
  });
}

function updateCategoryUI(category) {
  const styles = category.styles || DEFAULT_STYLES;
  fillSelect("giftStyle", styles, styles[0].key);
  fillSelect("sentiment", SENTIMENTS, "med");
  renderInterests(category.interests || BASE_INTERESTS);
}

function initCategoryCards() {
  const categories = getCategoryGroups().flatMap((group) => group.items);
  buildCategoryCards(categories);
  $("categoryGrid").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    const categoryId = button.dataset.category;
    $("category").value = categoryId;
    updateCategoryUI(getCategory(categoryId));
    $("finderForm").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const CATEGORIES = buildCategories();

function buildCategories() {
  const makeGiftsFor = (label, baseTags = []) => ([
    { name: "Personalised keepsake keyring", price: 15, tags: ["meaningful", "high", ...baseTags], why: `A small keepsake that feels personal for ${label.toLowerCase()}.` },
    { name: "Everyday self-care kit", price: 24, tags: ["style", "med", ...baseTags], why: "A thoughtful upgrade without guessing sizes." },
    { name: "Quality travel mug", price: 18, tags: ["practical", "med", "coffee", ...baseTags], why: "Useful every day and easy to buy." },
    { name: "Experience voucher", price: 45, tags: ["experiences", "high", "meaningful", ...baseTags], why: "Memorable without worrying about taste." },
    { name: "Smart organiser pouch", price: 20, tags: ["practical", "tech", ...baseTags], why: "Keeps cables, essentials, and gadgets tidy." },
    { name: "Luxury candle or diffuser", price: 28, tags: ["style", "home", "med", ...baseTags], why: "Instant atmosphere for their space." }
  ]);

  const milestoneGifts = (age) => ([
    { name: `Milestone ${age} photo book`, price: 28, tags: ["meaningful", "high", "home"], why: "A keepsake filled with memories so far." },
    { name: "Experience voucher", price: 50, tags: ["experiences", "high"], why: "Lets them choose something exciting." },
    { name: "Premium drink or snack hamper", price: 35, tags: ["fun", "med"], why: "Celebratory but easy to enjoy." },
    { name: "Personalised milestone print", price: 22, tags: ["meaningful", "high", "home"], why: "Looks great on a wall or desk." },
    { name: "Tech or home upgrade", price: 45, tags: ["practical", "tech"], why: "A gift they will actually use." },
    { name: "Stylish accessory upgrade", price: 30, tags: ["style", "med"], why: "Feels special without being over the top." }
  ]);

  const anniversaryGifts = (year, theme, materialTag) => ([
    { name: `${theme} keepsake photo print`, price: 22, tags: ["meaningful", "high", materialTag], why: `A ${theme.toLowerCase()}-inspired keepsake for year ${year}.` },
    { name: `${theme} gift set`, price: 35, tags: ["thoughtful", "med", materialTag], why: "Theme-aligned but still practical." },
    { name: "Experience voucher for two", price: 60, tags: ["experiences", "high"], why: "Celebrate together with a shared memory." },
    { name: "Personalised message card", price: 15, tags: ["meaningful", "high", materialTag], why: "Small, romantic, and on theme." },
    { name: `${theme} home accent`, price: 28, tags: ["home", "style", materialTag], why: "A subtle nod to the anniversary year." },
    { name: `${theme} accessory upgrade`, price: 40, tags: ["style", "med", materialTag], why: "Feels special without being too much." }
  ]);

  return [
    {
      id: "gifts-for-him",
      label: "Gifts for Him",
      description: "Practical upgrades, tech picks, and easy wins.",
      styles: DEFAULT_STYLES,
      gifts: makeGiftsFor("him", ["tech", "practical"])
    },
    {
      id: "gifts-for-her",
      label: "Gifts for Her",
      description: "Thoughtful, stylish, and meaningful ideas.",
      styles: DEFAULT_STYLES,
      gifts: makeGiftsFor("her", ["style", "thoughtful"])
    },
    {
      id: "gifts-for-wife",
      label: "Gifts for Wife",
      description: "Romantic, thoughtful, and special ideas.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Personalised jewellery", price: 55, tags: ["meaningful", "high", "style"], why: "A keepsake she can wear every day." },
        { name: "Luxury self-care set", price: 35, tags: ["style", "med"], why: "A pamper gift that feels indulgent." },
        { name: "Date night experience voucher", price: 60, tags: ["experiences", "high"], why: "Creates a shared memory together." },
        { name: "Custom photo book", price: 28, tags: ["meaningful", "high", "home"], why: "A romantic, personal keepsake." },
        { name: "Cashmere-style scarf", price: 40, tags: ["style", "med"], why: "A wearable upgrade she will love." },
        { name: "Candle and diffuser duo", price: 30, tags: ["home", "thoughtful"], why: "Instant atmosphere for her space." }
      ]
    },
    {
      id: "gifts-for-husband",
      label: "Gifts for Husband",
      description: "Everyday upgrades with a thoughtful touch.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Leather wallet upgrade", price: 35, tags: ["practical", "style"], why: "A simple upgrade he will use daily." },
        { name: "Wireless earbuds", price: 45, tags: ["tech", "practical"], why: "Great for commuting and workouts." },
        { name: "Personalised keyring", price: 15, tags: ["meaningful", "high"], why: "Small keepsake without being too much." },
        { name: "Coffee subscription sampler", price: 25, tags: ["coffee", "thoughtful"], why: "A fun upgrade for his routine." },
        { name: "Weekend duffel bag", price: 55, tags: ["travel", "practical"], why: "Useful for trips and gym." },
        { name: "Experience voucher", price: 60, tags: ["experiences", "high"], why: "Lets him pick something fun." }
      ]
    },
    {
      id: "gifts-for-brother",
      label: "Gifts for Brother",
      description: "Fun, practical, and easy ideas for him.",
      styles: DEFAULT_STYLES,
      gifts: makeGiftsFor("your brother", ["fun", "tech"])
    },
    {
      id: "gifts-for-sister",
      label: "Gifts for Sister",
      description: "Thoughtful treats and practical upgrades.",
      styles: DEFAULT_STYLES,
      gifts: makeGiftsFor("your sister", ["style", "home"])
    },
    {
      id: "gifts-for-mother-in-law",
      label: "Gifts for Mother-in-law",
      description: "Warm, thoughtful, and easy to buy.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Thank-you gift box", price: 28, tags: ["meaningful", "high", "home"], why: "Warm and thoughtful without trying too hard." },
        { name: "Quality hand cream set", price: 18, tags: ["style", "med"], why: "Feels premium without being expensive." },
        { name: "Tea or coffee sampler", price: 20, tags: ["coffee", "thoughtful"], why: "An easy, thoughtful treat." },
        { name: "Personalised name print", price: 25, tags: ["meaningful", "high", "home"], why: "A keepsake for her space." },
        { name: "Cosy throw blanket", price: 30, tags: ["home", "practical"], why: "Always useful and comforting." },
        { name: "Afternoon tea voucher", price: 45, tags: ["experiences", "high"], why: "A special shared experience." }
      ]
    },
    {
      id: "gifts-for-step-parents",
      label: "Gifts for Step Parents",
      description: "Thoughtful and neutral gifts that feel considerate.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Personalised photo print", price: 22, tags: ["meaningful", "high", "home"], why: "A keepsake that feels personal." },
        { name: "Luxury candle", price: 24, tags: ["style", "med", "home"], why: "Neutral and easy to enjoy." },
        { name: "Coffee or tea sampler", price: 18, tags: ["coffee", "thoughtful"], why: "Small treat that feels considerate." },
        { name: "Cosy blanket", price: 30, tags: ["home", "practical"], why: "Comfortable and always useful." },
        { name: "Shared experience voucher", price: 50, tags: ["experiences", "high"], why: "Time together without pressure." },
        { name: "Personalised notebook", price: 16, tags: ["meaningful", "med"], why: "Thoughtful without being too personal." }
      ]
    },
    {
      id: "gifts-for-grandparents",
      label: "Grandparents gifts",
      description: "Keepsakes and comfort gifts they will love.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Family photo book", price: 28, tags: ["meaningful", "high", "home"], why: "A keepsake they can revisit anytime." },
        { name: "Personalised calendar", price: 25, tags: ["meaningful", "high"], why: "A full year of family memories." },
        { name: "Cosy throw blanket", price: 30, tags: ["home", "practical"], why: "Comfort for everyday use." },
        { name: "Story journal", price: 20, tags: ["meaningful", "high", "books"], why: "Captures their stories and memories." },
        { name: "Tea sampler and biscuits", price: 18, tags: ["coffee", "thoughtful"], why: "A small, thoughtful treat." },
        { name: "Photo frame set", price: 22, tags: ["home", "meaningful"], why: "Instantly personal and sentimental." }
      ]
    },
    {
      id: "meaningful-gifts",
      label: "Meaningful gifts",
      description: "Gifts that feel personal and lasting.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Custom photo book", price: 28, tags: ["meaningful", "high", "home"], why: "A keepsake filled with memories." },
        { name: "Personalised jewellery", price: 55, tags: ["meaningful", "high", "style"], why: "A timeless keepsake they can wear." },
        { name: "Handwritten letter kit", price: 12, tags: ["meaningful", "high", "fun"], why: "Simple but heartfelt." },
        { name: "Memory jar set", price: 18, tags: ["meaningful", "high", "home"], why: "Capture moments throughout the year." },
        { name: "Custom name print", price: 24, tags: ["meaningful", "high", "home"], why: "Personal wall art with meaning." },
        { name: "Experience voucher", price: 50, tags: ["experiences", "high"], why: "Create a shared memory together." }
      ]
    },
    {
      id: "fathers-day",
      label: "Father's Day",
      description: "Practical, thoughtful, and easy wins for dad.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "BBQ tool set", price: 28, tags: ["fun", "home", "med"], why: "Great if he enjoys grilling." },
        { name: "Insulated travel mug", price: 18, tags: ["practical", "coffee"], why: "Useful every day." },
        { name: "Leather key organiser", price: 20, tags: ["practical", "style"], why: "Keeps his essentials tidy." },
        { name: "Grooming kit", price: 22, tags: ["style", "med"], why: "An easy upgrade." },
        { name: "Experience voucher", price: 50, tags: ["experiences", "high"], why: "Let him choose his ideal day." },
        { name: "Personalised photo print", price: 24, tags: ["meaningful", "high"], why: "A keepsake he will love." }
      ]
    },
    {
      id: "birthday-18",
      label: "18th birthday",
      description: "Celebrate the big 18 with memorable picks.",
      styles: DEFAULT_STYLES,
      gifts: milestoneGifts(18)
    },
    {
      id: "birthday-21",
      label: "21st birthday",
      description: "Fun and meaningful ideas for 21.",
      styles: DEFAULT_STYLES,
      gifts: milestoneGifts(21)
    },
    {
      id: "birthday-30",
      label: "30th birthday",
      description: "Celebrate 30 with upgrades and keepsakes.",
      styles: DEFAULT_STYLES,
      gifts: milestoneGifts(30)
    },
    {
      id: "birthday-40",
      label: "40th birthday",
      description: "Thoughtful and premium ideas for 40.",
      styles: DEFAULT_STYLES,
      gifts: milestoneGifts(40)
    },
    {
      id: "birthday-50",
      label: "50th birthday",
      description: "Celebrate 50 with something memorable.",
      styles: DEFAULT_STYLES,
      gifts: milestoneGifts(50)
    },
    {
      id: "birthday-60",
      label: "60th birthday",
      description: "Classic and meaningful gifts for 60.",
      styles: DEFAULT_STYLES,
      gifts: milestoneGifts(60)
    },
    {
      id: "baby-shower",
      label: "Baby shower gifts",
      description: "Registry-friendly and practical picks.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Muslin bundle", price: 15, tags: ["practical", "med"], why: "A baby essential new parents always need." },
        { name: "Baby milestone cards", price: 12, tags: ["meaningful", "high"], why: "Keepsake moments made easy." },
        { name: "Soft swaddle set", price: 20, tags: ["practical", "med"], why: "Useful from day one." },
        { name: "Nursery night light", price: 22, tags: ["home", "practical"], why: "Helpful for late-night feeds." },
        { name: "Personalised baby blanket", price: 28, tags: ["meaningful", "high"], why: "A keepsake they will keep." },
        { name: "New parent snack box", price: 18, tags: ["fun", "med"], why: "A thoughtful practical treat." }
      ]
    },
    {
      id: "new-mum",
      label: "Gifts for new mums",
      description: "Comfort and care for a new mum.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Postpartum care kit", price: 28, tags: ["practical", "med"], why: "Supportive and useful." },
        { name: "Hydration tumbler", price: 18, tags: ["practical", "coffee"], why: "Helps with long days and nights." },
        { name: "Self-care mini kit", price: 22, tags: ["style", "med"], why: "A gentle reminder to rest." },
        { name: "Baby memory journal", price: 20, tags: ["meaningful", "high"], why: "Capture the first-year moments." },
        { name: "Cosy robe", price: 35, tags: ["style", "med"], why: "Comfort for home." },
        { name: "Meal delivery voucher", price: 40, tags: ["practical", "high"], why: "A lifesaver in the early weeks." }
      ]
    },
    {
      id: "new-dad",
      label: "Gifts for new dads",
      description: "Practical gifts that make dad life easier.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Baby carrier", price: 45, tags: ["practical", "med"], why: "Hands-free time with baby." },
        { name: "Coffee subscription sampler", price: 25, tags: ["coffee", "thoughtful"], why: "Fuel for early mornings." },
        { name: "Dad survival kit", price: 20, tags: ["fun", "med"], why: "A lighthearted, useful bundle." },
        { name: "Personalised dad keyring", price: 15, tags: ["meaningful", "high"], why: "Small keepsake with meaning." },
        { name: "Tech organiser pouch", price: 16, tags: ["practical", "tech"], why: "Keeps essentials tidy." },
        { name: "Weekend meal voucher", price: 40, tags: ["practical", "high"], why: "One less thing to think about." }
      ]
    },
    {
      id: "practical-baby-gifts",
      label: "Practical baby gifts",
      description: "Essentials parents actually use.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Nappy caddy organiser", price: 18, tags: ["practical", "med"], why: "Keeps baby essentials together." },
        { name: "Muslin and burp cloth set", price: 14, tags: ["practical", "med"], why: "Always needed." },
        { name: "Baby bath kit", price: 24, tags: ["practical", "med"], why: "Useful from the first weeks." },
        { name: "Thermal bottle bag", price: 20, tags: ["practical", "med"], why: "Keeps feeds warm or cool." },
        { name: "Baby first aid kit", price: 22, tags: ["practical", "high"], why: "Great to have on hand." },
        { name: "Cotton sleep sacks", price: 25, tags: ["practical", "med"], why: "Everyday essentials." }
      ]
    },
    {
      id: "anniversary-1",
      label: "1st anniversary (paper)",
      description: "Paper-themed gifts with meaning.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(1, "Paper", "paper")
    },
    {
      id: "anniversary-5",
      label: "5th anniversary (wood)",
      description: "Wood-themed keepsakes and upgrades.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(5, "Wood", "wood")
    },
    {
      id: "anniversary-10",
      label: "10th anniversary (tin)",
      description: "Tin-themed gifts that feel special.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(10, "Tin", "tin")
    },
    {
      id: "anniversary-15",
      label: "15th anniversary (crystal)",
      description: "Crystal-inspired gifts and keepsakes.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(15, "Crystal", "crystal")
    },
    {
      id: "anniversary-20",
      label: "20th anniversary (china)",
      description: "China-inspired gifts with elegance.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(20, "China", "china")
    },
    {
      id: "anniversary-25",
      label: "25th anniversary (silver)",
      description: "Silver-themed gifts for a big milestone.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(25, "Silver", "silver")
    },
    {
      id: "anniversary-30",
      label: "30th anniversary (pearl)",
      description: "Pearl-inspired gifts for year 30.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(30, "Pearl", "pearl")
    },
    {
      id: "anniversary-40",
      label: "40th anniversary (ruby)",
      description: "Ruby-inspired gifts with meaning.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(40, "Ruby", "ruby")
    },
    {
      id: "anniversary-50",
      label: "50th anniversary (gold)",
      description: "Gold-themed gifts for a golden year.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(50, "Gold", "gold")
    },
    {
      id: "anniversary-60",
      label: "60th anniversary (diamond)",
      description: "Diamond-inspired gifts for 60 years.",
      styles: DEFAULT_STYLES,
      gifts: anniversaryGifts(60, "Diamond", "diamond")
    },
    {
      id: "teacher-end-term",
      label: "Teacher gifts (end of term)",
      description: "Thank-you gifts for teachers.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Thank-you card and stationery set", price: 12, tags: ["thoughtful", "meaningful"], why: "Simple and heartfelt." },
        { name: "Coffee shop voucher", price: 15, tags: ["practical", "med", "coffee"], why: "An easy, appreciated treat." },
        { name: "Desk plant", price: 14, tags: ["home", "style"], why: "Brightens their space." },
        { name: "Premium pens set", price: 18, tags: ["practical", "med"], why: "Useful for daily work." },
        { name: "Mini self-care kit", price: 20, tags: ["style", "med"], why: "A thoughtful little treat." },
        { name: "Personalised mug or tumbler", price: 16, tags: ["thoughtful", "home"], why: "Personal but still useful." }
      ]
    },
    {
      id: "teacher-end-year",
      label: "Teacher gifts (end of year)",
      description: "A bigger thank-you for the year.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Gift box with treats", price: 25, tags: ["thoughtful", "med"], why: "Feels generous and easy." },
        { name: "Personalised thank-you print", price: 22, tags: ["meaningful", "high"], why: "A lasting keepsake." },
        { name: "Spa or coffee voucher", price: 25, tags: ["practical", "med"], why: "Lets them choose." },
        { name: "Desk organiser set", price: 20, tags: ["practical", "med"], why: "Useful for the classroom." },
        { name: "Luxury candle", price: 24, tags: ["style", "home"], why: "A premium thank-you." },
        { name: "Class photo book", price: 28, tags: ["meaningful", "high"], why: "A thoughtful year-end gift." }
      ]
    },
    {
      id: "minimalist-gifts",
      label: "Minimalist gifts",
      description: "Clean, simple gifts with purpose.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Minimalist cardholder", price: 18, tags: ["practical", "style"], why: "Simple, sleek, and useful." },
        { name: "Neutral candle", price: 20, tags: ["home", "style"], why: "Minimal and calming." },
        { name: "Quality notebook", price: 16, tags: ["practical", "thoughtful"], why: "A simple, useful gift." },
        { name: "Single-origin coffee", price: 14, tags: ["coffee", "thoughtful"], why: "A minimal but premium treat." },
        { name: "Everyday tote bag", price: 22, tags: ["practical", "style"], why: "Useful without clutter." },
        { name: "Experience voucher", price: 40, tags: ["experiences", "high"], why: "No extra stuff to store." }
      ]
    },
    {
      id: "experience-gifts",
      label: "Experience gifts",
      description: "Memories over things.",
      styles: DEFAULT_STYLES,
      gifts: [
        { name: "Local tasting voucher", price: 45, tags: ["experiences", "high"], why: "A fun day out." },
        { name: "Spa or wellness voucher", price: 55, tags: ["experiences", "high"], why: "Relaxing and memorable." },
        { name: "Cooking class voucher", price: 50, tags: ["experiences", "high", "cooking"], why: "Great for food lovers." },
        { name: "Adventure day voucher", price: 60, tags: ["experiences", "high", "outdoors"], why: "For thrill seekers." },
        { name: "Cinema and dinner bundle", price: 40, tags: ["experiences", "med"], why: "Classic and easy." },
        { name: "Subscription experience box", price: 45, tags: ["experiences", "med"], why: "A gift that repeats." }
      ]
    }
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  populateCategorySelect();
  initCategoryCards();
  trackUnlockFromQuery();
  const initialCategory = CATEGORIES[0];
  updateCategoryUI(initialCategory);
  const results = $("results");
  results.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-affiliate-link]");
    if (!link) return;
    const params = {
      gift: link.dataset.gift || "unknown",
      destination: link.dataset.affiliateLink || "amazon"
    };
    if (link.dataset.position) {
      params.position = Number(link.dataset.position);
    }
    trackEvent("affiliate_click", params);
  });
  $("category").addEventListener("change", (event) => {
    updateCategoryUI(getCategory(event.target.value));
  });
  $("finderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    generate("submit");
    scrollResultsIntoView();
  });
  generate("auto");
});
