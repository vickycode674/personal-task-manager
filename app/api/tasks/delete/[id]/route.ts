import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Validate ID as a string first, then convert to number
const idSchema = z.string().regex(/^\d+$/, "ID must be a valid number");

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Validate the ID
    const idValidation = idSchema.safeParse(params.id);
    if (!idValidation.success) {
      console.error("❌ Invalid Task ID:", idValidation.error.format());
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const taskId = parseInt(params.id, 10); // Convert to number
    console.log("🔹 Deleting Task ID:", taskId);

    // Check if the task exists
    const existingTask = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (existingTask.length === 0) {
      console.error("❌ Task not found:", taskId);
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Delete the task
    await db.delete(tasks).where(eq(tasks.id, taskId));

    console.log("✅ Task deleted successfully:", taskId);
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Error deleting task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
