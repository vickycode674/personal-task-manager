import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { projects } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // Extract userId from query params

    let projectQuery;

    if (userId) {
      // Fetch only projects belonging to the user
      projectQuery = db.select().from(projects).where(eq(projects.user_id, userId));
    } else {
      // Fetch all projects if no userId is provided
      projectQuery = db.select().from(projects);
    }

    const allProjects = await projectQuery;
    return NextResponse.json(allProjects, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
