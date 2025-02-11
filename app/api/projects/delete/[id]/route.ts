import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { projects } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a valid number"),
});

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const idValidation = idSchema.safeParse(params);
    if (!idValidation.success) {
      return NextResponse.json({ error: idValidation.error.format() }, { status: 400 });
    }
    
      const projectId = parseInt(params.id);
      if (isNaN(projectId)) {
        return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
      }
  
      const existingProject = await db.select().from(projects).where(eq(projects.id, projectId));
      if (existingProject.length === 0) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
  
      await db.delete(projects).where(eq(projects.id, projectId));
  
      return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  
    } catch (error) {
      console.error("❌ Error deleting project:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  