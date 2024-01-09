'use client'
import React, { useState, useEffect } from 'react';
import UserList from "../buscar/componentes/UserList.jsx"

import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Regis.css"
import NavBarComercio from '@/app/componentes/NavBarComercio.jsx';

const BuscarPage = () => {

    return(
        <>
            <NavBarComercio></NavBarComercio>
            <UserList></UserList>

        </>
    )

}

export default BuscarPage;