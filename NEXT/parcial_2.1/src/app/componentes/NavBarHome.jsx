import Link from "next/link"
import "../disBarra.css"

function NavbarHome(){

    return (
        <nav className="bg-black text-white py-4 ">
            <ul className=" gap-4">
                <li>
                    <Link href= "/admin">Administradores</Link>
                </li>
                <li>
                    <Link href= "/comercios">Comercios</Link>
                </li>
                <li>
                    <Link href = "/userNoRegis">Usuarios Anonimos</Link>
                </li>
                <li>
                    <Link href= "/userRegis">Usuarios Registrados</Link>
                </li>
            </ul>
        </nav>

    )
}

export default NavbarHome
