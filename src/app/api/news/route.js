import { NextResponse } from "next/server";
import { slugify } from '@/utils/routes'

const API_URL = process.env.JSON_PUBLIC_API_URL || "http://localhost:5001";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/news`);
    if (!res.ok) throw new Error("Failed to fetch news from external API");

    const news = await res.json();

    // Sort by date descending
    const sorted = news
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((item) => ({
        ...item,
        slug: slugify(item.title),
      }));

    return NextResponse.json(sorted);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}