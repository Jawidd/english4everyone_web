# English4All Leeds — Website

Free and paid English classes in Leeds. Modern, mobile-first, CMS-powered website.

---

## Architecture Overview

### Why CMS-based (no backend)?

This site uses **Sanity.io CMS** with **static hosting** (Cloudflare Pages). Here's why:

- **No server to maintain** — no crashes, no security patches, no bills for idle compute
- **Non-technical staff can edit content** — via Sanity Studio web interface
- **Fast and cheap** — static files served from Cloudflare's global CDN for free
- **Secure** — no database to manage, minimal attack surface

### How content flows through the system

```
Staff edits content in Sanity Studio
        ↓
Content stored in Sanity's hosted database
        ↓
React app fetches content via Sanity API at build time
        ↓
Vite builds static site with content baked in
        ↓
Static files deployed to Cloudflare Pages
        ↓
Served globally via Cloudflare CDN
```

### Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React + TypeScript | Type-safe, component-based |
| Styling | Tailwind CSS | Utility-first, mobile-first |
| Routing | React Router v6 | Client-side SPA routing |
| CMS | Sanity.io | Powerful, flexible, hosted CMS |
| Build | Vite | Fast builds, native ESM |
| Hosting | Cloudflare Pages | Static, free, global CDN |
| Local dev | npm scripts | Simple and fast |

---

## Project Structure

```
english4all-leeds/
├── content/                  ← Static content files (markdown)
│   ├── about.md
│   ├── classes.md
│   ├── join.md
│   ├── contact.md
│   ├── volunteering.md
│   └── news/                 ← News posts
│       └── *.md
├── studio/                   ← Sanity Studio (CMS interface)
│   ├── schemas/              ← Content type definitions
│   └── sanity.config.ts      ← Studio configuration
├── public/
│   ├── images/               ← Static images
│   └── admin/                ← Legacy CMS files (can be removed)
├── src/
│   ├── components/           ← Shared UI components
│   │   ├── Layout.tsx        ← Nav + Footer wrapper
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageHero.tsx
│   │   └── ContactCard.tsx
│   ├── pages/                ← One file per route
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Classes.tsx
│   │   ├── Join.tsx
│   │   ├── News.tsx
│   │   ├── NewsPost.tsx
│   │   ├── Contact.tsx
│   │   └── Volunteering.tsx
│   ├── lib/
│   │   ├── sanity.ts         ← Sanity client configuration
│   │   └── queries.ts        ← Sanity GROQ queries
│   ├── utils/
│   │   └── content.ts        ← Content loading utilities
│   ├── App.tsx               ← Router setup
│   ├── main.tsx              ← Entry point
│   └── index.css             ← Tailwind + global styles
└── vite.config.ts            ← Build configuration
```

---

## Local Development

### Prerequisites

- [Node.js 18+](https://nodejs.org/) installed
- npm (comes with Node.js)

### Start the dev server

```bash
npm install
npm run dev
```

The site will be available at **http://localhost:5173**

Code changes are reflected instantly (hot reload).

### Build for production

```bash
npm run build
```

This creates a `dist/` folder with the static files ready for deployment.

### Preview production build

```bash
npm run preview
```

---

## Sanity Studio (CMS)

### Local development

```bash
cd studio
npm install
npm run dev
```

Studio will be available at **http://localhost:3333**

### Deploy Studio

```bash
cd studio
npm run deploy
```

This deploys the Studio to Sanity's hosted platform.

---

## Deployment to Cloudflare Pages

### Automatic deployment (recommended)

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your GitHub repository
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18` or higher
5. Deploy!

Cloudflare Pages will automatically rebuild and deploy on every commit to your main branch.

### Manual deployment

```bash
# Build the site
npm run build

# Install Wrangler CLI (Cloudflare's CLI tool)
npm install -g wrangler

# Deploy to Cloudflare Pages
wrangler pages deploy dist
```

---

## Content Management

### Accessing Sanity Studio

The CMS is available at your deployed Studio URL (e.g., `https://your-project.sanity.studio`) or locally at `http://localhost:3333` when running the Studio in development mode.

### Adding activities

1. Go to Sanity Studio
2. Click **"Activities"** in the sidebar
3. Click **"Create new Activity"**
4. Fill in the activity details
5. Click **"Publish"**

The website will automatically fetch the new content on the next build/deployment.

### Managing content

All content is managed through Sanity Studio. The website fetches content from Sanity's API during the build process, so changes will appear after the next deployment.

---

## Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_SANITY_WEBSITE_TOKEN=your_sanity_read_token
```

This token allows the website to fetch content from Sanity. Get it from your Sanity project settings.

---

## Adding a New Page

1. Create the content file: `content/my-page.md` (if using static content)
2. Or add a new content type in Sanity Studio schemas
3. Add a new page component: `src/pages/MyPage.tsx`
4. Add the route in `src/App.tsx`
5. Add the link in `src/components/Navbar.tsx`

---

## Accessibility

This site is built for low-level English learners and follows WCAG 2.1 AA:

- Large base font size (18px)
- High contrast colours
- All interactive elements have focus styles
- All icons have `aria-hidden="true"` (decorative)
- All images require alt text
- Semantic HTML throughout
