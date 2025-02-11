import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db.select().from(users).where(users.email.equals(email)).execute();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  return NextResponse.json({ message: "Login successful", user });
}
