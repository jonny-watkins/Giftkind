$categories = @(
  @{ id = "gifts-for-him"; label = "Gifts for Him"; description = "Practical upgrades, tech picks, and easy wins." },
  @{ id = "gifts-for-her"; label = "Gifts for Her"; description = "Thoughtful, stylish, and meaningful ideas." },
  @{ id = "gifts-for-wife"; label = "Gifts for Wife"; description = "Romantic, thoughtful, and special ideas." },
  @{ id = "gifts-for-husband"; label = "Gifts for Husband"; description = "Everyday upgrades with a thoughtful touch." },
  @{ id = "gifts-for-brother"; label = "Gifts for Brother"; description = "Fun, practical, and easy ideas for him." },
  @{ id = "gifts-for-sister"; label = "Gifts for Sister"; description = "Thoughtful treats and practical upgrades." },
  @{ id = "gifts-for-mother-in-law"; label = "Gifts for Mother-in-law"; description = "Warm, thoughtful, and easy to buy." },
  @{ id = "gifts-for-step-parents"; label = "Gifts for Step Parents"; description = "Thoughtful and neutral gifts that feel considerate." },
  @{ id = "gifts-for-grandparents"; label = "Grandparents gifts"; description = "Keepsakes and comfort gifts they will love." },
  @{ id = "meaningful-gifts"; label = "Meaningful gifts"; description = "Gifts that feel personal and lasting." },
  @{ id = "fathers-day"; label = "Father's Day"; description = "Practical, thoughtful, and easy wins for dad." },
  @{ id = "birthday-18"; label = "18th birthday"; description = "Celebrate the big 18 with memorable picks." },
  @{ id = "birthday-21"; label = "21st birthday"; description = "Fun and meaningful ideas for 21." },
  @{ id = "birthday-30"; label = "30th birthday"; description = "Celebrate 30 with upgrades and keepsakes." },
  @{ id = "birthday-40"; label = "40th birthday"; description = "Thoughtful and premium ideas for 40." },
  @{ id = "birthday-50"; label = "50th birthday"; description = "Celebrate 50 with something memorable." },
  @{ id = "birthday-60"; label = "60th birthday"; description = "Classic and meaningful gifts for 60." },
  @{ id = "baby-shower"; label = "Baby shower gifts"; description = "Registry-friendly and practical picks." },
  @{ id = "new-mum"; label = "Gifts for new mums"; description = "Comfort and care for a new mum." },
  @{ id = "new-dad"; label = "Gifts for new dads"; description = "Practical gifts that make dad life easier." },
  @{ id = "practical-baby-gifts"; label = "Practical baby gifts"; description = "Essentials parents actually use." },
  @{ id = "anniversary-1"; label = "1st anniversary (paper)"; description = "Paper-themed gifts with meaning." },
  @{ id = "anniversary-5"; label = "5th anniversary (wood)"; description = "Wood-themed keepsakes and upgrades." },
  @{ id = "anniversary-10"; label = "10th anniversary (tin)"; description = "Tin-themed gifts that feel special." },
  @{ id = "anniversary-15"; label = "15th anniversary (crystal)"; description = "Crystal-inspired gifts and keepsakes." },
  @{ id = "anniversary-20"; label = "20th anniversary (china)"; description = "China-inspired gifts with elegance." },
  @{ id = "anniversary-25"; label = "25th anniversary (silver)"; description = "Silver-themed gifts for a big milestone." },
  @{ id = "anniversary-30"; label = "30th anniversary (pearl)"; description = "Pearl-inspired gifts for year 30." },
  @{ id = "anniversary-40"; label = "40th anniversary (ruby)"; description = "Ruby-inspired gifts with meaning." },
  @{ id = "anniversary-50"; label = "50th anniversary (gold)"; description = "Gold-themed gifts for a golden year." },
  @{ id = "anniversary-60"; label = "60th anniversary (diamond)"; description = "Diamond-inspired gifts for 60 years." },
  @{ id = "teacher-end-term"; label = "Teacher gifts (end of term)"; description = "Thank-you gifts for teachers." },
  @{ id = "teacher-end-year"; label = "Teacher gifts (end of year)"; description = "A bigger thank-you for the year." },
  @{ id = "minimalist-gifts"; label = "Minimalist gifts"; description = "Clean, simple gifts with purpose." },
  @{ id = "experience-gifts"; label = "Experience gifts"; description = "Memories over things." }
)

