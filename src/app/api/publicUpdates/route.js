import { NextResponse } from "next/server";

const API_URL = process.env.JSON_PUBLIC_API_URL || "http://localhost:5001";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/publicUpdates`);
    if (!res.ok) throw new Error("Failed to fetch news from external API");

    const reminders = await res.json();

    const now = new Date();

    // filter + sort
    const filteredAndSorted = reminders
      .filter((reminder) => {
        const start = new Date(reminder.startDate);
        return !isNaN(start) && start > now;
      })
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return NextResponse.json(filteredAndSorted);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch reminders" }, { status: 500 });
  }
}