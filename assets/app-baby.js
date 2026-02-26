const INTERESTS = [
  { key: "essentials", label: "Essentials" },
  { key: "sleep", label: "Sleep" },
  { key: "feeding", label: "Feeding" },
  { key: "bath", label: "Bath time" },
  { key: "nursery", label: "Nursery" },
  { key: "travel", label: "On-the-go" },
  { key: "books", label: "Books" },
  { key: "selfcare", label: "Parent self-care" },
  { key: "eco", label: "Eco/organic" },
  { key: "tech", label: "Tech" }
];

const RECIPIENTS = [
  { key: "parents", label: "Parents-to-be" },
  { key: "mum", label: "New mum" },
  { key: "dad", label: "New dad" },
  { key: "both", label: "Both parents" }
];

const TYPES = [
  { key: "practical", label: "Practical essentials" },
  { key: "sentimental", label: "Sentimental keepsake" },
  { key: "selfcare", label: "Parent self-care" },
  { key: "eco", label: "Eco or organic" },
  { key: "tech", label: "Tech-friendly" },
  { key: "budget", label: "Budget-friendly" }
];

const GIFTS = [
  { name: "Muslin swaddle set", price: 12, tags: ["practical", "essentials", "med", "parents", "both"], why: "Soft, breathable, and used daily." },
  { name: "Baby socks gift set", price: 10, tags: ["budget", "essentials", "practical", "parents", "both"], why: "A simple add-on that always gets used." },
  { name: "Board book bundle", price: 12, tags: ["sentimental", "books", "med", "parents", "both"], why: "Early story time favorites." },
  { name: "Milestone cards", price: 14, tags: ["sentimental", "nursery", "high", "parents", "mum", "both"], why: "Great for capturing month-by-month moments." },
  { name: "Baby bibs set", price: 9, tags: ["budget", "feeding", "practical", "parents", "both"], why: "Feeding time essential that saves outfits." },
  { name: "Teething toy set", price: 15, tags: ["practical", "budget", "parents", "both", "eco"], why: "Helpful and easy to keep on hand." },
  { name: "Nappy caddy organiser", price: 18, tags: ["practical", "essentials", "med", "parents", "both"], why: "Keeps diapers and wipes in one place." },
  { name: "Hooded towel and washcloths", price: 20, tags: ["practical", "bath", "med", "parents", "both"], why: "Makes bath time cosy and easier." },
  { name: "Baby bath essentials set", price: 22, tags: ["practical", "bath", "med", "parents", "both"], why: "All the basics in one easy bundle." },
  { name: "Nursery night light", price: 24, tags: ["tech", "sleep", "med", "parents", "both"], why: "Gentle light for late-night feeds." },
  { name: "Baby memory book", price: 20, tags: ["sentimental", "high", "nursery", "parents", "mum", "both"], why: "A keepsake parents will treasure." },
  { name: "Organic cotton bodysuit set", price: 24, tags: ["eco", "essentials", "med", "parents", "both"], why: "Soft, gentle, and reliable." },
  { name: "White noise machine", price: 35, tags: ["tech", "sleep", "practical", "parents", "both"], why: "Helps settle baby and improve sleep." },
  { name: "Portable changing mat", price: 30, tags: ["practical", "travel", "med", "parents", "both"], why: "Perfect for days out and travel." },
  { name: "Nursing pillow", price: 38, tags: ["practical", "feeding", "mum", "med"], why: "Support for feeding and cuddles." },
  { name: "Audio baby monitor", price: 45, tags: ["tech", "sleep", "practical", "parents", "both"], why: "Reliable monitoring without the fuss." },
  { name: "Baby bouncer chair", price: 45, tags: ["practical", "essentials", "med", "parents", "both"], why: "Gives parents a safe place to set baby down." },
  { name: "Family handprint kit", price: 32, tags: ["sentimental", "high", "nursery", "parents", "both"], why: "A sweet keepsake for the nursery." },
  { name: "Postpartum recovery kit", price: 35, tags: ["selfcare", "mum", "med"], why: "Thoughtful support for new mums." },
  { name: "New dad coffee kit", price: 25, tags: ["selfcare", "dad", "med", "budget"], why: "A practical boost for early mornings." },
  { name: "Ergonomic baby carrier", price: 90, tags: ["practical", "travel", "med", "parents", "both"], why: "Hands-free and comfortable for everyone." },
  { name: "Premium diaper bag backpack", price: 85, tags: ["practical", "travel", "med", "parents", "both"], why: "Stylish, roomy, and built for daily use." },
  { name: "Video baby monitor", price: 95, tags: ["tech", "sleep", "practical", "parents", "both"], why: "Extra peace of mind for parents." },
  { name: "Personalised baby blanket", price: 60, tags: ["sentimental", "high", "nursery", "parents", "mum", "both"], why: "A keepsake that feels personal." },
  { name: "Keepsake memory box", price: 55, tags: ["sentimental", "high", "nursery", "parents", "both"], why: "Store tiny mementos for years." },
  { name: "Baby first year photo frame", price: 28, tags: ["sentimental", "high", "nursery", "parents", "both"], why: "Perfect for capturing the first year." }
];

