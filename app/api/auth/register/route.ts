import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";

export async function POST(req: Request) {
  try {
    console.log("POST REQUEST RECEIVED AT /api/auth/register ✅");

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const newUser = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning();

    console.log("USER REGISTERED SUCCESSFULLY ✅", newUser);

    return NextResponse.json({ message: "User registered", user: newUser[0] }, { status: 201 });
  } catch (error) {
    console.error("Error in register API ❌:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
