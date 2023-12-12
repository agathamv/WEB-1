// En api/admi/route.js

import { writeFileSync, readFileSync } from 'fs';
import { NextResponse } from 'next/server';

// Maneja solicitudes POST
export async function POST(req) {
  const data = await req.json();

  try {
    const users = JSON.parse(readFileSync("data/admin.txt"));
    writeFileSync("data/admin.txt", JSON.stringify([...users, data]));
  } catch (e) {
    writeFileSync("data/admin.txt", JSON.stringify([data]));
  }

  return NextResponse.json({ message: "Guardando" });
}

// Maneja solicitudes GET
export async function GET() {
  try {
    const users = JSON.parse(readFileSync("data/admin.txt"));
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json([]);
  }
}
