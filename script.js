const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
function applyTheme(t){
  root.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}
try{
  const saved = localStorage.getItem('dezel-theme');
  if(saved){ applyTheme(saved); }
  else { applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
}catch(e){ applyTheme('light'); }
themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try{ localStorage.setItem('dezel-theme', next); }catch(e){}
});

const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ---------- mobile hamburger menu ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');
function closeMobileNav(){
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', false);
}
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open);
});
navClose.addEventListener('click', closeMobileNav);
navLinks.addEventListener('click', (e) => {
  if(e.target.tagName === 'A'){
    closeMobileNav();
  }
});


// ================= EMAILJS SETUP =================
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) -> copy its Service ID below
// 3. Create an Email Template -> copy its Template ID below
//    Use these variable names in your template: {{from_name}} {{from_email}} {{phone}} {{message}}
// 4. Copy your Public Key from Account > API Keys
const EMAILJS_PUBLIC_KEY = "kqOHuI3ni9NgVkNpm";
const EMAILJS_SERVICE_ID = "service_qmc0uvk"; 
const EMAILJS_CONTACT_TEMPLATE_ID = "template_c6iqueq";
const EMAILJS_BOOKING_TEMPLATE_ID = "template_c6iqueq"; // can reuse the contact template if you prefer

if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

function sendViaEmailJS(templateId, params, statusEl, successMsg, formEl){
  if (!window.emailjs || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
    statusEl.textContent = "Email sending isn't set up yet — add your EmailJS keys in script.js.";
    return;
  }
  statusEl.textContent = "Sending...";
  emailjs.send(EMAILJS_SERVICE_ID, templateId, params).then(
    () => { statusEl.textContent = successMsg; if (formEl) formEl.reset(); },
    (err) => { statusEl.textContent = "Something went wrong — please try again or reach out via WhatsApp."; console.error(err); }
  );
}


// ---------- contact form ----------
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const message = document.getElementById('cf-message').value;
  const statusEl = document.getElementById('contactStatus');
  sendViaEmailJS(EMAILJS_CONTACT_TEMPLATE_ID, {
    from_name: name, from_email: email, message: message
  }, statusEl, "Message sent — thanks! I'll get back to you soon.", this);
  if (window.emailjs && EMAILJS_PUBLIC_KEY !== "kqOHuI3ni9NgVkNpm") this.reset();
});

// ---------- booking form ----------
document.getElementById('bookingForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('bk-name').value;
  const email = document.getElementById('bk-email').value;
  const phone = document.getElementById('bk-phone').value;
  const type = document.getElementById('bk-type').value;
  const date = document.getElementById('bk-date').value;
  const details = document.getElementById('bk-details').value;
  const statusEl = document.getElementById('bookingStatus');
  const message = `Booking request: ${type}\nEvent/deadline date: ${date || 'Not specified'}\n\n${details}`;
  sendViaEmailJS(EMAILJS_BOOKING_TEMPLATE_ID, {
    from_name: name, from_email: email, phone: phone, message: message
  }, statusEl, "Booking request sent — I'll confirm with you shortly.", this);
  if (window.emailjs && EMAILJS_PUBLIC_KEY !== "kqOHuI3ni9NgVkNpm") this.reset();
});
