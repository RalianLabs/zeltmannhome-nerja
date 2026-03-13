# Plan Mode — Implementation notes

- Design: Boutique Mediterranean (Playfair Display + Inter). Palette: #f9fafb, sand #DCC8A1, navy #0B2A44.
- Stack: static HTML + Tailwind CDN, Leaflet (OpenStreetMap), WhatsApp direct booking link.
- Accessibility: images have alt, lazy loading, buttons accessible.
- Animations: simple fade-in via IntersectionObserver, hover micro-interactions via Tailwind transitions.

Files to commit:
- `index_tailwind.html` (current V1)
- `obsidian/*` notes

Deployment:
- Ready to deploy to Vercel as a static project. Create repo, push, connect Vercel.
