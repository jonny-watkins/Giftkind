const INTERESTS = [
  { key: "selfcare", label: "Self-care" },
  { key: "home", label: "Home" },
  { key: "coffee", label: "Coffee/Tea" },
  { key: "books", label: "Books" },
  { key: "fitness", label: "Fitness" },
  { key: "cooking", label: "Cooking" },
  { key: "garden", label: "Garden" },
  { key: "tech", label: "Tech" },
  { key: "craft", label: "Craft" },
  { key: "experiences", label: "Experiences" }
];

const RECIPIENTS = [
  { key: "mum", label: "Mum" },
  { key: "newmum", label: "New mum" },
  { key: "grandma", label: "Grandma" },
  { key: "mil", label: "Mother-in-law" }
];

const TYPES = [
  { key: "care", label: "Caring and sentimental" },
  { key: "practical", label: "Practical and organised" },
  { key: "style", label: "Style and self-care" },
  { key: "food", label: "Foodie or cook" },
  { key: "garden", label: "Garden or outdoors" },
  { key: "bookish", label: "Bookish or cosy" },
  { key: "tech", label: "Tech-friendly" }
];

const GIFTS = [
  { name: "Personalised photo keyring", price: 12, tags: ["care", "high", "home", "mum", "grandma", "mil"], why: "A small keepsake she can carry every day." },
  { name: "Luxury hand cream", price: 10, tags: ["style", "selfcare", "med", "mum", "mil"], why: "Feels premium without being expensive." },
  { name: "Tea sampler box", price: 14, tags: ["food", "coffee", "med", "mum", "grandma", "mil"], why: "A simple treat that still feels thoughtful." },
  { name: "Paperback bestseller and bookmark", price: 12, tags: ["bookish", "books", "med", "mum", "grandma"], why: "Cosy and easy to enjoy right away." },
  { name: "Mini herb seed tins", price: 9, tags: ["garden", "garden", "med", "mum", "grandma"], why: "Sweet and practical for green thumbs." },
  { name: "New mum first-year journal", price: 14, tags: ["care", "high", "craft", "newmum"], why: "Captures the tiny moments she will want to keep." },
  { name: "Socks and foot balm set", price: 15, tags: ["style", "selfcare", "med", "mum"], why: "A little comfort that feels indulgent." },
  { name: "Mini photo print set", price: 15, tags: ["care", "high", "home", "mum", "grandma"], why: "Turns recent memories into something tangible." },
  { name: "Personalised name print", price: 20, tags: ["care", "high", "home", "mum", "grandma", "mil"], why: "Meaningful wall art she can keep." },
  { name: "Scented candle (quality brand)", price: 22, tags: ["bookish", "home", "med", "mum", "mil"], why: "Instant relax vibes for her space." },
  { name: "Gardening gloves and seed set", price: 18, tags: ["garden", "garden", "med", "mum", "grandma"], why: "Practical, and it shows you noticed her hobby." },
  { name: "Insulated coffee or tea tumbler", price: 18, tags: ["practical", "coffee", "med", "mum"], why: "Useful every day for the school run or commute." },
  { name: "Recipe journal or meal planner", price: 16, tags: ["practical", "cooking", "med", "mum"], why: "Great for organised mums or keen cooks." },
  { name: "New mum self-care mini kit", price: 24, tags: ["style", "selfcare", "med", "newmum"], why: "A gentle reminder to take a breather." },
  { name: "Grandma story journal", price: 20, tags: ["care", "high", "books", "grandma"], why: "A keepsake that captures her stories." },
  { name: "Mother-in-law thank-you gift box", price: 25, tags: ["care", "high", "home", "mil"], why: "Warm and thoughtful without trying too hard." },
  { name: "Cosy throw blanket", price: 24, tags: ["bookish", "home", "med", "mum", "grandma"], why: "Perfect for reading, naps, and movie nights." },
  { name: "At-home spa kit", price: 35, tags: ["style", "selfcare", "med", "mum"], why: "A treat-yourself bundle she will actually use." },
  { name: "Afternoon tea experience voucher", price: 45, tags: ["care", "experiences", "high", "mum", "grandma", "mil"], why: "Feels special and creates a memory together." },
  { name: "Heated neck and shoulder wrap", price: 40, tags: ["care", "selfcare", "practical", "mum", "grandma"], why: "Comfort gift that says you want her to relax." },
  { name: "Fragrance discovery set", price: 45, tags: ["style", "selfcare", "med", "mil"], why: "Safer than guessing a full perfume bottle." },
  { name: "Custom photo calendar", price: 30, tags: ["care", "high", "home", "mum", "grandma"], why: "A full year of memories she can see daily." },
  { name: "Indoor herb garden kit", price: 42, tags: ["food", "garden", "cooking", "med", "mum"], why: "Fresh herbs without the outdoor hassle." },
  { name: "Craft workshop voucher", price: 48, tags: ["craft", "experiences", "med", "mum", "mil"], why: "A creative day out she can enjoy." },
  { name: "Nursing pillow and cover", price: 38, tags: ["practical", "newmum", "med"], why: "Makes feeding or resting a little easier." },
  { name: "Jewellery with initials or birthstone", price: 85, tags: ["care", "high", "style", "mum", "grandma", "mil"], why: "A classic keepsake without being cheesy." },
  { name: "High-end hair tool or styling kit", price: 90, tags: ["style", "tech", "med", "mum"], why: "A proper upgrade she might not buy herself." },
  { name: "Smart photo frame", price: 95, tags: ["care", "tech", "high", "mum", "grandma"], why: "Load it with family photos for instant smiles." },
  { name: "Weighted cosy blanket", price: 80, tags: ["bookish", "home", "selfcare", "med", "mum"], why: "Comforting and perfect for winding down." },
  { name: "Premium cookbook and stand", price: 70, tags: ["food", "cooking", "med", "mum"], why: "A keepsake cookbook she will use again and again." },
  { name: "Tablet stand and stylus set", price: 65, tags: ["practical", "tech", "med", "mil"], why: "Ideal for video calls, recipes, or planning." },
  { name: "Family photo book", price: 75, tags: ["care", "high", "home", "grandma"], why: "A polished keepsake she can flip through anytime." }
];

