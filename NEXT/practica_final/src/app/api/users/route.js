// En api/users/route.js

import { writeFileSync, readFileSync } from 'fs';
import { NextResponse } from 'next/server';

// Maneja solicitudes POST
export async function POST(req) {
  const data = await req.json();

  try {
    const users = JSON.parse(readFileSync("data/users.txt"));
    writeFileSync("data/users.txt", JSON.stringify([...users, data]));
  } catch (e) {
    writeFileSync("data/users.txt", JSON.stringify([data]));
  }

  return NextResponse.json({ message: "Guardando" });
}

// Maneja solicitudes GET
export async function GET() {
  try {
    const users = JSON.parse(readFileSync("data/users.txt"));
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json([]);
  }
}
