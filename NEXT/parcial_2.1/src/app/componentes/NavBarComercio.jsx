import Link from "next/link"


function NavBarComercio(){

    return (
        <nav className="bg-gray-800 text-white py-4 text-center">
          <ul className="flex justify-center gap-4">
              <li>
              <Link href = "/comercios/buscar">Busqueda Usuario</Link>
              </li>
              <li>
              <Link href = "/comercios">LogIn</Link>
              </li>
          </ul>
      </nav>

    )
}

export default NavBarComercio
