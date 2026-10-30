# Pixelpath Academy (Task 1: React + Vite + Supabase)

A responsive, animated learning-academy website with five pages: Home, Courses, Course Details, About and Contact.

**Stack:** Vite 8, React 19, React Router 7, Tailwind CSS 4 (`@tailwindcss/vite`), Motion (animation), Supabase (Postgres)

## Features
- Home, Courses, Course Details (`/courses/:slug`), About, Contact
- Course search, category filter (synced to the URL), level filter and sorting that work together
- Contact form with validation, saved to a Supabase `messages` table
- Animation: staggered headline reveal, floating hero tiles, scroll-reveal sections, animated counters, progress bars, scrolling topic strip, testimonial carousel, animated filter results, page transitions, scroll progress bar, success check drawing
- Animation respects the visitor's reduced-motion setting
- Skeleton loaders while data loads, empty state when no course matches
- Falls back to `src/data/courses.json` if Supabase is not configured

## Run locally
```bash
npm install
cp .env.example .env.local    # then add your Supabase URL and anon key
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## Set up Supabase
1. Create a project at supabase.com.
2. SQL Editor: run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Project Settings > API: copy the Project URL and the `anon` public key into `.env.local`.

Row Level Security is on. The public key can read `courses` and insert into `messages`, but cannot read messages. Read them in the Supabase Table Editor.

## Deploy (Vercel)
1. Push this folder to GitHub and import the repo in Vercel (framework preset: Vite).
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Environment Variables.
3. Deploy. `vercel.json` already rewrites all routes to `index.html` so page refreshes work.

## Project structure
```
src/pages        Home, Courses, CourseDetail, About, Contact, NotFound
src/components   Header, Footer, CourseCard, CourseCover, HeroMosaic, Mosaic, ContactForm, Reveal, CountUp
src/lib          Supabase client, courses provider, category helpers, tile generator
src/data         fallback course data
supabase         schema.sql and seed.sql
```

## Design notes
- Pixelpath: a pixel is the smallest piece of a picture and a path is how you get there. The logo is a pixel-built "P" with three coloured pixels climbing into it. That staircase repeats in the hero, footer and 404 page, the section headings use the same three pixels, and buttons have a pixel-style press shadow. Logo files are in `public/logo.svg` and `public/favicon.svg`.
- Four category colours (cobalt, rose, amber, teal) on a cool paper background with navy ink.
- Type: Bricolage Grotesque for headings, Figtree for body text.

## AI and template disclosure
- AI tool used: Claude (Anthropic) helped generate the project structure, sample course copy and code. I reviewed, ran and adjusted it.
- No paid templates or UI kits. Fonts load from Google Fonts.
- Course content, instructor names, testimonials and contact details are sample data.