const ADDONS = [
  { name: "Handwritten card and wax seal kit", price: 6, tags: ["high", "craft", "flowers"], why: "Adds a thoughtful finish to the bouquet." },
  { name: "Luxury ribbon and wrap", price: 5, tags: ["home", "flowers"], why: "Makes the flowers feel extra special." },
  { name: "Glass vase upgrade", price: 12, tags: ["home", "flowers"], why: "Makes arranging the bouquet effortless." },
  { name: "Chocolate truffles", price: 10, tags: ["food", "flowers"], why: "A sweet add-on that feels indulgent." },
  { name: "Breakfast-in-bed kit", price: 18, tags: ["food", "coffee", "flowers"], why: "Pairs perfectly with a lazy morning." },
  { name: "Photo magnet set", price: 14, tags: ["care", "high", "home", "flowers"], why: "Turns memories into small daily smiles." },
  { name: "Mini candle duo", price: 16, tags: ["selfcare", "home", "med", "flowers"], why: "Soft glow and scent to go with the blooms." },
  { name: "Flower care kit", price: 8, tags: ["practical", "flowers"], why: "Helps the bouquet last longer." },
  { name: "Printed playlist QR card", price: 6, tags: ["tech", "high", "flowers"], why: "A tiny keepsake that feels modern." },
  { name: "Herbal tea sachets", price: 9, tags: ["coffee", "med", "flowers"], why: "A calming sip to enjoy with the flowers." }
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
  selfcare: "self-care",
  newmum: "new mum",
  grandma: "grandma",
  mil: "mother-in-law"
};

const $ = (id) => document.getElementById(id);

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
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: 1 })
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
    `${base} for mum`,
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
    <div class="small">Budget: up to ${CURRENCY}${options.budget} | Recipient: ${labelFor(RECIPIENTS, options.recipient)} | Mum type: ${labelFor(TYPES, options.mumType)} | Sentiment: ${sentimentLabel(options.sentiment)} | Interests: ${interestLabels}</div>
    <div class="small">${total} matches found.</div>
  `;
  return card;
}

function buildResultCard(gift, delay, locked) {
  const card = document.createElement("div");
  card.className = `result${locked ? " locked" : ""}`;
  card.style.animationDelay = `${delay}ms`;
  const tags = gift.tags
    .filter((tag) => ["high", "med", "practical", "selfcare", "coffee", "books", "cooking", "garden", "tech", "craft", "experiences", "newmum", "grandma", "mil"].includes(tag))
    .slice(0, 3)
    .map((tag) => `<span class="pill">${prettyTag(tag)}</span>`)
    .join("");
  const links = buildAffiliateLinks(gift);
  const linkHtml = links
    .map(
      (link) =>
        `<a href="${link.url}" target="_blank" rel="sponsored nofollow noopener">${link.label}</a>`
    )
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
      <strong>Already bought flowers? Pair them with one of these</strong>
      <div class="small">Small add-ons that make a bouquet feel extra thoughtful.</div>
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

function generate() {
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
    results.innerHTML = `<div class="panel">No matches found. Try a higher budget or fewer avoid keywords.</div>`;
    return;
  }

  results.appendChild(buildSummary(options, scored.length));

  const unlocked = isUnlocked();
  const limit = unlocked ? MAX_RESULTS : LOCKED_RESULTS;

  scored.slice(0, limit).forEach((item, index) => {
    results.appendChild(buildResultCard(item.gift, index * 40, false));
  });

  if (!unlocked && scored.length > limit) {
    const previewCount = Math.min(3, scored.length - limit);
    for (let i = 0; i < previewCount; i += 1) {
      results.appendChild(buildResultCard(scored[limit + i].gift, (limit + i) * 40, true));
    }
    results.appendChild(buildPaywall());
  } else if (unlocked) {
    results.appendChild(buildUnlockNote());
  }

  if (options.alreadyFlowers) {
    results.appendChild(buildAddons(options));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fillSelect("recipient", RECIPIENTS, "mum");
  fillSelect("mumType", TYPES, "care");
  renderInterests();
  $("finderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    generate();
  });
  generate();
});