const ADDONS = [
  { name: "Mini board book", price: 6, tags: ["sentimental", "books", "parents", "both"], why: "A sweet extra for bedtime routines." },
  { name: "Muslin burp cloths", price: 8, tags: ["practical", "essentials", "parents", "both"], why: "Always handy and easy to wash." },
  { name: "Pacifier set", price: 7, tags: ["practical", "essentials", "parents", "both"], why: "A small add-on that parents appreciate." },
  { name: "Baby socks add-on", price: 6, tags: ["budget", "essentials", "parents", "both"], why: "Tiny, useful, and easy to gift." },
  { name: "Travel wipes case", price: 9, tags: ["practical", "travel", "parents", "both"], why: "Keeps wipes ready for trips." },
  { name: "Keepsake card set", price: 5, tags: ["sentimental", "high", "parents", "both"], why: "A simple way to add meaning." }
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

const TAG_LABELS = {
  high: "keepsake",
  med: "thoughtful",
  practical: "practical",
  sentimental: "keepsake",
  selfcare: "self-care",
  eco: "eco",
  budget: "budget",
  parents: "parents-to-be",
  mum: "new mum",
  dad: "new dad",
  both: "both parents"
};

const $ = (id) => document.getElementById(id);
const trackEvent = (name, params = {}) => {
  if (typeof window !== "undefined" && typeof window.trackEvent === "function") {
    window.trackEvent(name, params);
  }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function fillSelect(id, items, defaultKey) {
  const el = $(id);
  el.innerHTML = items
    .map((item) => {
      const selected = item.key === defaultKey ? "selected" : "";
      return `<option value="${item.key}" ${selected}>${item.label}</option>`;
    })
    .join("");
}

function renderInterests() {
  const wrap = $("interestChecks");
  wrap.innerHTML = "";
  INTERESTS.forEach((interest) => {
    const id = `interest_${interest.key}`;
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" id="${id}" value="${interest.key}" />${interest.label}`;
    wrap.appendChild(label);
  });
}

function selectedInterests() {
  return INTERESTS
    .map((interest) => ({
      key: interest.key,
      checked: $("interest_" + interest.key).checked
    }))
    .filter((interest) => interest.checked)
    .map((interest) => interest.key);
}

function parseAvoid(text) {
  return text
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function labelFor(items, key) {
  const match = items.find((item) => item.key === key);
  return match ? match.label : key;
}

function scoreGift(gift, options) {
  let score = 0;

  if (gift.price > options.budget) return -999;

  if (gift.tags.includes(options.mumType)) score += 4;
  if (gift.tags.includes(options.recipient)) score += 3;

  if (options.sentiment === "high" && gift.tags.includes("high")) score += 3;
  if (options.sentiment === "med" && gift.tags.includes("med")) score += 2;
  if (options.sentiment === "low" && gift.tags.includes("practical")) score += 2;

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

function scoreAddon(addon, options) {
  let score = 0;

  if (addon.price > options.budget) return -999;

  if (addon.tags.includes(options.recipient)) score += 2;
  if (addon.tags.includes(options.mumType)) score += 2;

  if (options.sentiment === "high" && addon.tags.includes("high")) score += 2;
  if (options.sentiment === "med" && addon.tags.includes("med")) score += 1;

  options.interests.forEach((interest) => {
    if (addon.tags.includes(interest)) score += 1;
  });

  return score;
}

function prettyTag(tag) {
  return TAG_LABELS[tag] || tag;
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

function buildSearchTerms(gift) {
  const base = gift.name.replace(/[()]/g, "").replace(/[^a-z0-9\s]/gi, "").trim();
  const terms = [
    base,
    `${base} gift`,
    `${base} for baby`,
    `best ${base}`,
    `${base} set`,
    `luxury ${base}`,
    `${base} uk`
  ];
  return Array.from(new Set(terms)).filter((term) => term.length > 2).slice(0, AMAZON_MAX_LINKS);
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

function isUnlocked() {
  return localStorage.getItem(UNLOCK_KEY) === "true";
}

function setUnlocked(value) {
  localStorage.setItem(UNLOCK_KEY, value ? "true" : "false");
}

function buildSummary(options, total) {
  const card = document.createElement("div");
  card.className = "panel summary";
  const interestLabels = options.interests.length
    ? options.interests.map((key) => labelFor(INTERESTS, key)).join(", ")
    : "None";
  card.innerHTML = `
    <strong>Top picks</strong>
    <div class="small">Budget: up to ${CURRENCY}${options.budget} | Recipient: ${labelFor(RECIPIENTS, options.recipient)} | Gift style: ${labelFor(TYPES, options.mumType)} | Sentiment: ${sentimentLabel(options.sentiment)} | Interests: ${interestLabels}</div>
    <div class="small">${total} matches found.</div>
  `;
  return card;
}

function buildResultCard(gift, delay, locked) {
  const card = document.createElement("div");
  card.className = `result${locked ? " locked" : ""}`;
  card.style.animationDelay = `${delay}ms`;
  const tags = gift.tags
    .filter((tag) => [
      "high",
      "med",
      "practical",
      "sentimental",
      "selfcare",
      "eco",
      "budget",
      "essentials",
      "sleep",
      "feeding",
      "bath",
      "nursery",
      "travel",
      "books",
      "tech",
      "parents",
      "mum",
      "dad",
      "both"
    ].includes(tag))
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
        <div class="buy-title">Where to buy <span class="buy-disclosure">(paid links)</span></div>
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

function buildAddons(options) {
  const wrap = document.createElement("div");
  wrap.className = "panel addons";
  wrap.innerHTML = `
    <div class="summary">
      <strong>Already bought a big gift? Add one of these</strong>
      <div class="small">Small add-ons that make a baby shower gift feel extra thoughtful.</div>
    </div>
  `;

  const addOnBudget = Math.min(25, options.budget);
  const scored = ADDONS
    .map((addon) => ({ addon, score: scoreAddon(addon, { ...options, budget: addOnBudget }) }))
    .filter((item) => item.score > -100)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  const grid = document.createElement("div");
  grid.className = "addon-grid";

  scored.forEach((item) => {
    const card = document.createElement("div");
    card.className = "addon-card";
    card.innerHTML = `
      <div class="result-title">${item.addon.name}</div>
      <div class="result-why">${item.addon.why}</div>
      <div class="tags">
        <span class="pill">~${CURRENCY}${item.addon.price}</span>
      </div>
    `;
    grid.appendChild(card);
  });

  wrap.appendChild(grid);
  return wrap;
}

function sentimentLabel(value) {
  if (value === "high") return "High (keepsake)";
  if (value === "low") return "Low (useful)";
  return "Medium";
}

function generate(source = "auto") {
  const options = {
    budget: parseInt($("budget").value, 10),
    recipient: $("recipient").value,
    mumType: $("mumType").value,
    sentiment: $("sentiment").value,
    avoid: parseAvoid($("avoid").value),
    interests: selectedInterests(),
    alreadyFlowers: $("flowers").checked
  };

  const scored = GIFTS
    .map((gift) => ({ gift, score: scoreGift(gift, options) }))
    .filter((item) => item.score > -100)
    .sort((a, b) => b.score - a.score);

  const results = $("results");
  results.innerHTML = "";

  if (!scored.length) {
    if (source === "submit") {
      trackEvent("finder_submit", {
        budget: options.budget,
        recipient: options.recipient,
        gift_style: options.mumType,
        sentiment: options.sentiment,
        interests_count: options.interests.length,
        already_big_gift: options.alreadyFlowers ? "yes" : "no"
      });
      trackEvent("results_shown", { total_matches: 0, unlocked: isUnlocked() ? "yes" : "no" });
    }
    results.innerHTML = `<div class="panel">No matches found. Try a higher budget or fewer avoid keywords.</div>`;
    return;
  }

  results.appendChild(buildSummary(options, scored.length));

  const unlocked = isUnlocked();
  const limit = unlocked ? MAX_RESULTS : LOCKED_RESULTS;

  if (source === "submit") {
    trackEvent("finder_submit", {
      budget: options.budget,
      recipient: options.recipient,
      gift_style: options.mumType,
      sentiment: options.sentiment,
      interests_count: options.interests.length,
      already_big_gift: options.alreadyFlowers ? "yes" : "no"
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

  if (options.alreadyFlowers) {
    results.appendChild(buildAddons(options));
  }
}

function scrollResultsIntoViewIfMobile() {
  if (!window.matchMedia || !window.matchMedia("(max-width: 640px)").matches) {
    return;
  }
  const results = $("results");
  if (!results) return;
  window.requestAnimationFrame(() => {
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fillSelect("recipient", RECIPIENTS, "parents");
  fillSelect("mumType", TYPES, "practical");
  renderInterests();
  trackUnlockFromQuery();
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
  $("finderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    generate("submit");
    scrollResultsIntoViewIfMobile();
  });
  generate("auto");
});
