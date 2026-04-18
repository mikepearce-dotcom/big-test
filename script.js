const navItems = [
  ["Home", "index.html"],
  ["CRO Audit", "audit.html"],
  ["Ongoing CRO", "ongoing.html"],
  ["Case Studies", "case-studies.html"],
  ["About", "about.html"],
  ["Contact", "contact.html"]
];

document.documentElement.classList.add("js");

function getCurrentPath() {
  return location.pathname.split("/").pop() || "index.html";
}

function ensureHeadAssets() {
  if (!document.head.querySelector('link[rel="icon"]')) {
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/svg+xml";
    icon.href = "favicon.svg";
    document.head.appendChild(icon);
  }

  if (!document.head.querySelector('meta[name="theme-color"]')) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#f4efe8";
    document.head.appendChild(meta);
  }
}

function mountShell() {
  const path = getCurrentPath();
  const navLinks = navItems
    .map(([label, href]) => {
      const active = path === href ? "active" : "";
      return `<a class="${active}" href="${href}">${label}</a>`;
    })
    .join("");

  const footerLinks = navItems
    .map(([label, href]) => `<a href="${href}">${label}</a>`)
    .join("");

  const header = `
    <header class="topbar">
      <div class="container nav">
        <a class="logo" href="index.html" aria-label="CRO Specialist Consultancy home">
          <span class="logo-mark" aria-hidden="true">
            <img src="favicon.svg" alt="" width="46" height="46" />
          </span>
          <span class="logo-copy">
            <span class="logo-title">CRO Specialist</span>
            <span class="logo-sub">Independent CRO Consultancy</span>
          </span>
        </a>
        <nav class="nav-links" aria-label="Primary">
          ${navLinks}
        </nav>
        <a class="btn btn-primary" href="contact.html">Book Discovery Call</a>
      </div>
    </header>`;

  const footer = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <p class="eyebrow">CRO Specialist Consultancy</p>
          <p class="footer-title">Independent CRO support for brands that need clearer conversion performance.</p>
          <p>Audit-led diagnosis, commercial prioritisation, and ongoing optimisation support for teams that know the site should be doing more.</p>
        </div>
        <div>
          <p class="eyebrow">Explore</p>
          <nav class="footer-links" aria-label="Footer">
            ${footerLinks}
          </nav>
        </div>
        <div>
          <p class="eyebrow">Best first step</p>
          <p>Start with the fixed-price audit, then decide whether to implement internally or continue with ongoing support.</p>
          <div class="proof-row">
            <a class="btn btn-secondary" href="audit.html">View the &pound;1,300 audit</a>
          </div>
          <p class="footer-note">&copy; <span data-year></span> CRO Specialist Consultancy</p>
        </div>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);
}

function setYear() {
  const el = document.querySelector("[data-year]");
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

function observeReveal() {
  const nodes = [...document.querySelectorAll(".reveal")];
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach(node => node.classList.add("is-visible"));
    return;
  }

  const pending = new Set(nodes);
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          pending.delete(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach(node => io.observe(node));

  window.setTimeout(() => {
    pending.forEach(node => node.classList.add("is-visible"));
    io.disconnect();
  }, 1600);
}

function initEnquiryForm() {
  const form = document.querySelector("[data-enquiry-form]");
  if (!form) return;

  const status = document.getElementById("form-status");
  const recipient = form.getAttribute("data-recipient") || "hello@crospecialist.co.uk";

  form.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const company = data.get("company") || "";
    const interest = data.get("interest") || "";
    const message = data.get("message") || "";

    const subject = encodeURIComponent(`CRO enquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nWork email: ${email}\nCompany: ${company}\nInterest: ${interest}\n\nGoal / challenge:\n${message}\n`
    );

    if (status) {
      status.textContent = "Opening your email app with your enquiry details pre-filled...";
    }

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

ensureHeadAssets();
mountShell();
setYear();
observeReveal();
initEnquiryForm();