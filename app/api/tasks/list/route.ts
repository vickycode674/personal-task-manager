import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema"; // Changed from projects to tasks
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    // Extract userId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    console.log("✅ Request received in /tasks API");
    console.log("🔹 Extracted userId:", userId);

    // Check if userId is missing
    if (!userId) {
      console.warn("❌ Missing userId in request!");
      return NextResponse.json({ error: "Unauthorized: Missing userId" }, { status: 401 });
    }

    // Fetch tasks where the user is the owner
    const userTasks = await db
      .select()
      .from(tasks) // Changed to tasks table
      .where(eq(tasks.user_id, userId));

    console.log("✅ Fetched tasks:", userTasks.length);

    return NextResponse.json(userTasks, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
