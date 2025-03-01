## Tennis forum

change readme

## Database

Supabase Free Tier: replace all new env variables.

Supabase is for auth, storage.

Drizzle is for types, migration, create tables and relationship...

1. step 1: migration: `npx drizzle-kit generate`
2. step 2: push to remote `npx drizzle-kit migrate`

## Notes

- next-sitemap is not generating for /bang-diem/nam and /bang-diem/nu

## To do

[ ] migrate to app router /hinh-anh
[ ] migrate to app router /giai-dau and /giai-dau/:id
[ ] use server action as much as possible, together with Suspense
[ ] use Supabase Storage (while migrating giai-dau)

## Span name

- editPlayer
- createPlayer
- clearCacheAndRefetch

## Start with Netlify Localhost

- install Netlify CLI: `npm install -g netlify-cli`
- link with project: `netlify link`
- start localhost: `netlify dev` (will start on port 3000 and 8888 proxy)
- build local: `netlify build`
