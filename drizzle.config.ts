import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export default defineConfig({
  schema: "./drizzle/schema.ts", // Path to your schema file
  out: "./drizzle/migrations", // Where migrations are stored
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "", // Supabase PostgreSQL URL
  },
});
