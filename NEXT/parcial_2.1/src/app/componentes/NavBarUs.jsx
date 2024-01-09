import Link from "next/link"


function NavbarUs(){

    return (
        <nav className="bg-gray-800 text-white py-4 text-center">
          <ul className="flex justify-center gap-4">
              <li>
              <Link href = "/userRegis/bucar/">Busqueda comercios</Link>
              </li>
              <li>
              <Link href = "/userRegis/evaluar/">Puntuar Comercio</Link>
              </li>
              <li>
              <Link href = "/userRegis">LogIn</Link>
              </li>
          </ul>
      </nav>

    )
}

export default NavbarUs
