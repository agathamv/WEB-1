import {NextResponse} from 'next/server';
import { readFileSync, writeFileSync} from 'fs';

export async function POST(request, {params}) {

    try{
        const usuarios = JSON.parse(readFileSync("users.txt"));
        const {user, pass} = await request.json();
        const usua = usuarios.find((usuario) => usuario.nombre === user && usuario.password===pass)
        console.log(usua)
        console.log(usua.id)
        if (usua){
            const userId = usua.id;
            console.log(usua.id)
            return NextResponse.json({message: "OK", userId: userId})
        }
        else
            return NextResponse.json({message: "NOK"})
        
    }
    catch(error){
        console.error("ERROR:", error);
        return NextResponse.json({ message: "Error parsing JSON", error: error.message });

    }
}

export async function GET (request){

    const usuarios = JSON.parse(readFileSync("users.txt"));

    if (usuarios){
        return NextResponse.json(usuarios); //deserializo y pongo todo en una linea
    }

}
