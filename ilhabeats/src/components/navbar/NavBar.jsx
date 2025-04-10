import React from 'react'

import { NavLink } from 'react-router-dom'

import './NavBar.css';

const NavBar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/produtos">Produtos</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
        <NavLink to="/cadusuario">Cadastre-se</NavLink>
      </nav>
    </div>
  )
}

export default NavBar