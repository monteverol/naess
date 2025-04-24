import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db.json');

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
  }

  try {
    let data = { subscribers: [] };

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      data = JSON.parse(fileData);
    }

    if (data.subscribers.includes(email)) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    }

    data.subscribers.push(email);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}