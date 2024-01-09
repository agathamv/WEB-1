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

export async function GET(request) {
  const nombreUsuario = request.nextUrl.searchParams.get("nombreUsuario"); // Cambiar de id a nombreUsuario

  if (nombreUsuario) {
    try {
      const users = JSON.parse(readFileSync("data/users.txt"));
      const user = users.find((c) => c.nombreUsuario === nombreUsuario); // Buscar por nombreUsuario

      if (user) {
        return NextResponse.json(user);
      } else {
        return NextResponse.error(new Error('user not found'), { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return NextResponse.error(new Error('Internal Server Error'), { status: 500 });
    }
  } else {
    try {
      const users = JSON.parse(readFileSync("data/users.txt"));
      return NextResponse.json(users);
    } catch (e) {
      return NextResponse.json([]);
    }
  }
}



export async function DELETE(request) {
  try {
    const nombreUsuarioToDelete = request.nextUrl.searchParams.get("nombreUsuario"); 

    let users = JSON.parse(readFileSync("data/users.txt"));
    
    users = users.filter(user => user.nombreUsuario !== nombreUsuarioToDelete); // Buscar por nombreUsuario
    
    writeFileSync("data/users.txt", JSON.stringify(users));

    return NextResponse.json({ message: "user eliminado" });
  } catch (e) {
    return NextResponse.json({ message: "Error al eliminar el user" });
  }
}