$template = @'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>__TITLE__</title>
    <meta name="description" content="__META__" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="assets/styles.css" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TK2V374444"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-TK2V374444");
    </script>
  </head>
  <body data-category="__ID__">
    <div class="bg-gradient"></div>
    <main class="shell">
      <header class="hero">
        <div class="header-bar">
          <a class="logo" href="index.html" aria-label="Gift-Kind home">
            <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
              <rect x="6" y="10" width="36" height="32" rx="8"></rect>
              <path d="M14 10c0-4.4 3.6-8 8-8 1.6 0 3.1.5 4.4 1.3C27.7 1.9 29.2 1.4 30.8 1.4c4.4 0 8 3.6 8 8v2H14z"></path>
              <path d="M24 10v32"></path>
              <path d="M6 26h36"></path>
            </svg>
            <span>Gift-Kind</span>
          </a>
          <div class="page-switch">
            <a class="switch-link" href="index.html">Home</a>
            <span class="switch-label">Category</span>
          </div>
        </div>
        <div class="hero-grid">
          <div class="hero-content">
            <h1>__LABEL__ recommendations that feel <span class="accent">personal</span>.</h1>
            <p class="lede">__DESC__ Answer a few quick questions and get curated ideas that match budget and style.</p>
            <div class="hero-actions">
              <a class="primary hero-cta" href="#finder">Start recommendations</a>
              <p class="trust-line">No signup &bull; UK-friendly &bull; Takes 30 seconds</p>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <div class="hero-photo"></div>
            <div class="hero-card hero-card-one">
              <p>"Clear picks without the endless scrolling."</p>
              <span>Gift-Kind user</span>
            </div>
            <div class="hero-card hero-card-two">
              <strong>Smart filters</strong>
              <span>Results tailored to taste.</span>
            </div>
          </div>
        </div>
      </header>

      <section class="panel" id="finder">
        <form id="finderForm">
          <div class="grid">
            <div class="field">
              <label for="budget">Budget</label>
              <select id="budget">
                <option value="15">Up to &pound;15</option>
                <option value="25" selected>Up to &pound;25</option>
                <option value="50">Up to &pound;50</option>
                <option value="100">Up to &pound;100</option>
              </select>
            </div>
            <div class="field">
              <label for="category">Category</label>
              <select id="category"></select>
            </div>
            <div class="field">
              <label for="giftStyle">Gift style</label>
              <select id="giftStyle"></select>
            </div>
            <div class="field">
              <label for="sentiment">Sentiment level</label>
              <select id="sentiment"></select>
            </div>
          </div>

          <div class="field">
            <label>Interests (pick any)</label>
            <div class="checks" id="interestChecks"></div>
          </div>

          <div class="grid">
            <div class="field">
              <label for="avoid">Anything to avoid? (optional)</label>
              <input id="avoid" type="text" placeholder="e.g. perfume, clutter, chocolates, mugs" />
            </div>
          </div>

          <button class="primary" type="submit">Find gift ideas</button>
          <p class="small">Tip: You can expand or edit the gift list any time.</p>
        </form>
      </section>

      <section class="panel tips">
        <h2>How it works</h2>
        <p>Pick the category and set a budget.</p>
        <p>Answer a few quick questions about style and interests.</p>
        <p>Get a shortlist of ideas with links to buy.</p>
      </section>

      <section id="results"></section>

      <section class="panel related">
        <h2>Explore more categories</h2>
        <div class="category-links">
          <a href="gifts-for-him.html">Gifts for Him</a>
          <a href="gifts-for-her.html">Gifts for Her</a>
          <a href="gifts-for-wife.html">Gifts for Wife</a>
          <a href="gifts-for-husband.html">Gifts for Husband</a>
          <a href="fathers-day.html">Father's Day</a>
          <a href="birthday-30.html">30th birthday</a>
          <a href="baby-shower.html">Baby shower gifts</a>
          <a href="anniversary-10.html">10th anniversary</a>
          <a href="teacher-end-term.html">Teacher gifts</a>
          <a href="minimalist-gifts.html">Minimalist gifts</a>
        </div>
      </section>

      <section class="panel disclosure">
        <h2>About GiftKind</h2>
        <p>
          GiftKind is a simple gift finder for different occasions. It matches preferences to
          curated ideas so you can pick with confidence.
        </p>
        <p class="disclosure-line">
          <strong>Disclosure:</strong> This site may earn a commission from purchases made through links.
          As an Amazon Associate I earn from qualifying purchases.
        </p>
        <p class="privacy-line">
          Privacy: Your answers stay in your browser. We do not ask for logins and we do not store your
          inputs on our servers.
        </p>
        <p class="privacy-line">
          Prices and availability can change; always verify details before you buy.
        </p>
      </section>

      <section class="panel contact">
        <h2>Contact</h2>
        <p class="small">Questions or feedback? Send a quick message below.</p>
        <form name="contact" method="POST" data-netlify="true" class="contact-form">
          <input type="hidden" name="form-name" value="contact" />
          <div class="contact-grid">
            <div class="field">
              <label for="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autocomplete="email" required />
            </div>
          </div>
          <div class="field">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="4" required></textarea>
          </div>
          <button class="primary" type="submit">Send message</button>
          <p class="small">We will only use this to reply to your message.</p>
        </form>
      </section>

      <footer class="footer">
        <div class="footer-brand">
          <div class="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img">
              <rect x="6" y="10" width="36" height="32" rx="8"></rect>
              <path d="M14 10c0-4.4 3.6-8 8-8 1.6 0 3.1.5 4.4 1.3C27.7 1.9 29.2 1.4 30.8 1.4c4.4 0 8 3.6 8 8v2H14z"></path>
              <path d="M24 10v32"></path>
              <path d="M6 26h36"></path>
            </svg>
          </div>
          <div>
            <strong>Gift-Kind</strong>
            <p class="small">Smart gifting, simplified.</p>
            <p class="small">
              <a href="robots.txt">Robots</a> &bull; <a href="sitemap.xml">Sitemap</a>
            </p>
          </div>
        </div>
        <div>
          <strong>Policies</strong>
          <p><a href="privacy.html">Privacy Policy</a></p>
        </div>
      </footer>
    </main>

    <script>
      window.GA_MEASUREMENT_ID = "G-TK2V374444";
    </script>
    <script src="assets/analytics.js"></script>
    <script src="assets/amazon-links.js"></script>
    <script src="assets/app-master.js" defer></script>
  </body>
</html>
'@

foreach ($cat in $categories) {
  $title = "$($cat.label) | Gift-Kind"
  $meta = "Gift recommendations for $($cat.label). $($cat.description) Answer a few quick questions to get curated ideas that match budget and style."
  $html = $template.Replace("__TITLE__", $title).Replace("__META__", $meta).Replace("__ID__", $cat.id).Replace("__LABEL__", $cat.label).Replace("__DESC__", $cat.description)
  Set-Content -Path "$($cat.id).html" -Value $html
}
