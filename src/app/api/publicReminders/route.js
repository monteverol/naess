import { NextResponse } from "next/server";

const API_URL = process.env.JSON_PUBLIC_API_URL || "http://localhost:5001";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/publicReminders`);
    if (!res.ok) throw new Error("Failed to fetch news from external API");
    const reminders = await res.json();
    
    return NextResponse.json(reminders);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch reminders" }, { status: 500 });
  }
}