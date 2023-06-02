create dir 
`mkdir -p prisma/migrations/0_init`

create or change schema.prisma file: 
`npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql`

migrate database:
`npx prisma migrate dev --name first-migration`

