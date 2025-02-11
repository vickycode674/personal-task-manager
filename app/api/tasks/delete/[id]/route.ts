import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a valid number"),
});

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const idValidation = idSchema.safeParse(params);
    if (!idValidation.success) {
      return NextResponse.json({ error: idValidation.error.format() }, { status: 400 });
    }
    const taskId = parseInt(params.id);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const existingTask = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (existingTask.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    await db.delete(tasks).where(eq(tasks.id, taskId));

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
