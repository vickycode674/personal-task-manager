import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { projects } from "@/drizzle/schema";

export async function GET() {
    try {
      const allProjects = await db.select().from(projects);
      return NextResponse.json(allProjects, { status: 200 });
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  