# Muneer Dev Portfolio — SPEC.md

## Concept & Vision

A dark, clinical-tech portfolio for a developer bridging 19 years of pharmaceutical expertise with modern automation engineering. The aesthetic evokes precision medicine meets cutting-edge tech—sterile yet sophisticated, data-driven yet human. The vibe is "mission control for healthcare innovation."

## Design Language

### Aesthetic Direction
Inspired by medical device interfaces and space mission control centers—dark backgrounds with precise accent lighting, data visualization aesthetics, and a sense of high-stakes precision.

### Color Palette
- **Primary Background**: `#0a0e14` (deep clinical black)
- **Secondary Background**: `#121820` (elevated surfaces)
- **Accent Primary**: `#00d4aa` (clinical teal/cyan)
- **Accent Secondary**: `#6366f1` (indigo for contrast)
- **Text Primary**: `#e8eaed` (high contrast white)
- **Text Secondary**: `#8b949e` (muted gray)
- **Alert/Risk Colors**: `#ef4444` (high risk), `#f59e0b` (moderate), `#22c55e` (low)

### Typography
- **Headings**: `JetBrains Mono` — monospace precision for that terminal/dev aesthetic
- **Body**: `Inter` — clean, medical-grade readability
- **Accent**: `Fira Code` — for code snippets and technical details

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical, responsive
- Card padding: 24px
- Gap rhythm: 16px, 24px, 32px progression

### Motion Philosophy
- Subtle entrance animations: fade-up with 300ms ease-out, staggered 100ms
- Hover states: gentle scale (1.02) with accent glow
- Section transitions: smooth scroll behavior
- Loading states: pulsing skeleton with clinical teal accent

### Visual Assets
- Icons: Lucide icons (clean, medical-device aesthetic)
- Decorative: Subtle grid patterns, gradient glows, data-flow lines
- No emoji anywhere—use SVG icons only

## Layout & Structure

### Page Structure
1. **Navigation** — Fixed minimal header with logo, nav links, theme indicator
2. **Hero Section** — Full viewport, centered content with animated gradient, quick-link icons
3. **Projects Section** — Two prominent project cards with detailed tech specs
4. **Connect Section** — Command center footer with all platform links
5. **Footer** — Minimal copyright, timestamp

### Visual Pacing
- Hero: Expansive, breathing room, bold statement
- Projects: Dense information cards, data-rich
- Connect: Compact grid, easy scanning

### Responsive Strategy
- Desktop: Full layout with side-by-side project cards
- Tablet: Stacked projects, maintained spacing
- Mobile: Single column, adjusted typography scale

## Features & Interactions

### Hero Section
- Animated headline with gradient text effect
- Floating social icons with hover glow
- Subtle background animation (gradient shift or grid pulse)
- Smooth scroll to projects on CTA click

### Project Cards
- Hover: Elevated shadow, accent border glow
- Tech stack badges with syntax-highlighting colors
- Placeholder links styled as realistic buttons
- Feature list with checkmark icons

### Connect Section
- Grid of platform links with consistent iconography
- WhatsApp link with phone number
- Hover: icon scale + color shift
- Copy-to-clipboard for email (if added)

### Global Interactions
- Smooth scroll throughout
- Custom scrollbar (thin, accent-colored)
- Selection color matches accent palette
- Focus states for accessibility

## Component Inventory

### Navigation
- Logo: "MN" monogram or full name
- Links: About concept, Projects, Connect
- States: default (transparent), scrolled (background blur)

### Hero Badge
- Small pill with "Available for Projects" or status
- Pulse animation
- Green dot indicator

### Project Card
- Header: Title + tech stack badges
- Body: Description paragraph
- Features: Bulleted list with icons
- Footer: GitHub + Demo button links
- States: default, hover (glow + lift)

### Social Link Button
- Icon + optional label
- Circular or pill shape
- States: default, hover (scale + color), active (press)

### Section Heading
- Monospace font
- Small label above ("01.", "02.")
- Main heading below
- Subtle line decoration

## Technical Approach

- **Framework**: Single HTML file with embedded CSS/JS for portability
- **No build step required**: Can be deployed directly to Vercel, Netlify, or GitHub Pages
- **External dependencies**: Google Fonts only (JetBrains Mono, Inter)
- **Icons**: Inline SVG for social icons (no external icon library dependency)
- **Animation**: Pure CSS with JavaScript for scroll triggers
- **Responsive**: CSS Grid + Flexbox, mobile-first approach