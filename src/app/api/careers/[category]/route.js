// File: src/app/api/careers/[category]/route.js
import { NextResponse } from "next/server";

const API_URL = process.env.JSON_PUBLIC_API_URL || "http://localhost:5001";

export async function GET(request, { params }) {
  const { category } = params;

  const validKeys = ['job_vacancy', 'benefits', 'testimonials', 'faqs'];

  if (!validKeys.includes(category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_URL}/careers`);
    const data = await res.json();

    const filteredData = data?.[category] || [];
    return NextResponse.json(filteredData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}