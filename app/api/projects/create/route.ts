import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { projects } from "@/drizzle/schema";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  userId: z.number().int("User ID must be an integer"),
});

export async function POST(req: Request) {
  try {
    console.log("📩 Incoming request for project creation...");

    // Parse and validate request body
    const body = await req.json();
    console.log("📜 Parsed request body:", body);

    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      console.error("❌ Validation failed:", validation.error.format());
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    // Insert project into database with both name & userId
    const { name, userId } = validation.data;
    const newProject = await db
      .insert(projects)
      .values({ name, user_id: userId })  // Ensure the column names match the schema
      .returning();

    console.log("✅ Project created successfully:", newProject);
    return NextResponse.json({ message: "Project created successfully", project: newProject }, { status: 201 });

  } catch (error) {
    console.error("❌ Error creating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
