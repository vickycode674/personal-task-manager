import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";


const idSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a valid number"),
  });
  
export async function DELETE(req: Request) {
  try {
    //params shouldnt be used we need to use the URL RATHER THAN PARAMS BRO
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Get the last part of the URL
    const categoryId = parseInt(id || "0");

    const idValidation = idSchema.safeParse(categoryId);
        if (!idValidation.success) {
          return NextResponse.json({ error: idValidation.error.format() }, { status: 400 });
        }

    // Validate category ID
    if (isNaN(categoryId) || categoryId <= 0) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    // Check if category exists
    const existingCategory = await db.select().from(categories).where(eq(categories.id, categoryId));
    if (existingCategory.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Delete category
    await db.delete(categories).where(eq(categories.id, categoryId));

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
