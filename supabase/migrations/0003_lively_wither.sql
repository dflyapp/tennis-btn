ALTER TABLE "counts_table" RENAME COLUMN "age" TO "count";--> statement-breakpoint
ALTER TABLE "counts_table" ALTER COLUMN "count" DROP NOT NULL;