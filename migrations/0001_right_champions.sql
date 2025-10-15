ALTER TABLE "users" DROP CONSTRAINT "users_university_card_unique";--> statement-breakpoint
DROP TYPE "public"."borrow_status";--> statement-breakpoint
CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED');