const INTERESTS = [
  { key: "tech", label: "Tech" },
  { key: "coffee", label: "Coffee" },
  { key: "gaming", label: "Gaming" },
  { key: "outdoors", label: "Outdoors" },
  { key: "grooming", label: "Grooming" },
  { key: "sports", label: "Fitness" },
  { key: "home", label: "Home" },
  { key: "travel", label: "Travel" },
  { key: "books", label: "Books" },
  { key: "experiences", label: "Experiences" }
];

const RECIPIENTS = [
  { key: "bil", label: "Brother-in-law" }
];

const TYPES = [
  { key: "practical", label: "Practical upgrade" },
  { key: "fun", label: "Fun or novelty" },
  { key: "style", label: "Style or grooming" },
  { key: "tech", label: "Tech-focused" },
  { key: "outdoors", label: "Outdoors" },
  { key: "experience", label: "Experience-based" }
];

const GIFTS = [
  { name: "Premium coffee sampler", price: 14, tags: ["coffee", "practical", "med", "bil"], why: "A simple upgrade for his morning routine." },
  { name: "Insulated coffee tumbler", price: 18, tags: ["coffee", "practical", "med", "bil"], why: "Great for commuting, weekends, or the gym." },
  { name: "Portable power bank", price: 20, tags: ["tech", "practical", "med", "bil"], why: "Always useful and easy to carry." },
  { name: "Wireless earbuds", price: 45, tags: ["tech", "med", "bil"], why: "A solid everyday upgrade." },
  { name: "Bluetooth speaker", price: 35, tags: ["tech", "fun", "med", "bil"], why: "Great for music, BBQs, or the garage." },
  { name: "Beard grooming kit", price: 22, tags: ["grooming", "style", "med", "bil"], why: "A thoughtful upgrade if he keeps a beard." },
  { name: "Everyday skincare set", price: 24, tags: ["grooming", "style", "med", "bil"], why: "Useful without feeling too personal." },
  { name: "Multi-tool", price: 25, tags: ["outdoors", "practical", "med", "bil"], why: "Handy for small fixes and trips." },
  { name: "Thermal flask", price: 20, tags: ["outdoors", "practical", "bil"], why: "Ideal for camping, commuting, or long drives." },
  { name: "BBQ tool set", price: 28, tags: ["home", "fun", "bil"], why: "Great if he enjoys grilling." },
  { name: "Cocktail shaker set", price: 26, tags: ["home", "fun", "bil"], why: "A fun option for entertaining." },
  { name: "Gaming headset", price: 45, tags: ["gaming", "tech", "bil"], why: "A solid upgrade for game nights." },
  { name: "Controller charging dock", price: 25, tags: ["gaming", "tech", "bil"], why: "Small but useful for console players." },
  { name: "Gym essentials bundle", price: 20, tags: ["sports", "practical", "bil"], why: "Easy win for fitness-focused gifts." },
  { name: "Fitness tracker band set", price: 18, tags: ["sports", "practical", "bil"], why: "A thoughtful add-on for a fitness tracker." },
  { name: "Tech organiser pouch", price: 16, tags: ["travel", "practical", "bil"], why: "Keeps cables and chargers tidy." },
  { name: "Travel toiletry bag", price: 22, tags: ["travel", "practical", "bil"], why: "Great for work trips and weekends away." },
  { name: "Weekend duffel bag", price: 55, tags: ["travel", "practical", "bil"], why: "A solid upgrade he will use often." },
  { name: "Paperback bestseller", price: 12, tags: ["books", "med", "bil"], why: "A safe, easy gift for readers." },
  { name: "Experience voucher", price: 50, tags: ["experiences", "experience", "high", "bil"], why: "A flexible option if you are unsure." },
  { name: "Personalised keyring", price: 15, tags: ["high", "med", "bil"], why: "A small keepsake without overdoing it." }
];

const ADDONS = [
  { name: "Gift card add-on", price: 10, tags: ["practical", "bil"], why: "Lets him choose the exact item or size." },
  { name: "Snack bundle", price: 12, tags: ["fun", "bil"], why: "Easy add-on that feels generous." },
  { name: "Travel socks set", price: 8, tags: ["practical", "travel", "bil"], why: "Useful and easy to include." },
  { name: "Small tech cable kit", price: 9, tags: ["tech", "bil"], why: "A handy add-on for gadgets." },
  { name: "Bottle opener keychain", price: 6, tags: ["fun", "bil"], why: "Small and useful without much risk." }
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
  fun: "fun",
  style: "style",
  tech: "tech",
  outdoors: "outdoors",
  experiences: "experience",
  experience: "experience",
  sports: "fitness",
  grooming: "grooming",
  travel: "travel"
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
    `${base} for brother in law`,
    `best ${base}`,
    `${base} set`,
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
    <div class="small">Budget: up to ${CURRENCY}${options.budget} | Gift style: ${labelFor(TYPES, options.mumType)} | Sentiment: ${sentimentLabel(options.sentiment)} | Interests: ${interestLabels}</div>
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
      "fun",
      "style",
      "tech",
      "outdoors",
      "experiences",
      "sports",
      "grooming",
      "travel",
      "coffee",
      "gaming",
      "home",
      "books"
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
      <strong>Already bought a main gift? Add one of these</strong>
      <div class="small">Small add-ons that make the gift feel extra thoughtful.</div>
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
        gift_style: options.mumType,
        sentiment: options.sentiment,
        interests_count: options.interests.length,
        already_main_gift: options.alreadyFlowers ? "yes" : "no"
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
      gift_style: options.mumType,
      sentiment: options.sentiment,
      interests_count: options.interests.length,
      already_main_gift: options.alreadyFlowers ? "yes" : "no"
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

document.addEventListener("DOMContentLoaded", () => {
  fillSelect("recipient", RECIPIENTS, "bil");
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
