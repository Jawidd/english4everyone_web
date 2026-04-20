# English4All Leeds — Website

Free and paid English classes in Leeds. Modern, mobile-first, CMS-powered website.

---

## Architecture Overview

### Why CMS-based (no backend)?

This site uses a **Git-based CMS** (Decap CMS) with **static hosting** (AWS S3 + CloudFront). Here's why:

- **No server to maintain** — no crashes, no security patches, no bills for idle compute
- **Non-technical staff can edit content** — via a simple web UI at `/admin`
- **Fast and cheap** — static files served from a CDN cost pennies per month
- **Secure** — no database, no API, no attack surface

### How content flows through the system

```
Staff edits content in Decap CMS (/admin)
        ↓
CMS commits Markdown file to Git (e.g. /content/news/my-post.md)
        ↓
CI/CD pipeline runs `npm run build`
        ↓
Vite reads all .md files at build time (import.meta.glob)
        ↓
gray-matter parses frontmatter + body from each file
        ↓
React components render the content as HTML
        ↓
Static files uploaded to S3 → served via CloudFront CDN
```

### Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React + TypeScript | Type-safe, component-based |
| Styling | Tailwind CSS | Utility-first, mobile-first |
| Routing | React Router v6 | Client-side SPA routing |
| Content | Markdown files in `/content/` | Human-readable, Git-tracked |
| CMS | Decap CMS | Simple UI, no backend needed |
| Build | Vite | Fast builds, native ESM |
| Hosting | AWS S3 + CloudFront | Static, cheap, global CDN |
| Local dev | Docker + docker-compose | Consistent environment |

---

## Project Structure

```
english4all-leeds/
├── content/                  ← ALL editable content lives here
│   ├── about.md
│   ├── classes.md
│   ├── join.md
│   ├── contact.md
│   ├── volunteering.md
│   └── news/                 ← One .md file per news post
│       └── *.md
├── public/
│   └── admin/
│       ├── index.html        ← Decap CMS admin panel
│       └── config.yml        ← CMS field definitions
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
│   ├── utils/
│   │   └── content.ts        ← Loads and parses Markdown files
│   ├── App.tsx               ← Router setup
│   ├── main.tsx              ← Entry point
│   └── index.css             ← Tailwind + global styles
├── infrastructure/
│   └── cloudformation.yml    ← S3 + CloudFront stack
├── Dockerfile                ← Local dev only
├── docker-compose.yml        ← Local dev only
└── deploy.sh                 ← Deploy script
```

---

## Local Development (Docker)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed

### Start the dev server

```bash
docker compose up
```

The site will be available at **http://localhost:5173**

Code changes are reflected instantly (hot reload) — no need to restart the container.

### First time / after adding packages

```bash
docker compose up --build
```

### Stop

```bash
docker compose down
```

---

## Running Without Docker

If you have Node.js 18+ installed:

```bash
npm install
npm run dev
```

---

## CMS Usage (For Staff)

### Accessing the CMS

Go to: `https://your-site.com/admin`

Log in with your Netlify Identity account. Contact your site administrator if you don't have an account.

### Adding a news post

1. Click **"News Posts"** in the left sidebar
2. Click **"New News Post"**
3. Fill in:
   - **Title** — the headline
   - **Date** — when it happened
   - **Short Summary** — 1–2 sentences (shown on the news list page)
   - **Image** — optional photo
   - **Body** — the full article (use the rich text editor)
4. Click **"Publish"**

The site will automatically rebuild and the post will appear within a few minutes.

### Editing a page (About, Classes, etc.)

1. Click **"Pages"** in the left sidebar
2. Click the page you want to edit (e.g. "About")
3. Edit the text fields
4. Click **"Publish"**

### Updating contact details

Contact details (email, phone, WhatsApp) are stored in the frontmatter of:
- `content/join.md` — shown on the Join page
- `content/contact.md` — shown on the Contact page

Edit these via the CMS under **Pages → How to Join** or **Pages → Contact**.

---

## Deployment

### One-time setup: Deploy AWS infrastructure

```bash
# Deploy the CloudFormation stack (creates S3 bucket + CloudFront)
aws cloudformation deploy \
  --template-file infrastructure/cloudformation.yml \
  --stack-name english4all-leeds \
  --capabilities CAPABILITY_IAM

# Get the outputs (bucket name + CloudFront URL)
aws cloudformation describe-stacks \
  --stack-name english4all-leeds \
  --query "Stacks[0].Outputs"
```

### Deploy the site

```bash
# Build and upload to S3 (replace with your actual values from CloudFormation outputs)
./deploy.sh english4all-leeds-website-123456789 E1ABCDEF123456
```

### Automated deployment (recommended)

For automatic deploys on every Git push, connect your repo to **Netlify** (free tier):

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Enable **Netlify Identity** (for CMS login)
6. Enable **Git Gateway** (for CMS to commit changes)

Netlify will automatically rebuild and deploy on every commit.

---

## CMS Setup (Decap CMS + Netlify Identity)

If hosting on Netlify:

1. Go to **Site settings → Identity → Enable Identity**
2. Under **Registration**, set to **Invite only**
3. Go to **Site settings → Identity → Services → Git Gateway → Enable**
4. Invite staff members via **Identity → Invite users**

Staff will receive an email to set their password, then can log in at `/admin`.

---

## Adding a New Page

1. Create the content file: `content/my-page.md`
2. Add a new page component: `src/pages/MyPage.tsx`
3. Add the route in `src/App.tsx`
4. Add the link in `src/components/Navbar.tsx`
5. Add the CMS collection in `public/admin/config.yml`

---

## Accessibility

This site is built for low-level English learners and follows WCAG 2.1 AA:

- Large base font size (18px)
- High contrast colours
- All interactive elements have focus styles
- All icons have `aria-hidden="true"` (decorative)
- All images require alt text
- Semantic HTML throughout
