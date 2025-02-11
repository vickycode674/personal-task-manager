import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const body = await req.json();
    const { title, description, priority, status } = body;

    // Check if task exists
    const existingTask = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (existingTask.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update the task
    const updatedTask = await db
      .update(tasks)
      .set({
        title: title ?? existingTask[0].title,
        description: description ?? existingTask[0].description,
        priority: priority ?? existingTask[0].priority,
        status: status ?? existingTask[0].status
      })
      .where(eq(tasks.id, taskId))
      .returning();

    return NextResponse.json({ message: "Task updated successfully", task: updatedTask[0] }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
