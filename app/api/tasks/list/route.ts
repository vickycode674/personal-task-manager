import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema"; // Changed from projects to tasks
import { and, eq } from "drizzle-orm"; // Use AND condition

export async function GET(req: Request) {
  try {
    console.log("Here is the request==================",req);

    // Extract userId and projectId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const projectId = searchParams.get("projectId");

    console.log("✅ Request received in /tasks API");
    console.log("🔹 Extracted userId:", userId);
    console.log("🔹 Extracted projectId:", projectId);

    // Check if userId or projectId is missing
    if (!userId || !projectId) {
      console.warn("❌ Missing userId or projectId in request!");
      return NextResponse.json({ error: "Unauthorized: Missing userId or projectId" }, { status: 401 });
    }
    console.log("✅ userId and projectId are present",userId,tasks.user_id,projectId,tasks.project_id);

    // Fetch tasks where user_id and project_id match
    const userTasks = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.user_id, userId), eq(tasks.project_id, projectId)));

    console.log("✅ Fetched tasks for project:", userTasks);

    return NextResponse.json(userTasks, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
