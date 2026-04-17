const navItems = [
  ['Home', 'index.html'],
  ['CRO Audit', 'audit.html'],
  ['Ongoing CRO', 'ongoing.html'],
  ['Case Studies', 'case-studies.html'],
  ['About', 'about.html'],
  ['Contact', 'contact.html']
];

document.documentElement.classList.add('js');

function mountShell() {
  const path = location.pathname.split('/').pop() || 'index.html';
  const navLinks = navItems
    .map(([label, href]) => {
      const active = path === href ? 'active' : '';
      return `<a class="${active}" href="${href}">${label}</a>`;
    })
    .join('');

  const header = `
    <header class="topbar">
      <div class="container nav">
        <a class="logo" href="index.html">CRO<span>Specialist</span></a>
        <nav class="nav-links" aria-label="Primary">
          ${navLinks}
        </nav>
        <a class="btn btn-primary" href="contact.html">Book Discovery Call</a>
      </div>
    </header>`;

  const footer = `
    <footer class="footer">
      <div class="container">
        <p><strong>CRO Specialist Consultancy</strong> · Independent, senior-level conversion optimisation support.</p>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
}

function setYear() {
  const el = document.querySelector('[data-year]');
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

function observeReveal() {
  const nodes = [...document.querySelectorAll('.reveal')];
  if (!nodes.length) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  nodes.forEach(node => io.observe(node));
}

function initEnquiryForm() {
  const form = document.querySelector('[data-enquiry-form]');
  if (!form) return;

  const status = document.getElementById('form-status');
  const recipient = form.getAttribute('data-recipient') || 'hello@crospecialist.co.uk';

  form.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const company = data.get('company') || '';
    const interest = data.get('interest') || '';
    const message = data.get('message') || '';

    const subject = encodeURIComponent(`CRO enquiry from ${name || 'website visitor'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nWork email: ${email}\nCompany: ${company}\nInterest: ${interest}\n\nGoal / challenge:\n${message}\n`
    );

    if (status) {
      status.textContent = 'Opening your email app with your enquiry details pre-filled…';
    }

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

mountShell();
setYear();
observeReveal();
initEnquiryForm();
