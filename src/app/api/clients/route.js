import { NextResponse } from "next/server";

const API_URL = process.env.JSON_PUBLIC_API_URL || "http://localhost:5001";

export async function GET() {
  const res = await fetch(`${API_URL}/clients`);
  const clients = await res.json();

  return NextResponse.json(clients);
}