import {NextResponse} from 'next/server';
import { readFileSync, writeFileSync} from 'fs';

export async function POST(request, {params}) {

    try{
        const admins = JSON.parse(readFileSync("admin.txt"));
        const {user, pass} = await request.json();
        console.log(user)
        console.log(pass)

        const adm = admins.find((admin) => admin.user === user && admin.pass===pass)
        if (adm){
            return NextResponse.json({message: "OK"})
        }else
            return NextResponse.json({message: "NOK"})
    }catch(error){
        console.error("ERROR:", error);
        return NextResponse.json({ message: "Error parsing JSON", error: error.message });

    }
}

