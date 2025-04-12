import { NextResponse } from "next/server";

const API_URL = process.env.JSON_PUBLIC_API_URL || "http://localhost:5001";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/announcements`);
    if (!res.ok) throw new Error("Failed to fetch news from external API");

    const announcement = await res.json();

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}