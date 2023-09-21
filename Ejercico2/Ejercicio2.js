let operacion = + prompt("Introduzca una operacion:\n1.Multiplicacion\n2.Mayor");

const Multiplicar = () => {
	let a = +prompt("Introduzca un numero");
    let b = +prompt("Introduzca otro numero");
    alert (a*b);
}

const Mayor = () =>{
	let a = +prompt("Introduzca un numero");
    let b = +prompt("Introduzca otro numero");
    let mayor;
    if(a>b)
        mayor = a
    else    
        mayor = b;

    alert (mayor);
}


switch(operacion){
    case 1: 
        Multiplicar();
    break;

    case 2:
        Mayor()
    break;
}
