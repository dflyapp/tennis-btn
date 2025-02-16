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

target soon:

[x] migrate to app router /hinh-anh
[x] migrate to app router /giai-dau and /giai-dau/:id
[ ] use server action as much as possible, together with Suspense
[ ] use Supabase Storage (while migrating giai-dau)
