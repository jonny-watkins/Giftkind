(() => {
  const id = window.GA_MEASUREMENT_ID || "";
  if (!id || id.includes("G-XXXXXXXX")) {
    return;
  }

  if (typeof window.gtag === "function") {
    window.trackEvent = (name, params = {}) => {
      window.gtag("event", name, params);
    };
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });

  window.trackEvent = (name, params = {}) => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
  };

  const safeTrack = (name, params = {}) => {
    if (typeof window.trackEvent !== "function") return;
    window.trackEvent(name, params);
  };

  const onReady = () => {
    const pageParams = {
      page_location: window.location.href,
      page_path: window.location.pathname
    };

    const finderForm = document.getElementById("finderForm");
    if (finderForm) {
      finderForm.addEventListener("submit", () => {
        safeTrack("gift_finder_submit", pageParams);
      });
    }

    const contactForm = document.querySelector("form[name='contact']");
    if (contactForm) {
      contactForm.addEventListener("submit", () => {
        safeTrack("contact_form_submit", pageParams);
      });
    }

    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (!href.includes("amazon.co.uk")) return;
      let url;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      safeTrack("outbound_affiliate_click", {
        ...pageParams,
        link_url: url.toString(),
        link_domain: url.hostname,
        affiliate_tag: url.searchParams.get("tag") || ""
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
