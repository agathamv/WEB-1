import Link from "next/link"


function NavbarUsNoRegis(){

    return (
        
        <nav className="bg-gray-800 text-white py-4 text-center">
          <ul className="flex justify-center gap-4">
              <li>
              <Link href = "/userNoRegis/ciudad/">Busqueda por ciudad</Link>
              </li>
              <li>
              <Link href = "/userNoRegis/ciudad_actividad/">Busqueda por ciudad y actividad</Link>
              </li>
              <li>
              <Link href = "/userNoRegis/identificador/">Busqueda por identificador</Link>
              </li>
              <li>
              <Link href = "/userNoRegis/registrarse/">Registrar Usuario</Link>
              </li>
          </ul>
      </nav>

    )
}

export default NavbarUsNoRegis
