import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";

export async function GET() {
    try {
      const allCategories = await db.select().from(categories);
      return NextResponse.json(allCategories, { status: 200 });
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  