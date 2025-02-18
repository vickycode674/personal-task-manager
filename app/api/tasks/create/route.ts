import { NextResponse } from "next/server";
import { db } from "@/drizzle/db"; 
import { tasks } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import {z} from "zod";

//zod validation
const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  due_date: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  project_id: z.number().int("Project ID must be an integer"),
});

export async function POST(req: Request) {
  try {
    console.log("Here is the request body==========================",req);

    const body = await req.json();

    console.log("Here isthe body which is coming==========================",body);

    const validation = taskSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

        const { title, description, due_date, status, priority, project_id, user_id } = body;


    if (!title || !description || !user_id) {
      return NextResponse.json({ error: "Title, Description, and User ID are required" }, { status: 400 });
    }
    const formattedDueDate = due_date ? new Date(due_date) : null;


    const newTask = await db
      .insert(tasks)
      .values({ title, description, due_date :formattedDueDate, status, priority, project_id, user_id })
      .returning();

    console.log("✅ Task created successfully:", newTask);

    return NextResponse.json({ message: "Task created successfully", task: newTask[0] }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("project_id");

    let query = db.select().from(tasks);
    if (projectId) {
      query = query.where(eq(tasks.project_id, parseInt(projectId)));
    }

    const allTasks = await query;
    return NextResponse.json(allTasks, { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
