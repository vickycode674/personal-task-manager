import { NextResponse } from "next/server";

export async function POST() {
  console.log("POST REQUEST RECEIVED AT /api/auth/logout ✅");

  try {
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout API ❌:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
