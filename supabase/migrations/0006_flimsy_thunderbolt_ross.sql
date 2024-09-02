CREATE TABLE IF NOT EXISTS "players_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ref_id" integer NOT NULL,
	"is_male" boolean,
	"name" text NOT NULL,
	"max" integer NOT NULL,
	"min" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
