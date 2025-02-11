import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { projects } from "@/drizzle/schema";
import { z } from "zod";

const projectSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    user_id: z.number().int("User ID must be an integer")
  });

  export async function POST(req: Request) {
    
    try {
        const body = await req.json();

        // Validate request using Zod
    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const newProject = await db.insert(projects).values(body).returning();
    return NextResponse.json({ message: "Project created successfully", project: newProject }, { status: 201 });
    }
    catch (error) {
        console.error("❌ Error creating project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
  }