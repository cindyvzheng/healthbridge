# HealthBridge

A free resource hub helping low-income students explore healthcare careers — medicine, public health, health policy, nursing, and health economics. No cost, no login required.

---

## Local Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other commands:

```bash
npm run build   # Production build
npm run start   # Run the production build locally
npm run lint    # Lint the codebase
```

---

## Folder Structure

```
healthbridge/
├── public/                  # Static assets (SVGs, images)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout — Nav, Footer, global metadata
│   │   ├── page.tsx         # Home page
│   │   ├── globals.css      # Global styles, CSS variables (colors, fonts)
│   │   ├── about/
│   │   │   └── page.tsx     # About page
│   │   ├── contact/
│   │   │   └── page.tsx     # Contact page
│   │   ├── join/
│   │   │   └── page.tsx     # Volunteer / join page
│   │   ├── pathways/
│   │   │   └── page.tsx     # Career pathways page
│   │   └── resources/
│   │       └── page.tsx     # Resources library page
│   └── components/
│       ├── Nav.tsx           # Top navigation bar
│       └── Footer.tsx        # Site footer
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

---

## Where to Find and Edit Content

### Text content
All page text is written directly in the page components. Find the relevant page file and edit the string values inline.

| Content | File |
|---|---|
| Hero headline, subheading, CTAs | `src/app/page.tsx` |
| Career pathway names and descriptions | `src/app/page.tsx` — `paths` array (~line 122) |
| Resource list items | `src/app/page.tsx` — resources array (~line 774) |
| Open volunteer roles | `src/app/page.tsx` — roles array (~line 980) |
| About / founder story | `src/app/about/page.tsx` |
| Contact details | `src/app/contact/page.tsx` |
| Join / application info | `src/app/join/page.tsx` |
| Nav links | `src/components/Nav.tsx` |
| Footer links and text | `src/components/Footer.tsx` |
| Page title and SEO description | `src/app/layout.tsx` — `metadata` object |

### Colors and design tokens
All colors are defined as CSS variables in `src/app/globals.css`. Change a variable there and it updates everywhere:

```css
--ink: #1a1a1a;
--cream: #f5f0e8;
--forest: #2e5e2e;
--terra: #b5462a;
/* etc. */
```

### Images
Static images live in `public/`. Reference them in components as `/filename.svg` (no `public/` prefix needed).

### Third-party embeds
There are two embeds with placeholder IDs that need to be replaced before going live:

- **Typeform quiz** (`src/app/page.tsx` ~line 596): Replace `YOUR_TYPEFORM_ID` with your actual Typeform form ID.
- **Beehiiv newsletter** (`src/app/page.tsx` ~line 883): Replace `YOUR_PUBLICATION_ID` with your Beehiiv publication ID.

---

## Dependencies

### Runtime
| Package | Purpose |
|---|---|
| `next` 16 | React framework (App Router) |
| `react` / `react-dom` 19 | UI library |
| `framer-motion` | Page animations and scroll effects |
| `lenis` | Smooth scroll |
| `@fontsource/syne` | Syne font (headings, UI labels) |
| `@fontsource/dm-serif-display` | DM Serif Display font (italic accents) |
| `@fontsource/plus-jakarta-sans` | Plus Jakarta Sans font (body text) |
| `@fontsource/fraunces` | Fraunces font (alternate serif) |

### Dev
| Package | Purpose |
|---|---|
| `tailwindcss` v4 | Utility CSS (used minimally; most styles are inline) |
| `typescript` | Type checking |
| `eslint` | Linting |
