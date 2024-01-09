import {NextResponse} from 'next/server';
import { readFileSync, writeFileSync} from 'fs';

export async function PUT(request, { params }) {
    try {
      const usuarios = JSON.parse(readFileSync("users.txt"));
      const data = await request.json();
      const userId = params.id;
  
      const usuarioIndex = usuarios.findIndex((usuario) => usuario.id === userId);

      if (usuarioIndex !== -1) {
        usuarios[usuarioIndex] = {
          ...usuarios[usuarioIndex],
          intereses: data.intereses,
          ciudad: data.ciudad,
          oferta: data.oferta,
        };
  
        // Escribir solo el array de usuarios en el archivo
        writeFileSync("users.txt", JSON.stringify(usuarios));
      }
  
      return NextResponse.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error("ERROR:", error);
      return NextResponse.json({ mensaje: 'Error al actualizar el usuario' });
    }
  }
  



export async function GET(request, { params }) {

  try{
  
    const id = params.id;
    const usuarios = JSON.parse(readFileSync("users.txt"));
    const usuario = usuarios.find((usuario) => usuario.id === id);

    if (usuario) {
      return NextResponse.json({ user: usuario });
    }

    return NextResponse.json({ mensaje: 'No se encontró el usuario' });
  }catch{
    console.error("ERROR:", error);
  }
}


export async function DELETE(request, {params}){
    
  try {
    const id = params.id; //el id del comercio que quiero eliminar

    const usuarios = JSON.parse(readFileSync("users.txt"));

    //y me guardo en una variable todos los comercios menos el que voy a eliminar

    const sinUsuario = usuarios.filter((usuario) => usuario.id !== id)

    writeFileSync("users.txt", JSON.stringify(sinUsuario))

    return NextResponse.json({mensaje: "Comercio eliminado correctamente"})
  
  }catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({ error: "Error al eliminar el usuario" }, { status: 500 });
  }
}
