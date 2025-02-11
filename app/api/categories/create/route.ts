import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { z } from "zod";

const categorySchema = z.object({
    name: z.string().min(3, "Category name must be at least 3 characters"),
  });

  export async function POST(req: Request) {
    try {
        const body = await req.json();

        //validate body
        const validation = categorySchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const newCategory = await db.insert(categories).values(body).returning();
        return NextResponse.json({ message: "Category created successfully", category: newCategory }, { status: 201 });
    }
    catch (error) {
        console.error("❌ Error creating category:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
  }
