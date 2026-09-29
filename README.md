# NextEdge Static Website

A static website project for NextEdge Tech Studio.

## Files
- `index.html` — homepage with hero, services, portfolio preview, testimonials, and contact CTA
- `about.html` — company story, values, and experience
- `services.html` — service detail page for development, design, and IT support
- `portfolio.html` — featured project showcase
- `property.html` — coming-soon preview for the NextEdge Property product
- `contact.html` — contact form and contact details; submissions use FormSubmit to email `nextedgedesign.25@gmail.com`
- `assets/css/style.css` — shared styles for the site
- `assets/js/main.js` — shared page behavior, mobile navigation, scroll reveal, and counters

## Contact form setup
- The contact form posts to FormSubmit. The inbox owner must confirm the first activation email sent by FormSubmit before delivery is enabled.
- Hosting must allow outgoing requests to `formsubmit.co` for the AJAX submit; the form falls back to FormSubmit's regular POST flow otherwise.
- Pricing buttons open WhatsApp at +233 53 777 5352 with the chosen package included in the message.
- Prices are indicative starting prices in GHS; confirm final quotes and third-party charges with the client.

## Preview
Open `index.html` in your browser to preview the site.

## Notes
- Navigation links are page-based and use relative paths for static hosting.
- The contact form sends submissions through FormSubmit; complete the inbox activation step before launch.
