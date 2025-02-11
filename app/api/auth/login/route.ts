import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("POST REQUEST RECEIVED AT /api/auth/login ✅");

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log("USER LOGGED IN SUCCESSFULLY ✅", user[0]);

    return NextResponse.json({ message: "Login successful", user: user[0] });
  } catch (error) {
    console.error("Error in login API ❌:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
