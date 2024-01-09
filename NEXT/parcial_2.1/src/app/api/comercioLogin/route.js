import {NextResponse} from 'next/server';
import { readFileSync, writeFileSync} from 'fs';

export async function POST(request, {params}) {

    try{
        const comercios = JSON.parse(readFileSync("comercios.txt"));
        const {user, pass} = await request.json();
        const come = comercios.find((comercio) => comercio.nombre === user &&comercio.contra===pass)
        console.log(come)
        console.log(come.id)

        if (come){
        
            const comercioId = come.id;

            console.log("POST id", comercioId)
            console.log("POST come.id", come.id)

            return NextResponse.json({message: "OK", comercioId: comercioId})
        }
        else
            return NextResponse.json({message: "NOK"})
    }catch(error){
        console.error("ERROR:", error);
        return NextResponse.json({ message: "Error parsing JSON", error: error.message });

    }

}

export async function GET (request){

    const comercios = JSON.parse(readFileSync("comercios.txt"));

    if (comercios){
        return NextResponse.json(comercios); //deserializo y pongo todo en una linea
    }

}
