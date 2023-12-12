// En api/comercios/route.js

import { writeFileSync, readFileSync } from 'fs';
import { NextResponse } from 'next/server';

// Maneja solicitudes POST
export async function POST(req) {
  const data = await req.json();

  try {
    const comercios = JSON.parse(readFileSync("data/comercios.txt"));
    writeFileSync("data/comercios.txt", JSON.stringify([...comercios, data]));
  } catch (e) {
    writeFileSync("data/comercios.txt", JSON.stringify([data]));
  }

  return NextResponse.json({ message: "Guardando" });
}

// Maneja solicitudes GET
export async function GET() {
  try {
    const comercios = JSON.parse(readFileSync("data/comercios.txt"));
    return NextResponse.json(comercios);
  } catch (e) {
    return NextResponse.json([]);
  }
}


export async function DELETE(request) {
  try {
    const IDdelete = request.nextUrl.searchParams.get("id");

    let comercios = JSON.parse(readFileSync("data/comercios.txt"));
    
    comercios = comercios.filter(comercios => comercios.id !== IDdelete);
    
    writeFileSync("data/comercios.txt", JSON.stringify(comercios));

    return NextResponse.json({message: "comercio eliminado"});
  } catch (e) {
    return NextResponse.json({message: "error"});
  }
}