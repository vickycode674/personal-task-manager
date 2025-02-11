CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"description" text,
	"due_date" timestamp,
	"status" varchar(50),
	"priority" integer,
	"project_id" integer,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"password" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
