# YOUWARE Guide – Maison du Café Web Experience

## Overview
- **Project Type**: React 18 + TypeScript with Vite 7
- **Primary Entry**: `src/main.tsx` → `App.tsx`
- **Styling**: Tailwind CSS (utility-first) plus inline style objects for bespoke backgrounds
- **Animation**: Framer Motion for reveal and hover interactions
- **Purpose**: Single-page marketing site for “Maison du Café”, a modern artisanal coffee shop with warm, cozy aesthetics

## Key Features Implemented
1. **Immersive Hero & Storytelling**
   - Hero grid pairing narrative copy with lifestyle photography, warm gradients, and soft-motion CTAs
   - Statistics + call-to-action chips emphasizing artisanal offerings (single-origin rotations, syrups, pastries)
2. **Curated Menu Sections**
   - Featured drinks and pastry cards rendered from typed arrays (`featuredDrinks`, `pastries`)
   - Each card blends gradient badges, organic images, pricing, and ritual-driven CTA copy
3. **Team Showcase**
   - “Meet Our Baristas” grid with portraits, roles, and backstories highlighting craftsmanship
4. **Visit Section**
   - Location, hours, and contact details in textured cards beside an ambient interior photo
5. **About Section (Quem Somos) with Timeline**
   - Modern tree/timeline layout showing company milestones from 2019 to 2024
   - Alternating layout for desktop (left/right) with vertical alignment
   - Each milestone displays year, title, description, and associated imagery
   - Responsive design adapts to mobile with stacked layout and centered timeline
6. **Contact Form Section**
   - Form with name, email, subject, and message fields (styled consistently with site cards)
   - Responsive layout with focus states and rounded styling matching design language
7. **Responsive Sticky Navigation**
   - Rounded navigation with espresso-toned gradients, mobile drawer state, and `Order Now` CTA
8. **Visual Language**
   - Palette: browns/creams/beige, linen textures, soft shadows, rounded geometry
   - Organic background blobs, subtle gradients, and serif headings convey artisan warmth
9. **Footer**
   - Compact brand signature plus artisanal tagline for closing sentiment

## Architecture Notes
- The coffee shop layout is built directly inside `App.tsx`; legacy template imports (HeroSection, FeaturesSection, etc.) were removed.
- Arrays of typed menu data (`MenuItem`, `Barista`) keep content organized and ready for future sourcing from APIs or CMS.
- Shared animation configuration (`sectionTransition`) centralizes reveal timing for each section.
- Mobile navigation toggling handled with local state (`menuOpen`) and Framer Motion transitions.
- Background treatments combine Tailwind utilities with inline `style` for blended textures and Unsplash imagery.

## Styling & Interaction Guidelines
- Tailwind utility classes drive spacing, typography, and rounded geometry; prefer custom class strings over new global CSS.
- Maintain soft-light gradients and blur-based “organic blobs” when extending sections for visual continuity.
- Extend content using existing data structures to preserve consistent card composition.
- When adding assets, prefer high-resolution lifestyle photography via HTTPS URLs (Unsplash-quality) and absolute paths if moved to `/public`.

## Commands
- Install dependencies: `npm install`
- Production build (required after changes): `npm run build`

## Recent Additions
- **About Section (Quem Somos) with Timeline**: Added a modern tree-style timeline section above Visit section.
  - 6 major milestones from 2019-2024 with professional card layout
  - Alternating left/right layout on desktop for visual variety
  - Vertical centerline connecting all milestones
  - Each milestone has year, title, description, and background imagery
  - Responsive mobile layout with stacked cards and centered timeline
  - Smooth scroll-reveal animations with staggered delays

- **Contact Form Section**: Added a new contact form section below the Visit section with consistent styling (organic blobs, rounded cards, color palette).
  - Form fields: name, email, subject, message with focus states
  - Submit button styled with hover animations matching site conventions

- **Expandable Drinks Menu with Animated Arrow Icon**: Enhanced drinks section with interactive expand/collapse functionality.
  - Added `ChevronDown` icon from lucide-react before "Ver lista completa de bebidas" button
  - Icon rotates 180° when menu expands/collapses (Framer Motion animation, 0.3s duration)
  - Button shows expanded spacing on hover for visual feedback (gap increases from 0.5rem to 0.625rem)
  - 6 additional drinks loaded dynamically when expanded
  - Entrance animations for new drink cards on expansion

- **Pairing Spotlight Section**: Introduced a new home section showcasing seasonal café + sobremesa harmonization.
  - Two-column layout with editorial copy, highlight cards, and a hero photograph sourced from Pixabay (ID 1839134)
  - Section follows established organic blob motifs and rounded geometry with Framer Motion reveal
  - Includes CTA capsule detailing a 20-minute guided session and featured pairing insights for November
