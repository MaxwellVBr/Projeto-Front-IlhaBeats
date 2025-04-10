import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/home/Home';
import Produtos from './pages/produtos/Produtos';
import CadProdutos from './pages/produtos/CadProdutos';
import Login from './pages/login/Login';
import CadastroUsuario from './pages/login/CadastroUsuario';

// Componentes 
import Sobre from './components/sobre/Sobre';
import NavBar from './components/navbar/NavBar';



function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/cadprodutos" element={<CadProdutos /> } />
          <Route path="/sobre" element={<Sobre />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadusuario' element={<CadastroUsuario />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
