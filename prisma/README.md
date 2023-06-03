# Prisma Notes

Prisma is an ORM pattern to control remote database with local code.
We can use remote service: Neon DB, Prisma ORM and NextJS Client for a full stack application.

- migrate database: `npx prisma migrate dev --name first-migration`

### production:

- config with env var `DATABASE_URL`
- we must create migrate script files in order to use `deploy` one.
- migrate or push new updates: `npx prisma migrate deploy`
- production deployment shouldn't use migrate dev, we just use `migrate deploy` to apply changes from `schema.prisma`

### development with shadow database:

- config with env var `SHADOW_DATABASE_URL`
- pull latest instrospect database `npx prisma db pull`
- generate types or related logics (if needed) `npx prisma generate`
- script `npx prisma migrate dev --name add_table` only used for local development.
- we can't use direct production database to do migration, we need another Postgres server to do that.
- make sure everything works fine on dev mode and then we can use deploy `npx prisma migrate deploy`

### first time using Prisma with already exsiting Postgres service

we need to instrospect remote database and create first time migration script on local

create dir `mkdir -p prisma/migrations/0_init`

create or change schema.prisma file:

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```
