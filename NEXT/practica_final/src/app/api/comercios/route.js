// En api/comercios/route.js

import { writeFileSync, readFileSync } from 'fs';
import { NextResponse } from 'next/server';

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

export async function GET(request) {
  const cif = request.nextUrl.searchParams.get("cif"); // Cambiar de id a cif

  if (cif) {
    try {
      const comercios = JSON.parse(readFileSync("data/comercios.txt"));
      const comercio = comercios.find((c) => c.cif === cif); // Buscar por cif

      if (comercio) {
        return NextResponse.json(comercio);
      } else {
        return NextResponse.error(new Error('Comercio not found'), { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching comercio data:', error);
      return NextResponse.error(new Error('Internal Server Error'), { status: 500 });
    }
  } else {
    try {
      const comercios = JSON.parse(readFileSync("data/comercios.txt"));
      return NextResponse.json(comercios);
    } catch (e) {
      return NextResponse.json([]);
    }
  }
}

export async function DELETE(request) {
  try {
    const cifToDelete = request.nextUrl.searchParams.get("cif"); 

    let comercios = JSON.parse(readFileSync("data/comercios.txt"));
    
    comercios = comercios.filter(comercio => comercio.cif !== cifToDelete); // Buscar por cif
    
    writeFileSync("data/comercios.txt", JSON.stringify(comercios));

    return NextResponse.json({ message: "Comercio eliminado" });
  } catch (e) {
    return NextResponse.json({ message: "Error al eliminar el comercio" });
  }
}
