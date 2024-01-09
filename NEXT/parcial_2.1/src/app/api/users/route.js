import {NextResponse} from 'next/server';
import { readFileSync, writeFileSync} from 'fs';

export async function POST(request) {
    const data = await request.json()
    
    console.log(data)
    try{ // Read user.txt from disk and concatenate with data from request
        const comercios = JSON.parse(readFileSync("users.txt"));
        writeFileSync("users.txt", JSON.stringify([...comercios, data]))
    } catch(e){ // If user.txt file does not exist, create it with data from request
        writeFileSync("users.txt", JSON.stringify([data]))
    }
    
    return NextResponse.json({
        message: "Guardando datos…"
    })
    
}


