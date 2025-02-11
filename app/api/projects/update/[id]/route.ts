import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { projects } from "@/drizzle/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const body = await req.json();
      
      const projectSchema = z.object({
        name: z.string().min(3, "Project name must be at least 3 characters"),
        user_id: z.number().int("User ID must be an integer")
      });
      
      // Validate request
      const validation = projectSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
      }
  
      const projectId = parseInt(params.id);
      if (isNaN(projectId)) {
        return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
      }
  
      const updatedProject = await db.update(projects)
        .set(body)
        .where(eq(projects.id, projectId))
        .returning();
  
      return NextResponse.json({ message: "Project updated successfully", project: updatedProject }, { status: 200 });
  
    } catch (error) {
      console.error("❌ Error updating project:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  