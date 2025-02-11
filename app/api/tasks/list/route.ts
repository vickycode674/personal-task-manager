import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema";

export async function GET() {
    try {
        const allTasks = await db.select().from(tasks);
        return NextResponse.json({ tasks: allTasks });
    }
    catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
  