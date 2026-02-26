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
})();
