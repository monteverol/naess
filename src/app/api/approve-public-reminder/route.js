import fs from 'fs';
import path from 'path';
// app/api/approve-public-reminder/route.js
export async function GET(request) {
  const API_URL = process.env.JSON_PUBLIC_API_URL || "http://localhost:5001";
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const text = searchParams.get("text");

  if (!date || !time || !text) {
    return new Response("Missing parameters", { status: 400 });
  }

  // POST to json-server
  try {
    await fetch(`${API_URL}/publicReminders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time, text })
    });

    return new Response(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem;">
          <h2>Reminder Approved</h2>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Text:</strong> ${text}</p>
          <p style="margin-top: 1rem;">This reminder is now public.</p>
        </body>
      </html>
    `, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (err) {
    console.error("Failed to POST to json-server:", err);
    return new Response("Error posting to public reminders", { status: 500 });
  }
}