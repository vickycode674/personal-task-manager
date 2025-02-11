import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(), // Store hashed password
});

// Tasks Table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  due_date: timestamp("due_date"),
  status: text("status").default("pending"),
  priority: integer("priority").default(1),
  project_id: integer("project_id").references(() => projects.id, { onDelete: "cascade" }),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
});

// Projects Table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
});

// Categories Table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});
