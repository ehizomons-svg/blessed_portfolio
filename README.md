# Dezel Portfolio Website

A simple, clean portfolio website for Dezel (Omonlumen Blessed), graphic designer.

## Files

- `index.html` — the main page (structure and content)
- `styles.css` — all styling (colors, layout, light/dark theme)
- `script.js` — theme toggle, back-to-top button, and contact form behavior
- `README.md` — this file

## How to use it

1. Keep all three files (`index.html`, `styles.css`, `script.js`) in the same folder — the page links to the other two, so they must stay together.
2. Open `index.html` in any web browser to view the site.
3. To put it online, upload the whole folder to any web host (e.g. Netlify, GitHub Pages, or your own hosting) — no build tools or setup needed.

## What's included

- Hero section with photo, name, and intro
- About Me section with a short bio and stats
- Work section showcasing sample designs
- Skills & tools list
- Testimonials from past clients
- FAQ section
- **Book Me For A Gig** section — a booking request form (name, email, phone, event type, date, details)
- **Download CV** button in the hero section
- Contact section with WhatsApp, email, Facebook, and Telegram links, plus a message form
- Light/dark mode toggle (top right of the page)
- Mobile hamburger menu — on narrow screens the nav collapses into a square icon that slides open a menu when tapped
- "Back to top" button (appears after scrolling down)

## Editing the content

- **Text**: open `index.html` in any text editor and change the words directly — names, bio, testimonials, FAQ answers, etc.
- **Colors/fonts/spacing**: open `styles.css` — the colors are defined near the top under `:root` so they're easy to find and change.
- **Contact links**: search `index.html` for `wa.me`, `mailto:`, `facebook.com`, and `t.me` to update phone numbers, email, or social links.
- **Work samples**: each project is a `<div class="card">` block in `index.html`. To swap an image, replace the long `src="data:image/jpeg;base64,..."` value with a new image (or point it to an image file instead, e.g. `src="images/project1.jpg"`, and keep that image file in the folder).

## Fixes in this update

- **Responsive overflow bug**: testimonial photos had hardcoded pixel widths and there was no global `img { max-width:100% }` rule, so on some screens an image rendered wider than the viewport and pushed the whole page sideways — that's what was covering content and making the sticky header seem to misbehave. Fixed with a global image rule plus proper sizing on the testimonial photos and hero photo.
- **Mobile nav**: previously all nav links sat in one row with no wrapping and no small-screen version, which also caused horizontal overflow. It now collapses into a hamburger icon (the three-line square button) under 760px screen width; tapping it slides in the menu, and tapping a link closes it again.

## Adding your CV for the Download button

The "Download CV" button in the hero section points to `assets/cv/omonlumen-blessed-cv.pdf`.

1. Put your actual CV file into the `assets/cv/` folder.
2. Name it exactly `omonlumen-blessed-cv.pdf` — or, if you'd rather use your own filename, open `index.html`, find the `Download CV` link, and change the `href` to match your filename.
3. Redeploy to Vercel. Clicking the button will then download your real CV.

There's no "upload" step on the live site itself since this is a static site with no backend — the file just needs to be sitting in that folder before you deploy, the same way the portfolio images work.

## Setting up real email sending (EmailJS)

The contact form and booking form now use [EmailJS](https://www.emailjs.com) so messages actually land in your inbox — no backend needed:

1. Create a free EmailJS account.
2. Add an **Email Service** (e.g. connect your Gmail) → copy its **Service ID**.
3. Create an **Email Template** with these variables: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}` → copy its **Template ID**. You can make one template and reuse it for both forms, or make a separate one for bookings.
4. Copy your **Public Key** from Account → API Keys.
5. Open `script.js`, find the `EMAILJS SETUP` block near the top, and paste in your Public Key, Service ID, and Template ID(s).

Until you fill those in, submitting either form will show a message saying email sending isn't set up yet, so nothing silently fails.

## Notes

- Images are currently embedded directly into `index.html` (as base64 data), so the page works as a single self-contained file even without `styles.css`/`script.js` — though the styling and interactive features (theme toggle, back-to-top, forms) need those two files present to work.
