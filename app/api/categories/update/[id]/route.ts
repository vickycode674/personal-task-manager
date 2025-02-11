import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const body = await req.json();
      
      const categorySchema = z.object({
        name: z.string().min(3, "Category name must be at least 3 characters"),
      });
    
      
      // Validate request
      const validation = categorySchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
      }
  
      const categoryId = parseInt(params.id);
      if (isNaN(categoryId)) {
        return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
      }
  
      const updatedCategory = await db.update(categories)
        .set(body)
        .where(eq(categories.id, categoryId))
        .returning();
  
      return NextResponse.json({ message: "Project updated successfully", categories: updatedCategory }, { status: 200 });
  
    } catch (error) {
      console.error("❌ Error updating project:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }