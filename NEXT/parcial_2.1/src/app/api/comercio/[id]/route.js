import {NextResponse} from 'next/server';
import { readFileSync, writeFileSync} from 'fs';

export async function DELETE(request, {params}){
    
  try {
    const id = params.id; //el id del comercio que quiero eliminar

    const comercios = JSON.parse(readFileSync("comercios.txt"));

    //y me guardo en una variable todos los comercios menos el que voy a eliminar

    const sinComercio = comercios.filter((comercio) => comercio.id !== id)

    writeFileSync("comercios.txt", JSON.stringify(sinComercio))

    return NextResponse.json({mensaje: "Comercio eliminado correctamente"})
  
  }catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({ error: "Error al eliminar el usuario" }, { status: 500 });
  }
}

export async function GET(request, { params }) {

  try{
    const {id} = params;
    const comercios = JSON.parse(readFileSync("comercios.txt"));
    const come = comercios.find((comercio) => comercio.id === id);

    if (come) {
      return NextResponse.json({ come });
    }

    return NextResponse.json({ mensaje: 'No se encontró el usuario' });
  }catch{
    console.error("ERROR:", error);
  }
}


export async function PUT(request, { params }) {
    try {
      const comercios = JSON.parse(readFileSync("comercios.txt"));
  
      const data = await request.json();

      const comercioId = params.id;
  
      const comeIndex = comercios.findIndex((comercio) => comercio.id === comercioId);
  
      if (comeIndex !== -1) {
        // Actualizar el comercio correspondiente en el array
        const comercioActualizado = { ...comercios[comeIndex], ...data };
        comercioActualizado.reseinasCant = (comercioActualizado.reseinasCant || 0) + 1; // Sumar cantidad de reseñas
        comercios[comeIndex] = comercioActualizado;

        // Escribir solo el array de comercios en el archivo
        writeFileSync("comercios.txt", JSON.stringify(comercios));

      }
      return NextResponse.json({ mensaje: 'Comercio actualizado correctamente' });
    } catch (error) {
      console.error("ERROR:", error);
    }
}


  
